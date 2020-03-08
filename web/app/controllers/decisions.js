exports.renderLanding = async (req, res) =>{
  const decisions = await req.API.get('/decisions/public');
  res.render('landing', {decisions});
};

exports.renderDecisionForm = (req, res) =>{
  res.render('decisions/form');
  res.render('decisions/form', {title: '', type:'private'});
};

//4 Params for error handling
// eslint-disable-next-line no-unused-vars
exports.renderDecisionFormWithErrors = (errors, req, res, next)=>{
  //get data
  const{title, type} = req.body;
  //send data as variables
  res.render('decisions/form', {title, type, errors});
};

exports.saveDecision = async(req, res) =>{
  //get data
  const {title, type } = req.body;
  //pull id from url
  const {id} = req.params;
  //variable to hold data
  let data = {};

  //if id => eiditing else !id => adding
  if(id){
    data = await req.API.put(`/decisions/${id}`, {title, type});
  }else{
    data = await req.API.post('/decisions', {title, type});
  }
  //redirect to form
  res.redirect(`/admin/decisions/edit/${data.id}`);
};

exports.renderEditForm = async(req, res) =>{
  //id from url
  const{id} = req.params;
  //details of decision
  const decision = await req.API.get('/decisions/' + id);
  //render edit form
  res.render('decisions/form', decision);
};
//4 params for error
//// eslint-disable-next-line no-unused-vars
exports.goBackOnError=(errors, req, res, next)=>{
  //passing back to redirect sends to previous page
  res.redirect('back');
};

exports.deleteDecision = async(req,res)=>{
  const{id} = req.params;
  //send delete request to API
  await req.API.delete(`/decisions/${id}`);
  //redirect
  res/redirect('/admin/decisions');
};

exports.renderDashboard = async(req, res)=>{
  const decisions = await req.API.get('decisions');
  res.render('decisions/list', {decisions});
};

exports.renderAdminDetail = async(req,res)=>{
  const{id} = req.params;
  //details of decisions
  const decision = await req.API.get(`/decisions/${id}`);
  //options for decision
  const options = await req.API.get(`/options?decisionId=${id}`);
  res.render('decisions/detail',{decision, option})
};
