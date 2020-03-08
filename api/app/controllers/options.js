//option model
const {Options} = require('../models');

//get options that belong to one decision
exports.getDecisionOptions = (req, res) =>{
    //decision id
    const {decisionId} = req.query;
    //run find all function on model
    const options = Options.findAll();
    //filter options to only options
    const decisionOptions = options
        .filter(option => option.decisionId === decisionId);
    //resp with json of decision (option) array
    res.json(decisionOptions);
}

exports.getOneById = (req, res)=>{
    const{id}= req.params;
    const option = Options.findByPk(id);
    if(!option){
        res.sendStatus(404);
        return;
    }
    res.json(option);
};

exports.createOption = (req, res) =>{
    const {value, decisionId} = req.body;
    const id = Options.create({value, decisionId});
    res.json({id});
};

exports.updateOption = (req, res) =>{
    const {id} = req.params;
    const updateOption = Option.update(req.body, id);
    res.json(updateOption)
};

exports.removeOption = (req, res)=>{
    const {id} = req.params;
    Options.destroy(id);
    res.sendStatus(200);
}