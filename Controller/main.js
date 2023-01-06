require("dotenv").config();
const jwt = require("jsonwebtoken");

const login = async (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(401).json({ msg: "Please provide proper information...." });
    }

    const token = jwt.sign({ username, id: Date.now() }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.status(200).json({ msg: "User Created", token });
}
const dashboard = async (req, res) => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json({ msg: "No tokken provided..." });
    }
    const token = authHeader.split(' ')[1];

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const luckyNum = Math.floor(Math.random() * 100);
        res.status(200).json({ msg: `Hello ${decoded.username} Your lucky number is: ${luckyNum}` });
    }
    catch (error) {
        return res.status(401).json({ msg: "Wrong credentials..." })
    }
}


module.exports = { login, dashboard };