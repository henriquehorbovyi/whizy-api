const express = require('express');
const knex = require('../db/connection'); 
const router = express.Router();

router.all('*', (req, res, next) => {
	next();
});

//Authentication (add more checks)  
router.get('/auth/:user/:pass', (req, res) => {
  knex.select('login','password','name','email','bio','birthday',
  			  'profile_picture','location','followers','following','skills')
  .from('users')
  .where({'email':req.params.user, 'password':req.params.pass})
  .limit(1)
  .then( function(users){
    var data = {message : "user not found!"}; 
    if(users[0] != undefined){
      data = users[0];  
    }
    res.json(data);
  })
  .catch(function(err) { res.send(err.stack) });
});

//FIND ONE SPECIFIC USER #DONE!
router.get('/find/:name', (req, res) => {
  knex.select('login','name','email','bio','birthday',
  			  'profile_picture','location','followers','following','skills')
  .from('users')
  .where('login', req.params.name)
  .limit(1)
  .then( user => res.json(user[0]) );
});

//LIST ALL WITH PAGINATION #DONE!
router.get('/page/:start/:limit', (req, res) => {
  knex.select('login','name','email','bio','birthday',
  			  'profile_picture','location','followers','following','skills')
  .from('users')
  .offset(parseInt(req.params.start))
  .limit(parseInt(req.params.limit))
  .then( users => res.json({users : users}) );
});

//TODO(CREATE_NEW_USER)
router.post('/create', (req,res) => {
	console.log(req.body.name+" saved!");
	var user = {
		name : req.body.name,
		pass : req.body.pass 
	};
	res.send(user);
});
module.exports = router;


/* ===========  CREATE A FILE TO KNEX FUNCTIONS =========== */