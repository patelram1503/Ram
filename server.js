require("dotenv").config();

const express = require("express");
const path = require("path");
const multer = require("multer");

const { 
    uploadFile, 
    getFileUrl 
} = require("./storage");

const app = express();

const PORT = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: false }));

const upload = multer({
    storage: multer.memoryStorage({})
});


app.use("/public", express.static(path.join(__dirname, "public")));

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
            <h1>            
                 <p> We are Under Construction people </p>
                 </h1>
                  <img src="/public/mahi.gif"
                   style="width: 600px; height: auto;">

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


app.route("/public/home")
    .get((req, res) => {
        res.sendFile(
            path.join(__dirname, "public", "hello.html")
        );
    })
    .post(upload.single("upload"), async (req, res) => {
        try {

            console.log(req.body);

            if (req.body.myTextInput) {
                return res.send(JSON.stringify({
                 text: "That was certainly a form submission: " + req.body.myTextInput
                 }));
                }

            if (!req.file) {
                return res.status(400).send("No image uploaded");
            }

            
            if (req.body.mySecret !== process.env.UPLOAD_SECRET) {
                return res.status(403).send("You need the upload secret");
            }


            const key = `upload/${req.file.originalname}`;

            await uploadFile(
                key,
                req.file.buffer,
                req.file.mimetype
            );

            res.send(`Uploaded ${req.file.originalname}`);
        } catch (error) {
            console.error(error);
            res.status(500).send("Upload failed");
        }
    });

    
app.get("/public/:file", async (req, res) => {
    try {
        const theFileURL = await getFileUrl(
            `upload/${req.params.file}`
        );

        return res.redirect(theFileURL);
    } catch (e) {
        console.error(e);
        res.status(500).send("Internal Error");
    }
});

// Route used to test the custom 500 handler
app.get("/error", (req, res, next) => {
    next(new Error("Test error"));
});


let counter = 0;

// Server-Sent Events ______________________________________________
app.get("/ticktock", (req, res) => {

    console.log(
        `Client connected: ${req.headers["user-agent"]}`
    );

    res.set({
        "Connection": "keep-alive",
        "Content-Type": "text/event-stream"
    });

    const interval = setInterval(() => {

        counter += 1;

        if (counter % 10 === 0) {

            res.write(
                "event: gong\n" +
                "data: GONG\n\n"
            );

        } else if (counter % 2 === 0) {

            res.write("data: tick\n\n");

        } else {

            res.write("data: tock\n\n");
        }

    }, 1000);


    res.on("close", () => {

        clearInterval(interval);

        res.end();

        console.log(
            `Closed connection to ${req.headers["user-agent"]}`
        );
    });

});

// Custom 404 handler________________________________________________
app.use((req, res) => {
    res.status(404).send("404 - Page not found");
});


// Custom 500 handler
app.use((err, req, res, next) => {
    console.error(err);
    res.status(500).send("500 - Internal Server Error");
});


app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server listening on port ${PORT}`);
});