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
  .where({'login':req.params.user, 'password':req.params.pass})
  .limit(1)
  .then( users => res.send(users[0]) );
});

//FIND ONE SPECIFIC USER #DONE!
router.get('/find/:user', (req, res) => {
  knex.select('login','name','email','bio','birthday',
  			  'profile_picture','location','followers','following','skills')
  .from('users')
  .where('login',req.params.user)
  .limit(1)
  .then( user => res.json(user[0]) );
});

//LIST ALL WITH PAGINATION #DONE!
router.get('/page/:p/:l', (req, res) => {
  knex.select('login','name','email','bio','birthday',
  			  'profile_picture','location','followers','following','skills')
  .from('users')
  .offset(parseInt(req.params.p))
  .limit(parseInt(req.params.l))
  .then( users => res.json(users) );
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