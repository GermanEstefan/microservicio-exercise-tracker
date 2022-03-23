const express = require('express');
const { createUsers, createExercises, getAllUsers, getExercises } = require('./controllers/users');
const dbInit = require('./db/config');
require('dotenv').config();

//CONST
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
app.post('/api/users', createUsers);
app.post('/api/users/:id/exercises', createExercises);
app.get('/api/users', getAllUsers);
app.get('/api/users/:id/logs', getExercises);

//Up server
app.listen(PORT, () => console.log('Server is running in the PORT ', PORT));
