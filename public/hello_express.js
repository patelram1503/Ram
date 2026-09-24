const express = require("express");
const path = require("path");
require("serve-index")
const app= express();
const port = 3000;

app/use("/public", express.static(path.join(__dirname, "public")))
app.use("/public", serveIndex(path.join(__dirname, "public"),{}))

app.get("/public/home",(req,res) => {
    res.sendFile(path.join(__dirname, "public", "hello,html"))
})

 app.get('/api/getName', (req, res) => {
                    res.set('Access-Control-Allow-Origin', '*');
                    res.json({ name: 'Rams webbi' });
                });

app.get("/allAbout/me",(req,res) => {
    res.status(200).send("Hello, Express!");
});

app.get("/allAbout*subpage",(req,res) => {
    res.status(200).send("HELLO I AM EXPRESS" + req.params.subpage);
});

app.use((req,res) => {
    res.status(404).sendFile(__dirname + "/public/404.html");
});

app.use((err,req,res) => {
    console.log(err.stack)
    res.status(500).sendFile(__dirname + "/public/500.html");
});
