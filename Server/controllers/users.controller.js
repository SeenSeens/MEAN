const User= require("../models/user.model");
const Auth = require("../middleware/auth");

//signup
const signup = async (req, res) => {
    const user = new User(req.body)
    try {
        await user.save()
        const token = await user.generateAuthToken()
        res.status(201).send({user, token})
    }catch (error) {
        res.status(400).send(error)
    }
}
// login
const login = async (req, res) => {
    try {
        const user = await User.findByCredentials(req.body.email, req.body.password)
        const token = await user.generateAuthToken()
        res.send({ user, token})
    } catch (error) {
        res.status(400).send(error)
    }
}
//logout
const logout = async (req, res) => {
    try {
        req.user.tokens =  req.user.tokens.filter((token) => {
            return token.token !== req.token
        })
        await req.user.save()
        res.send()
    } catch (error) {
        res.status(500).send()
    }
}
// logoutAll
const logoutAll = async(req, res) => {
    try {
        req.user.tokens = []
        await req.user.save()
        res.send({ message: 'Đã đăng xuất khỏi tất cả các phiên' })
    } catch (error) {
        res.status(500).send({ error: 'Lỗi khi đăng xuất' })
    }
}

module.exports = {
    signup,
    login,
    logout,
    logoutAll
}