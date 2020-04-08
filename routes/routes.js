const fs = require('fs');
const extractDomain = require('extract-domain');
const rp = require('request-promise');
let screenshot = require("node-server-screenshot");
// create a rolling file logger based on date/time that fires process events
const opts = {
    errorEventName:'error',
        logDirectory:'./log', // NOTE: folder must exist and be writable...
        fileNamePattern:'roll-<DATE>.log',
        dateFormat:'YYYY.MM.DD'
};
const log = require('simple-node-logger').createRollingFileLogger( opts );

const router = app => {
    app.get('/log/', (request, response) => {
        const checkUrl = request.query.url;
        const domain = extractDomain(checkUrl);
        const imageFileName = `./public/snapshots/${domain}.png`;

        log.info(`Extracting content from ${checkUrl}`)

        screenshot.fromURL(checkUrl, imageFileName, { waitAfterSelector: "html" }, function () {
            log.info("saved " + imageFileName);
            rp(checkUrl)
                .then(function (webContent) {
                    fs.writeFileSync(`./public/html/${domain}`, webContent); 

                    response.send({
                        status: 1,
                    });
                })
                .catch(function (err) {
                    // log.error(`   error:${err}`);
                    response.send({
                        status: 0,
                    });
                    throw err;
                });
        });
    });
    app.get('/', (request, response) => {
        response.send('<h1>Hello! This is Sharkcop Microservice</h1>')
    });
    //function

}

module.exports = router;