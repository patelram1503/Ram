const express = require("express");
const path = require("path");

const app = express();

const PORT = process.env.PORT || 3000;


// Home page
app.get("/", (req, res) => {
    res.send(`
        <!DOCTYPE html>
        <html>
        <head>
            <title>Course Server</title>
        </head>

        <body>
            <h1>Hello from Ram's Page PUPSSS</h1>
            <p>This page is being served by Node.js and Express.</p>
        </body>
        </html>
    `);
});


// API - Website name
app.get("/api/getName", (req, res) => {

    res.set("Access-Control-Allow-Origin", "*");

    res.json({
        name: "MAHI-RAT DREAM OF 2027"
    });
});


// API - Website image
app.get("/api/getImage", (req, res) => {

    res.set("Access-Control-Allow-Origin", "*");

    res.sendFile(
        path.join(__dirname, "public", "images.jpeg")
    );
});


app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server listening on port ${PORT}`);
});