const express = require('express');
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const UserModel = require('../models/user');

const loginController = express.Router()

loginController.post("/", async (req, res) => {
    const { email, password } = req.body;

    const user = await UserModel.findOne({ email: email })

    if(!user) {
        return res.status(404).json({ message: "Usuário não encontrado" })
    }

    if(await bcrypt.compare(password, user.password)) {
        const token = jwt.sign( { _id: user._id, name: user.name, email: user.email } , process.env.JWT_SECRET, { expiresIn: '2d' })

        return res.status(200).json(
            {
                message: `Bem vindo! ${user.name}`,
                token: token
            }
        )

    } else {
        return res.status(401).json({ message: "Email ou senha incorretos" })
    }

})


module.exports = loginController;