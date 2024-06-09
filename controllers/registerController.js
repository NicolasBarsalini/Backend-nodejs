const express = require('express');
const bcrypt = require('bcryptjs')
const ClientModel = require('../models/client');

const registerController = express.Router()

// CADASTRAR NOVO CLIENTE
registerController.post("/", async (req, res) => {
    const { email, password } = req.body
    const passwordEncrypt = await bcrypt.hash(password, 10)

    const client = {
        email,
        password: passwordEncrypt,
    }

    try {
        await ClientModel.create(client)
        return res.status(201).json(client)
    } catch(err) {
        console.log(`Error creating client`)
        return res.status(500).json({ error: err })
    }
})


module.exports = registerController;