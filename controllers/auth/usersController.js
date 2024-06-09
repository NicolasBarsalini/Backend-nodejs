const express = require('express')
const bcrypt = require('bcryptjs')
const UserModel = require('../../models/user')
const auth = require('../../middlewares/auth')

const userController = express.Router()

// LISTAR TODOS OS USUÁRIOS
userController.get("/", auth, async (req, res) => {
    try {
        const users = await UserModel.find()
        return res.status(201).json(users)
    } catch(err) {
        console.error(`Error: ${err}`)
        return res.status(500).json({ message: err })
    }
})

// EDITAR UM USUÁRIO ESPECÍFICO
userController.put("/update/:email", auth, async (req, res) => {
    const { email } = req.params
    const { name, password, role} = req.body

    try {
        const updateFields = { name, password, role }
        if(password) {
            const passwordEncrypt = await bcrypt.hash(password, 10)
            updateFields.password = passwordEncrypt
        }

        const updatedUser = await UserModel.findOneAndUpdate({ email: email}, updateFields, { new: true })

        if(!updatedUser) {
            return res.status(404).json({ message: "Usuário não encontrado!" })
        }

        return res.status(200).json(updatedUser)
    } catch(err) {
        console.error(`Error: ${err}`)
        return res.status(500).json({ error: err.message })
    }
})

// DELETAR UM USUÁRIO ESPECÍFICO
userController.delete("/delete/:email", auth, async (req, res) => {
    const { email } = req.params

    try {
        const deletedUser = await UserModel.findOneAndDelete({ email: email })
        
        if(!deletedUser) {
            return res.status(404).json({ error: "Usuário nãao encontrado" })
        }

        return res.status(200).json(
            {
                message: "Deletado com sucesso!",
                user: deletedUser
            }
        )
    } catch(err) {
        console.error(`Error deleting user: ${err}`)
        return res.status(500).json({ error: err })
    }
})

// PESQUISAR PELA FUNÇÃO
userController.get("/searchBy/:role", auth, async (req, res) => {
    const { role } = req.params;

    try {
        const userCount = await UserModel.countDocuments({ role: role });

        return res.status(200).json({ count: userCount });
    } catch (err) {
        console.error(`Error counting users by role: ${err.message}`);
        return res.status(500).json({ error: err.message });
    }
});

userController.get("/:email", auth, async (req, res) => {
    const email = req.params.email

    const user = await UserModel.findOne({ email: email })

    if(!user) {
        return res.status(404).json({ message: "Usuário não encontrado!"} )
    }

    return res.status(200).json(user)
})

// CADASTRAR NOVO USUÁRIO
userController.post("/new", auth, async (req, res) => {
    const { name, email, password, role } = req.body
    const passwordEncrypt = await bcrypt.hash(password, 10)

    const user = {
        name,
        email,
        role,
        password: passwordEncrypt,
    }

    try {
        await UserModel.create(user)
        return res.status(201).json(user)
    } catch(err) {
        console.log(`Error creating user`)
        return res.status(500).json({ error: err })
    }
})

module.exports = userController;