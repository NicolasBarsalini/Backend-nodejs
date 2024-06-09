const express = require('express');
const taskController = express.Router();
const TaskModel = require('../../models/task');
const auth = require('../../middlewares/auth');

// Rota para listar as tarefas do usuário logado
taskController.get("/", auth, async (req, res) => {
    try {
        const user = req.user;

        if (!user || !user._id) {
            return res.status(400).json({ error: "User not authenticated" });
        }
        
        const tasks = await TaskModel.find({ owner: user._id });
        return res.status(200).json(tasks);
    } catch (err) {
        console.error(`Error fetching tasks: ${err.message}`);
        return res.status(500).json({ error: err.message });
    }
});

// EDITAR UMA TAREFA ESPECÍFICA DO USUÁRIO LOGADO
taskController.put("/edit/:id", auth, async (req, res) => {
    const { id } = req.params
    const { title, description, status } = req.body
    const user = req.user

    try {
        const updatedTask = await TaskModel.findOneAndUpdate(
            { _id: id, owner: user._id },
            {title, description, status},
            {new: true}
        )

        if(!updatedTask) {
            return res.status(404).json({ message: "Tarefa não encontrada" })
        }

        return res.status(200).json(updatedTask)
    } catch(err) {
        console.error(`Error updating task: ${err.message}`);
        return res.status(500).json({ error: err.message });
    }
})

// EXCLUIR TAREFA ESPECÍFICA DO USUÁRIO LOGADO
taskController.delete("/delete/:id", auth, async (req, res) => {
    const { id } = req.params
    const user = req.user

    try {
        const deletedTask = await TaskModel.findOneAndDelete(
            { _id: id, owner: user._id }
        )

        if(!deletedTask) {
            return res.status(404).json({ message: "Tarefa não encontrada" })
        }

        return res.status(200).json({deletedTask})
    } catch(err) {
        return res.status(500).json({ error: err })
    }
})

// CRIAR NOVA TAREFA PRA USUÁRIO LOGADO
taskController.post("/new", auth, async (req, res) => {
    const user = req.user

    const { title, description, status } = req.body

    const task = {
        title,
        description,
        status,
        owner: user._id
    }

    try {
        await TaskModel.create(task)
        return res.status(200).json(task)
    } catch(err) {
        return res.status(500).json({ error: err })
    }
})

// BUSCAR TAREFAS SEM DONO
taskController.get("/unassigned", auth, async (req, res) => {
    try {
        const tasks = await TaskModel.find({ owner: null })
        return res.status(200).json(tasks)
    } catch(err) {
        return res.status(500).json({ error: err })
    }
})

// ADICIONAR UM DONO A UMA TAREFA ESPECÍFICA
taskController.put("/assign/:id", auth, async (req, res) => {
    const { id } = req.params
    const { email } = req.body

    try {
        const user = await UserModel.findOne({ email: email })
        if(!user) {
            return res.status(404).json({ message: "Usuário não encontrado" })
        }

        const updatedTask = await TaskModel.findByIdAndUpdate(
            id,
            { owner: user._id },
            { new: true }
        )

        if(!updatedTask) {
            return res.status(404).json({ message: "Tarefa não encontrada" })
        }
    } catch(err) {
        return res.status(500).json({ error: err })
    }
})

module.exports = taskController;

