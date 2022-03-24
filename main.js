const express = require('express');
const dbInit = require('./db/config');
const { check } = require('express-validator');
require('dotenv').config();
const validationFields = require('./middlewares/validationFields');
const { verifyUserExistence } = require('./middlewares/validationDB');
const { createUsers, createExercises, getAllUsers, getExercises } = require('./controllers/users');
const isDateCustom = require('./middlewares/isDateCustom');

//CONSTS
const PORT = process.env.PORT;

//Init app
const app = express();

//Init DB
dbInit().then(resp => console.log(resp)).catch(err => console.log(err));

//Middlewares
app.use(express.json());
app.use(express.urlencoded());
app.use(express.static('public'));

//Routes
app.post('/api/users', [
    check('username', 'Username field is empty').not().isEmpty(),
    validationFields
], createUsers);

app.post('/api/users/:id/exercises', [
    check('id', 'Not is mongoID').isMongoId(),
    check('id').custom(verifyUserExistence),
    check('date').custom(isDateCustom),
    check('description', 'Description field is empty').not().isEmpty(),
    check('duration', 'Duration not is a number').isNumeric(),
    validationFields
], createExercises);
app.get('/api/users', getAllUsers);

app.get('/api/users/:id/logs', [
    check('id', 'Not is mongoID').isMongoId(),
    check('id').custom(verifyUserExistence),
    validationFields
], getExercises);

//Up server
app.listen(PORT, () => console.log('Server is running in the PORT ', PORT));
