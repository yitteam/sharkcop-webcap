const express = require('express');
const port = process.env.PORT || 8080;
const app = express();
const bodyParser = require('body-parser');
const routes = require('./routes/routes')
//Parsing middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true,
}));
app.use('/public', express.static('public'))
//routing
routes(app);

//start the service server
const server = app.listen(port, (error) =>{
    if (error) return console.log(`Error: ${error}`);
    console.log("WEBCAP SERVICE UP AND RUNNING ON PORT",port);
});

