const mongoose = require('mongoose')

let schema  = new mongoose.Schema({
    reply: {type: String, required: true},
    comment: { type: mongoose.Schema.Types.ObjectId, ref: 'Comment', required: true},
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true},
    createdAt: { type: Date, default: Date.now},
})

module.exports = mongoose.model('Reply', schema)