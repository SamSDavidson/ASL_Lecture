//import router
const router = require('express').Router();

//import decision controller
const decisionCtrl = require('../controllers/decisions');

//GET route
router.get('/', decisionCtrl.getAll);
router.get('/', (req, res)=>{
    res.send("<h1>Decisions</h1>")
})
//get /decision/public
router.get('/public', decisionCtrl.getPublic);
// GET decisions/:id
router.get('/:id', decisionCtrl.getOneById);
//Post decisions
router.post('/', decisionCtrl.createDecision);
//PUT
router.put('/:id', decisionCtrl.updateDecision);
//DELETE
router.delete('/:id', decisionCtrl.removeDecision);
//export route
module.exports = router;