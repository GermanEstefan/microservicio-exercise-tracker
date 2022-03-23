const UserModel = require('../models/User');
const ExerciseModel = require('../models/Exercise');

const createUsers = async (req, res) => {

    const { username } = req.body;
    const user = new UserModel({ username: username.trim() });

    try {
        await user.save();
    } catch (error) {
        console.log(error);
        return res.json(error)
    }

    const { username: userDB, _id } = user;

    return res.json({
        username: userDB,
        _id
    })
}

const createExercises = async (req, res) => {
    const { id } = req.params;
    let { description, duration, date } = req.body;

    if (!date) date = new Date().toDateString();

    const exercise = new ExerciseModel({ description, duration, date, user: id });

    try {
        await exercise.save()
    } catch (error) {
        return res.json({ msg: 'error', error });
    }

    const { username, _id } = await UserModel.findById(id);
    const { duration: durationDB, description: descriptionDB, date: dateDB } = exercise;

    const dataToReturn = {
        _id,
        username,
        date: dateDB,
        duration: durationDB,
        description: descriptionDB
    }

    return res.json(dataToReturn);

}

const getAllUsers = async (req, res) => {
    let findUsers;
    try {
        findUsers = await UserModel.find();
    } catch (error) {
        return res.json(error)
    }
    return res.json(findUsers)

}

const getExercises = async (req, res) => {
    const { id } = req.params;
    const { from, to, limit = 10 } = req.query;

    const findData = await ExerciseModel.find({ user: id })
        .select({ description: 1, duration: 1, date: 1, _id: 0 })
        .populate('user')
        .limit(limit)

    const { _id, username } = findData[0].user;
    const dataMaped = findData.map(data => {
        return {
            description: data.description,
            duration: data.duration,
            date: data.date
        }
    })

    return res.json({
        _id,
        username,
        count: dataMaped.length,
        log: dataMaped
    })

}

module.exports = {
    createUsers,
    createExercises,
    getAllUsers,
    getExercises
}