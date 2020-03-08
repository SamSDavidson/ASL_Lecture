// pull in the express package
const express = require('express');
// add the logger
const log = require('debug')('web:logging');
// add another logger
const error = require('debug')('web:error');
//load axios middelware
const API = require('./utils/API');
//load routers
const publicRoutes = require('./routes/public');
const adminDecisionRoutes = require('./routes/adminDecisions');
const adminOptionRoutes = require('./routes/adminOptions');
// create an express app
const app = express();

// setup a folder to hold all the static files
app.use(express.static('public'));

//check if content-type is url-ecnoded and parses into req.body
app.use(express.urlencoded({extended: true}));

//axios middleware
app.use(API);

//set view engine to pug
app.set('view engine', 'pug');

//set view folder as default place for render
app.set('views', `${__dirname}/views`);

//set routers
app.use('/', publicRoutes);
app.use('/admin/decisions', adminDecisionRoutes);
app.use('/admin/options', adminOptionRoutes);
// example middleware that runs once for every request
app.use(
  (req, res, next) =>{
    log('\nRuns Once For Every Request');
    setTimeout(()=>{
      next();
    }, 2000);
  },
  (req, res, next) =>{
    log("Runs With Next");
    next();
  },
);
// route specific middleware
app.use('/about', (req, res, next) => {
  log('RUNS ONLY ON the /about page');
  next(new Error('Not authorized'));
});

// four params are required to mark this as a error handling middleware
// the comment below this allows for eslint to not throw an error because I am not using the next function
// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
  error('ERROR FOUND:', err);
  res.sendStatus(500);
});

// export the express app
module.exports = app;
