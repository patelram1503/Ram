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
            <h1>Hello from Ram's Page Publicccc :)</h1>
            <h1>            <img src="/mahi.gif"
                 style="width: ${size}px; height: auto;">
                 <p> We are Under Construction people </p>
                 </h1>
        </body>
        </html>
    `);
});


// API - Website name
app.get("/api/getName", (req, res) => {

    res.set("Access-Control-Allow-Origin", "*");

    res.json({
        name: "60 overs....-vk"
    });
});


// API - Website image
app.get("/api/getImage", (req, res) => {

    res.set("Access-Control-Allow-Origin", "*");

    res.sendFile(
        path.join(__dirname, "public", "vk.gif")
    );
});


app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server listening on port ${PORT}`);
});