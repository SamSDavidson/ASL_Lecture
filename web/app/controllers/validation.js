const {check, validationResult} = require('express-validator');

const checks = {
  id: check('id')
    .isUUID().withMessage('ID not valid, please try again'),
  title: check('title')
    .exists().withMessage('Decision title required')
    .isLength(3)
    .withMessage('Title must be at least 3 characters'),
  type: check('type')
    .exists().withMessage('Decision type required')
    .isIn(['public', 'private'])
    .withMessage('Must be public or private'),
  value: check('value')
    .exists().withMessage('Option Value Required')
    .isLength(1)
    .withMessage('Option value is required'),
  decisionId: check('decisionId')
    .isUUID().withMessage('Decision ID not valid, try again'),
};

const checkForErrors = (req, res, next) =>{
  //get errors
  const errors = validationResult(req);
  //if errors => errorHandler
  if(!errors.isEmpty()) return next(errors.mapped());
  //if !errors => Next
  return next();
};

exports.validate = (method) =>{
  switch(method){
    case 'createDecisions':{
      return [checks.title, checks.type, checkForErrors];
    }

    case 'editDecision': {
      return [checks.id, checks.title, checks.type, checkForErrors];
    }
    case 'deleteDecision':{
      return [checks.id, checkForErrors];
    }
    case 'createOption':{
      return [checks.value, checks.decisionId, checkForErrors];
    }
    case 'editOption':{
      return[checks.id, checks.value, checks.decisionId, checkForErrors];
    }
    case 'deleteOption':{
      return[checks.id, checkForErrors];
    }
    default:{
      return [];
    }
  }
};
