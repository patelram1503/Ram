const express = require("express");
const path = require("path");

const app = express();

const port = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: false }));

app.use(
    "/public",
    express.static(path.join(__dirname, "public"))
);

app.get("/", (req, res) => {
    res.sendFile(
        path.join(__dirname, "public", "home.html")
    );
});

app.get("/home", (req, res) => {
    res.sendFile(
        path.join(__dirname, "public", "home.html")
    );
});

app.get("/public/home", (req, res) => {
    res.sendFile(
        path.join(__dirname, "public", "hello.html")
    );
});

app.post("/public/home", (req, res) => {
    let text = req.body.myTextInput;

    res.status(200).send(
        "Form submitted: " + text
    );
});

app.use((req, res) => {
    res.status(404).send("404 - Page not found");
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});