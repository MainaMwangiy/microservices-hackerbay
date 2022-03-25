require("dotenv").config()
const express = require("express")
const jwt = require("jsonwebtoken")
const cookieParser = require('cookie-parser')
const mlog = require('mocha-logger');

const verify = require("./middleware/auth")
const thumbnail = require("./middleware/thumbnail")
const jsonpatch = require("./middleware/jsonpatch")
const login = require("./routes/login")

const app = express()
app.use(cookieParser())

const port = process.env.PORT || 8080

app.use(express.json());

app.get("/", function(req,res) {
    res.send("Home");
})

app.post("/user/login", login)

app.get("/generatethumbnail", verify,thumbnail)

app.patch("/jsonpatch", verify, jsonpatch)

app.listen(port, () => {
    console.log(`App running on port ${port}`)
})

