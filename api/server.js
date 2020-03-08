//setting up a logger
const log = require('debug')('api:logging');

//get express app
const app = require('./app');

//set port via environ variable or 4000
const port = process.env.PORT || 4000;

//start the server and log the port
app.listen(port, ()=> (`API listening on port ${port}!`));

