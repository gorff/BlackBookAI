const express = require("express");
const app=express();
const https = require("https");
const http =require("http");

app.get("/", function(req, res){
    http.get('http://localhost:8501/v1/models/catsAndDogs/versions/1', function(response){
        //console.log(response);
        res.send(response)
    })
    //res.send("server up and running");
    
})

app.listen(8080, function(){
    
    console.log("server up on 8080");
    const testurl ='http://localhost:8501/v1/models/catsAndDogs/versions/1' 
    const url = 'https://localhost:8501/v1/models/catsAndDogs/versions/1:predict'; 

})