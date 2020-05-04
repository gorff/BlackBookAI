const http = require('http')
const fs = require('fs');
let rawdata = fs.readFileSync('testdata.json');
//let data = JSON.parse(rawdata);
let data = rawdata;
const options = {
    hostname: 'localhost',
    port: 8501,
    path: '/v1/models/catsAndDogs/versions/1:predict',
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
    }
}
const req = http.request(options, (res) => {
    console.log(`statusCode: ${res.statusCode}`)
    res.on('data', (d) => {
        process.stdout.write(d)
    })
})
req.on('error', (error) => {
    console.error(error)
})
req.write(data)
req.end()