const { Schema, model } = require('mongoose');

const exerciseSchema = new Schema({
    description: {
        type: String,
        required: true
    },
    duration: {
        type: Number,
        required: true
    },
    date: {
        type: Date,
        default: new Date().toDateString()
    },
    user: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    }
})

const ExerciseModel = model('Exercise', exerciseSchema);

module.exports = ExerciseModel;