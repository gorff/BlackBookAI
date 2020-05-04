const express = require("express");
const app = express();
const http = require("http");

app.get("/predict", function (req, res) {
    const url = 'http://localhost:8501/v1/models/catsAndDogs/versions/1';
    http.get(url, function (response) {
        console.log(response.statusCode);
        response.on("data", function (data) {
            const data_parsed = JSON.parse(data);
            console.log(data_parsed);
            //res.send(data_parsed.model_version_status[0].state);
            res.send(data_parsed.model_version_status[0]);

        })

    })
    //res.send("server up and running");

})

// create the data to send to tensorflow serving
//const data = JSON.stringify({
 //   "predictions": ['image']
//})
const data = require('./testdata.json');

// set options for the POST request
const options = {
    hostname: 'localhost', //might just need port and not hostname? 
    port: 8501, //might need 80
    path: '/v1/models/catsAndDogs/versions/1:predict',
    method: 'POST',
   // data: {
    //    "signature_name": "serving_default",
     //   "instances": ['test']
    //},
    data: data,
    headers: {
        "content-type": "application/json"
    }
}


// what happens when user loads up home page
app.get("/", function (request, response) {
    //define the request
    const req = http.request(options, res => {
        console.log(`statusCode: ${res.statusCode}`)
        res.on('data', d => {
            process.stdout.write(d.toString());

        })
    })
    req.on('error', error => {
        console.error(error)
    })
    req.write(data)
    req.end();

})


app.listen(8080, function () {


    console.log("server up on 8080");
    const testurl = 'http://localhost:8501/v1/models/catsAndDogs/versions/1'


})