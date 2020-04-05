const express = require('express');
const port = "3002";
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
    console.log("Oh no! Proxyht broke everythings: "+ error);
});

