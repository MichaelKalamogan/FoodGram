const mongoose =  require('mongoose')

const UserSchema = new mongoose.Schema ({
    user_id: {type: String, required: true, unique: true},
    name: {type: String, required: true},
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    website:{type: String},
    facebook:{type: String},
    instagram:{type: String},
    created_date: { type: Date, default: Date.now},
    updated_date: { type: Date, default: Date.now}

})

const UserModel = mongoose.model('User', UserSchema)

module.exports = {
    UserModel: UserModel
}