require('dotenv').config()

const mongoose = require('mongoose')
const express = require('express')
const userController = require('./controllers/auth/usersController')
const loginController = require('./controllers/loginController')
const registerController = require('./controllers/registerController')
const taskController = require('./controllers/auth/tasksController')
const server = express()

const port = process.env.PORT

const DATABASE_NAME = process.env.DATABASE_NAME
const DATABASE_USER = process.env.DATABASE_USER
const DATABASE_PASSWORD = process.env.DATABASE_PASSWORD

const DATABASE_URL = `mongodb+srv://${DATABASE_USER}:${DATABASE_PASSWORD}@crud-app.sdlxn6a.mongodb.net/${DATABASE_NAME}?retryWrites=true&w=majority&appName=crud-app`

server.use(express.json()) // use json files to crud
server.use("/users", userController) // posso deixar assim tbm server.use("/users", auth, usersController) que dai todas serã autenticadas
server.use("/login", loginController)
server.use("/register", registerController)
server.use("/tasks", taskController)

mongoose.connect(DATABASE_URL)
        .then( () => {
            console.log("Connected to database sucessfully!")

            server.listen(port, () => {
                console.log(`Server listening at ${port}`)
            })
        })
        .catch(err => {
            console.log(`Error conecting to database on mongoose: ${err}`)
        })