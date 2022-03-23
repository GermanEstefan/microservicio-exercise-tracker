const { Schema, model } = require('mongoose');

const userSchema = new Schema({
    username: {
        type: String,
        unique: true,
        required: true
    }
})

const UserModel = model('User', userSchema);

module.exports = UserModel;