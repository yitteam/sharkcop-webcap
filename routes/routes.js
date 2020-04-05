const express = require('express');
const querystring = require('querystring');
const rp = require('request-promise');
var screenshot = require("node-server-screenshot");

const router = app => {
  
    app.get('/check/',(request,response) => {
        var checkurl = request.query.url;
        var filename = './public/' + checkurl.replace(/\./g,"").replace(/\//g,"").replace("https","").replace("http","").replace(":","").replace(/\%/g,"").replace(/\?/g,"") + ".png";
   
        screenshot.fromURL(checkurl, filename, {waitAfterSelector: "html"}, function(){
           console.log("saved " + filename); 
           rp(checkurl)
            .then(function(webcontent){
            response.send({
                picture: filename,
                html: webcontent,
            })
            })
            .catch(function(err){
                response.send({
                    picture: filename,
                    html: err,
                })
            });
        });
       
        
        
    });
    app.get('/',(request,response) => {
        response.send('<h1>Hello! This is Sharkcop Microservice</h1>')
    });
    //function
    
}

module.exports = router;