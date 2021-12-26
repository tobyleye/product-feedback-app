const Comment = require('./comment')
const Feedback = require('./feedback')
const User = require('./user')
const Reply = require('./reply')


module.exports = {
    Comment,
    FeedbackRequest: Feedback,
    User,
    Reply
}