const express = require("express");
const app=express();
const http =require("http");



app.get("/", function(req, res){
    const url = 'http://localhost:8501/v1/models/catsAndDogs/versions/1';
    http.get(url, function(response){
        console.log(response.statusCode);
        response.on("data", function(data){
            const data_parsed = JSON.parse(data); 
            console.log(data_parsed);
            //res.send(data_parsed.model_version_status[0].state);
            res.send(data_parsed.model_version_status[0]);
            
        })
        
    })
    //res.send("server up and running");
    
})


app.listen(8080, function(){
    
    console.log("server up on 8080");
    const testurl ='http://localhost:8501/v1/models/catsAndDogs/versions/1' 
     

})