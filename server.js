const express = require("express");
const path = require("path");

const app = express();

const port = 3000;


// Allows Express to read data sent from an HTML form
app.use(express.urlencoded({ extended: false }));


// Makes files inside public available
app.use("/public", express.static(
    path.join(__dirname, "public")
));


// GET request
// Display the form
app.get("/public/home", (req, res) => {

    res.sendFile(
        path.join(__dirname, "public", "hello.html")
    );

});


// POST request
// Receive the form
app.post("/public/home", (req, res) => {

    let text = req.body.myTextInput;

    res.status(200).send(
        "Form submitted: " + text
    );

});


// 404
app.use((req, res) => {

    res.status(404).send(
        "404 - Page not found"
    );

});


app.listen(port, () => {

    console.log(
        `Server running at http://localhost:${port}`
    );

});