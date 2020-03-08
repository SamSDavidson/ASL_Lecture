//import
const router = require('express').Router();
//load controller
const decisionCtrl = require('../controllers/decisions');
//Get / Loads home
router.get('/', decisionCtrl.renderLanding);
//export
module.exports = router;
