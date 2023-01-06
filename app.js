const express = require("express");
const cors = require('cors');
const app = express();
app.use(cors());

const mainRoute = require("./Routes/main")
app.use(express.static("./public"))
app.use(express.json());
app.use("/api/v1", mainRoute);

const start = async () => {
    try {
        app.listen(3300, () => {
            console.log("Server Started...");
        })
    } catch (error) {
        console.log(error);
    }
}

start();