const express = require("express");
const path = require("path");
const serveIndex = require("serve-index");
require("serve-index")

const app = expresss();
const port = 3000;

app.get('/api/getName', (req, res) => {
    res.set('Access-Control-Allow-Origin', '*');
    res.json({ name: 'Barcelona' });
});

app.get('/api/getImage', (req, res) => {
    res.set('Access-Control-Allow-Origin', '*');
    res.sendFile(path.join(__dirname, "public", "images.jpg"));
});

app.use("/public", express.static(path.join(__dirname, "public")))
app.use("/public", serveIndex(path.join(__dirname, "public"), {}))

app.get("/", (req, res) => {
    res.sendfile(path.join(__dirname, "public", "hello.html"))
})

app.get("/allAbout/me", (req, res) => {
    res.status(200).send("Hello, Express!");
})

app.get("/allAbout*subpage", (req, res) => {
    res.status(200).send("HELLO I AM EXPRESS " + req.params.subpage);
})

app.use((req, res) => {
    res.status(404).sendFile(__dirname + "/public/404.html")
})

app.use((err, req, res, __) => {
    console.log(err.stack)
    res.status(500).sendFile(__dirname + "/public/500.html")
})

app.listen(port, () => {
    console.log(`App Listening on port ${port}`);
});