const mongoose = require('mongoose')

const schema = new mongoose.Schema({
    title: { type: String, required: true},
    detail: {type: String, required: true},
    category: { type: String, enum: ['feature', 'ui', 'ux', 'enhancement', 'bug'], required: true,},
    upvotes: { type: Number, default: 0},
    status: { type: String, enum: ['suggestion', 'planned', 'in-progress', 'live'], default: 'planned'},
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
})

schema.statics.upvote = function(id) {
    return this.findByIdAndUpdate(id, { $inc: { upvotes: 1}}, { returnDocument: 'after'})
}

const FeedbackRequest = mongoose.model('FeedbackRequest', schema)

module.exports = FeedbackRequest