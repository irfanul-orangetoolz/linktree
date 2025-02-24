const express = require('express');
const cors = require('cors');
// const passport = require('passport');
// const httpStatus = require('http-status');
// const routes = require('./route');
// const { errorConverter, errorHandler } = require('./middlewares/error');
// const ApiError = require('./helper/ApiError');

const app = express();
// enable cors
app.use(cors());
app.use(express.static('public'));
app.options('*', cors());

// parse urlencoded request body
app.use(express.urlencoded({ extended: true }));

// parse json request body
app.use(express.json());

app.get('/api/v1/test', async (req, res) => {
    res.status(200).send('Congratulations! API is working!');
});

// app.use('/api/v1', routes);

// jwt authentication
// app.use(passport.initialize());
// passport.use('jwt', jwtStrategy);

// send back a 404 error for any unknown api request
// app.use((req, res, next) => {
//     next(new ApiError(httpStatus.NOT_FOUND, 'Not found'));
// });

// convert error to ApiError, if needed
// app.use(errorConverter);

// handle error
// app.use(errorHandler);
require('pg').defaults.parseInt8 = true;

module.exports = app;
