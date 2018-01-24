const express = require("express");
const bodyParser = require("body-parser");
const userRouter  = require('./routes/user-routes');
const app = express();

const PORT = 7000;
const HOST = 'localhost';


app.use((req, res, next) => {
	console.log("Primeiro middleware");
	next();
});
app.use(bodyParser.json());
app.use('/users', userRouter);


app.get("/", (req,res) => {
	res.json({message : "api running!"});
});


var handleErros = (err,req,res, next) => { 
	res.status(500).send("500!");
	res.status(404).send("NOT FOUND!");
	console.log(err);
};
app.use(handleErros);


app.listen(PORT, () => {
	console.log("Server running at http://%s:%s",HOST, PORT);
});