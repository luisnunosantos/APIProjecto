const express = require('express');
const logger = require('morgan');
const mongoose = require('mongoose');
const bobyParser = require('body-parser');

mongoose.Promise = global.Promise;
// mongoose.connect('mongodb://192.168.1.8/DB')
mongoose.connect('mongodb://62.28.170.217/DB')
const app = express();

// Routes
const users = require('./routes/users');

// Middlewares
app.use(logger('dev'));
app.use(bobyParser.json());

// Routes
app.use('/users', users);


// Catch 404 Errors and forwards them to error handler
app.use((req, res, next) => {
    const err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// Error handler function
app.use((err, req, res, next) => {
    const error = app.get('env') === 'development' ? err : {};
    const status = err.status || 500;

    // respond to client
    res.status(status).json({
        error: {
            message: error.message
        }
    });

    // Respond to ourselver
    console.error(err);
});

// Start the Server
const port = app.get('port') || 3000;
app.listen(port, () => console.log(`Server is listening on port $(port)`));
