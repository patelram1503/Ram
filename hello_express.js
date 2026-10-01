const express = require("express");
const path = require("path");
const serveIndex = require("serve-index");

const app = express();
const port = process.env.PORT || 3000;

// __dirname is already the "public" folder here
app.use("/public", express.static(__dirname));
app.use("/public", serveIndex(__dirname, {}));

app.get("/public/home", (req, res) => {
  res.sendFile(path.join(__dirname, "hello.html"));
});

app.get("/api/getName", (req, res) => {
  res.set("Access-Control-Allow-Origin", "*");
  res.json({ name: "Rams webbi" });
});

app.get("/api/getImage", (req, res) => {
  res.set("Access-Control-Allow-Origin", "*");
  res.sendFile(path.join(__dirname, "messi_10.png"));
});

app.get("/allAbout/me", (req, res) => {
  res.status(200).send("Hello, Express!");
});

app.get("/allAbout/*subpage", (req, res) => {
  res.status(200).send("HELLO I AM EXPRESS " + req.params.subpage);
});

app.use((req, res) => {
  res.status(404).send("404 - Page not found");
});

app.use((err, req, res, next) => {
  console.log(err.stack);
  res.status(500).send("500 - Server error");
});

app.listen(port, () => console.log(`Listening on ${port}`));