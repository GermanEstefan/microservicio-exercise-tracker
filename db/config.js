const mongoose = require("mongoose");

const connectToDB = async () => {
    try {

        if (!process.env.DBURI) {
            throw new Error('DB uri not is provider');
        }

        await mongoose.connect(process.env.DBURI);
        return 'Db is running';

    } catch (error) {
        throw new Error('Error to connect to DB, error:\n' + error);
    }
}

module.exports = connectToDB;

