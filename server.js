require('dotenv').config()

const sqlite = require("sqlite");
const cors = require("cors");
const morgan = require("morgan");
const express = require("express");
const bodyParser = require("body-parser");


console.log("Initialising backend...");

/*_____________initialization_______________*/
var app = express();
if (!process.env.PORT) {
    console.log("Port not specified!");
    process.exit(1);
}
if (!process.env.SQLITE_DB) {
    console.log("Database not specified!");
    process.exit(1);
}

app.listen(process.env.PORT);

console.log("Listening on port " + process.env.PORT);

const dbPromise = Promise.resolve()
  .then(() => sqlite.open(process.env.SQLITE_DB, { Promise }))
  .then(db => db.migrate({ force: 'last' }));

//CORS error handling
app.use(cors());

/*___________imported middleware_____________*/
//logging
app.use(morgan("dev"));

//data decoding
app.use(bodyParser.json({limit: "50mb"}));
app.use(bodyParser.urlencoded({extended: true, limit: "50mb"}));

/*_______routes for request handling__________*/


//catch the not handled requests
app.use((req, res, next) => {
	const error = new Error("Not found");
	error.status = 404;
	next(error);		//forwards error resoinse
});

//handles errors from other parts of the api (such as database errors)
app.use((error, req, res, next) => {
	res.status(error.status || 500);
	res.json({
		error: {
			message: error.message
		}
	});
});

console.log("Backend successfully initialised!");