const { isDate } = require('validator');

const isDateCustom = (value) => {
    if (!value) {
        return true;
    } else {
        if (!isDate(value)) {
            throw new Error('Date is invalid use format YYYY-MM-DD || YYYY/MM/DD');
        } else {
            return true;
        }
    }
}

module.exports = isDateCustom