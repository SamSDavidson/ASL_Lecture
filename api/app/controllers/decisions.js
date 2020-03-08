//load in decision model
const {Decisions} = require('../models')

//get all decisions
exports.getAll = (req, res) => {
    //run find all on the model
    const decisions = Decisions.findAll();

    //respond with json
    res.json(decisions);
}

//get all type public decisions
exports.getPublic = (req, res) =>{
    //run find all
    const decisions = Decisions.findAll();

    //filter to type public
    const publicDecisions = decisions
        .filter(decision => decision.type ==='public');
    //respond with json of public decision array
    res.json(publicDecisions);
};

//find one decision by id
exports.getOneById = (req, res) =>{
    //get id from route params
    const {id} = req.params;

    //search decision model for decision
    const decision = Decisions.findByPk(id);

    if(!decision){
        //return 404 not found
        res.sendStatus(404);
        return;
    }

    //if decision is found send it back
    res.json(decision);
};

//add a new decision
exports.createDecision = (req, res) =>{
    //get ittle and type values from req
    const {title, type} = req.body;
    //create item and save new id
    const id = Decisions.create({type, title});

    //send new id back to req
    res.json({id});
};

exports.updateDecision = (req, res)=>{
    const{id} = req.params;
    const updatedDecision = Decisions.update(req.body, id);
    res.json(updatedDecision);
};

//delete a decision
exports.removeDecision = (req, res)=>{
    //get id
    const {id} = req.params;
    //remove decision
    Decisions.destroy(id);
    //send good status code
    res.sendStatus(200);
};