const mongoose= require('mongoose')

const feedbackSchema = new mongoose.Schema ({
    name: { type: String, required: true },
    email: {type: String, required: true},
    comments: {type: String},
    created_at: { type: Date, default: Date.now},

})

const FeedbackModel = mongoose.model ('Feedback', feedbackSchema)

module.exports = {
    FeedbackModel: FeedbackModel
}