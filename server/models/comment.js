const mongoose = require('mongoose')

const schema = new mongoose.Schema({
    content: { type: String, required: true},
    feedback: { type: mongoose.Schema.Types.ObjectId, ref: 'FeedbackRequest', required: true},
    createdAt: { type: Date, default: Date.now }
})

const Comment = mongoose.model('Comment', schema)

module.exports = Comment;