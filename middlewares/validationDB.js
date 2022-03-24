const UserModel = require("../models/User")

const verifyUserExistence = async (id) => {

    const result = await UserModel.findById(id);
    if (!result) {
        throw new Error(`Dont exist user with id ${id}`);
    }
}

module.exports = {
    verifyUserExistence
}