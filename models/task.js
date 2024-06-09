const mongoose = require('mongoose')

const TaskModel = mongoose.model('tasks', {
    title: String,
    description: String,
    status: { type: Boolean, default: false },
    owner: { type: mongoose.Schema.Types.ObjectId, ref: 'users', default: null }
})

module.exports = TaskModel;