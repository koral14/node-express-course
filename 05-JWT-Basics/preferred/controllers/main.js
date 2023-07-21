// check username, password in post(login) request, if exist create new JWT
// send back to fron-end, setup authentication so only the request with JWT can access the dasboard

const jwt = require('jsonwebtoken')

// logon and hello
const logon = async (req, res) => {
    const { name, password } = req.body

    if (!name || !password) {
        res.status(400).json({message: 'Please provide email and password'})
    }
  
    const token = jwt.sign({ name }, process.env.JWT_SECRET, { expiresIn: process.env.TOKEN_EXPIRATION })

    res.status(200).json({ msg: 'The user has been successfully created', token })
}

const hello = async (req, res) => {
    const name = req.user.name
    res.status(200).json({message: `Welcome to this page, ${name}!`})
}

module.exports = { logon, hello }