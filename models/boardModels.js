const mongoose = require('mongoose');

const boardSchema = mongoose.Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    title: String,
    assignedUsers: [
        {
            userId: {
                type: String
            },
            role: {
                type: String
            }
        }
    ],
}, {timestamps: true})

module.exports = mongoose.model("Board", boardSchema)
