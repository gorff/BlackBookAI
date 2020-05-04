const express = require("express");
const app = express();
const fs = require('fs');

const https = require("https");
const http = require("http");
const crypto = require("crypto");
const bodyParser = require("body-parser");
const multer = require("multer");
const jpeg = require("jpeg-js");
const spawn = require("child_process").spawn;
var util = require('util')



var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, __dirname + '/uploads/images')
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname)
    }
})


//const upload = multer({storage: storage, dest: __dirname + '/uploads/images' });
var upload = multer({
    storage: storage
})



//, dest: __dirname + '/uploads/images'
app.use(express.static("public")); // to make css available 

app.use(bodyParser.urlencoded({
    extended: true
}));


app.get("/", function (req, res) {
    res.sendFile(__dirname + "/public/html/index.html");
})

app.post("/", function (req, res) {
    console.log("posted");
    //console.log(req.body.uploadPreview.files[0])
})

app.post("/upload", upload.single('photo'), function (req1, res) {
    if (req1.file) {
        console.log(req1.file.originalname)
        console.log(req1.file.mimetype)


        // convert input image into format expected
            // call the function that processes the image
        const pythonProcess = spawn('python3', ["./imageprocess.py"]);

        pythonProcess.stdout.on('data', (data) => {
            // log completion of script
            console.log(data.toString('utf8'));

            // Build call to tf-serving API
            let img_data = fs.readFileSync('img_data.json');
            const options = {
                //hostname: 'localhost',
                //hostname: '0.0.0.0',
                hostname: 'backend',
                //hostname: '127.0.0.1',
                port: 8501,
                path: '/v1/models/catsAndDogs:predict',
                //path: '/v1/models/catsAndDogs:predict', // let it select latest version
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                }
            }
            const req = http.request(options, (res2) => {
                console.log(`statusCode: ${res2.statusCode}`)
                
                //console.log('res: '+ util.inspect(res2))
                res2.on('data', (d) => {
                    const prediction = JSON.parse(d);
                    console.log(prediction);
                    console.log(prediction.predictions[0]);
                    if (prediction.predictions[0][0] > prediction.predictions[0][1]){
                        res.send("<h2>I think its a Cat!</h2>"+prediction.predictions[0]);
                    }
                    else {
                        res.send("<h2>I think its a Dog!</h2>"+prediction.predictions[0]);
                    }
                    fs.unlinkSync('./uploads/images/'+req1.file.originalname);

                    //process.stdout.write(prediction.predictions);
                    //res.send(d.toString('utf8'));
                    //res.send("classification successful");
                   // res.send(d.prediction)
                })
            })
            req.on('error', (error) => {
                console.error(error);
            })
            req.write(img_data);
            req.end();
        });

        
    } else throw 'error: Please upload image';
    // TODO - grab image from the post
    // Classify image
    // Return result
    //console.log(req.body.uploadPreview.files[0])
})

app.listen(8080, function () {
    console.log("server running on localhost:8080");
})