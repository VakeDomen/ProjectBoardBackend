require('dotenv').config()
import express = require("express");

const sqlite = require("sqlite");
const cors = require("cors");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const fs = require("fs");
const path = require('path');



console.log("Initialising backend...");

/*_____________initialization_______________*/
var app: express.Application = express();
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
/*____________handle migration_____________ */
Promise.resolve()
.then(() => sqlite.open(process.env.SQLITE_DB, { Promise }))
.then(db => {
	db.migrate()
	// db.migrate({ force: 'last' })
});

//CORS error handling
app.use(cors());

/*___________imported middleware_____________*/
//logging
app.use(morgan("dev"));

//data decoding
app.use(bodyParser.json({limit: "50mb"}));
app.use(bodyParser.urlencoded({extended: true, limit: "50mb"}));

/*_______routes for request handling__________*/
const absPath = path.resolve(__dirname, '.')
fs.readdir(absPath + "/routes/", (err: Error, files: string[]) => {
	if (err) {
		console.log("Error processing routes");
		console.log(err)
		process.exit(1);
	}	
	files.forEach((routeFileName: string) => {
		console.log("Importing " + routeFileName + "...");
		app.use(require( absPath + "/routes/" + routeFileName));
	})

	// catch the not handled requests
	app.use((req, res, next) => {
		const error = new Error("Not found");
		next(error);
	});

	//handles errors from other parts of the api (such as database errors)
	app.use((error: any, req: any, res: any, next: any) => {
		res.status(error.status || 500);
		res.json({
			error: {
				message: error.message
			}
		});
	});

	console.log("Backend successfully initialised!");
});

