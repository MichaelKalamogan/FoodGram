const mongoose =  require('mongoose')

const UserSchema = new mongoose.Schema ({
    user_id: {type: String, required: true, unique: true},
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    date: { type: Date, default: Date.now}

})

const UserModel = mongoose.model('User', UserSchema)

module.exports = {
    UserModel: UserModel
}