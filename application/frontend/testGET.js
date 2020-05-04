const http = require('http')
const options = {
    hostname: 'localhost',
    port: 8501,
    path: '/v1/models/catsAndDogs/versions/1',
    method: 'GET'
}
const req = http.request(options, (res) => {
    console.log(`statusCode: ${res.statusCode}`)
    res.on('data', (d) => {
        const data_parsed = JSON.parse(d);
        process.stdout.write(data_parsed.model_version_status[0].state)
    })
})
req.on('error', (error) => {
    console.error(error)
})
req.end()