const UserModel = require('../models/User');
const ExerciseModel = require('../models/Exercise');

const createUsers = async ({ body }, res) => {
    const { username } = body;

    try {
        const user = await new UserModel({ username }).save();
        const { username: userSaved, _id } = user;
        return res.json({ username: userSaved, _id });
    } catch (err) {
        console.log(err);
        return res.status(500).json({ msg: 'Error to save user, please contact admin' });
    }
}

const createExercises = async (req, res) => {
    const { id } = req.params;
    let { description, duration, date } = req.body;

    try {
        if (!date) date = new Date().toDateString();
        const exercise = await new ExerciseModel({ description, duration, date, user: id }).save();
        const { username, _id } = await UserModel.findById(id);
        const { duration: durationDB, description: descriptionDB, date: dateDB } = exercise;
        return res.json({
            _id,
            username,
            date: dateDB.toDateString(),
            duration: durationDB,
            description: descriptionDB
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ msg: 'Error to save exercise, please contact admin' });
    }
}

const getAllUsers = async (req, res) => {
    try {
        const findUsers = await UserModel.find();
        return res.json(findUsers)
    } catch (err) {
        return res.json(err)
    }
}

const getExercises = async (req, res) => {
    const { id } = req.params;
    const { from, to, limit = 10 } = req.query;

    try {
        const findData = await ExerciseModel.find({ user: id })
            .select({ description: 1, duration: 1, date: 1, _id: 0 })
            .populate('user')
            .limit(limit)

        const { _id, username } = findData[0].user;
        const dataMaped = findData.map(data => {
            return {
                description: data.description,
                duration: data.duration,
                date: data.date.toDateString()
            }
        })

        return res.json({
            _id,
            username,
            count: dataMaped.length,
            log: dataMaped
        })
    } catch (error) {
        console.log(error);
        return res.json(error);
    }

}

module.exports = {
    createUsers,
    createExercises,
    getAllUsers,
    getExercises
}