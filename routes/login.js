const jwt = require("jsonwebtoken")
const mlog = require('mocha-logger');

const login = (req, res) => {
    const jwtSecret = process.env.SECRET_KEY;
    const data = {
        userid: 2,
        username: "fastlinker",
        password: "qwerty12345"
    }
    try {
        const token = jwt.sign(data, jwtSecret)
        res.header("auth-token", token)
        res.json({
            success: "true",
            token: token
        })
    } catch (err) {
        res.status(err).json({
            success: "false",
            err: "Login failed. Please enter correct credentials!"
        })
    }
}

module.exports = login;