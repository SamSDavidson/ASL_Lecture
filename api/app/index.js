//imports
const error = require('debug')('api:error');
const express = require('express');
const moragnDebug = require('morgan-debug');

//routing
const decisionRouter = require('./routes/decisions');
const optionRouter = require('./routes/options')

//express app
const app = express();

//checks if content is josn and parses into req.body
app.use(express.json());

//log all requests
app.use(moragnDebug('api:request', 'dev'));

//set up app to use router at /decisions
app.use('/decisions', decisionRouter);
//use router at options
app.use('/options', optionRouter);

//4 params required for a error handling middleware
// eslint-disable-next-line no-unused-vars
app.use((err,req,res,next)=>{
    error(`Error Found: ${err}`);
    res.sendStatus(500);
});


//export app
module.exports = app;