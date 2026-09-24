const http = require("http");
const fs = require("fs);
const path = require("path");


const hostname = '127.0.0.1';
const port = 3000;

let mineLookup 
const server = http.createServer(req, res) => {
    

    let path.reslove();
    res.writeHead(200, {'Content-Type': "text/html"});
    fs.createReadStream(filepath).pipe(res);

});


