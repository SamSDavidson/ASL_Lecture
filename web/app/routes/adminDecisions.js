// import routers
const router = require('express').Router();
// load controller
const decisionCtrl = require('../controllers/decisions');
const validationCtrl = require('../controllers/validation');
// Get new decisions route
router.get('/new', decisionCtrl.renderDecisionForm);
// Post new and Save
router.post('/new', validationCtrl.validate('createDecisions'));
router.post('/new', [
  validationCtrl.validate('createDecisions'),
  decisionCtrl.renderDecisionFormWithErrors,
  decisionCtrl.saveDecision,
]);
// Get edit form
router.get('/edit/:id', decisionCtrl.renderEditForm);
// Post
router.post('edit/:id', [
  validationCtrl.validate('editDecision'),
  decisionCtrl.renderDecisionFormWithErrors,
  decisionCtrl.saveDecision,
]);
// GET delete
router.get('/delete/:id', [
  validationCtrl.validate('deleteDecision'),
  decisionCtrl.goBackOnError,
  decisionCtrl.deleteDecision,
]);
// GET all decisions
router.get('/', decisionCtrl.renderDashboard);
// GET details page
router.get('/:id', decisionCtrl.renderAdminDetail);
// exports
module.exports = router;
