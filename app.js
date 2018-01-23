const express = require("express");
const bodyParser = require("body-parser");
const userRouter  = require('./user-routes')
const app = express();

const PORT = 3000;
const HOST = 'localhost';


app.use((req, res, next) => {
	console.log("Primeiro middleware");
	next();
});

app.use(bodyParser.json());
app.use('/user', userRouter);

	/*, (req, res, next) => {
	console.log("Segundo middleware");
	next();
});
app.use((req, res, next) => {
	console.log("Terceiro middleware");
	next();
});*/



app.get("/", (req,res) => {
	res.send("api running!");
});
app.get("/date", (req,res) =>{
	var data = {
		data : Date.now(),
		resposta : "Success"
	}
	res.send(data);
});
app.get("/users/:user", (req,res) => {
	var id = req.params.user;
	var data = {
		id : id
	}
	res.send(data);
});

var handleErros = (err,req,res, next) => { 
	res.status(500).send("Algo está errado!");
};
app.use(handleErros);


app.listen(PORT, () => {
	console.log("Server running at http://%s:%s",HOST, PORT);
});