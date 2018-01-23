const express = require('express');
const router = express.Router();

router.all('*', (req, res, next) => {
	console.log('User Routes');
	next();
});
router.get('/', (req,res) => {
	var data = {
		resp : "user api!"
	};
	res.json(data);
});
router.post('/create', (req,res) => {
	console.log(req.body.name+" saved!");
	var user = {
		name : req.body.name,
		pass : req.body.pass 
	};
	res.send(user);
});
module.exports = router;