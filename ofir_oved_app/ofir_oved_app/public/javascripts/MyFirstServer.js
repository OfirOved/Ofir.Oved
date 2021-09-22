const express = require('express');
const bodyparser = require('body-parser');
const sql = require("./db.js");
const app = express();

//parse requests of content-type: application/json 
app.use(bodyparser.json());
//parse requests of content-type: application/x-www-form-urlencoded
app.use(bodyparser.urlencoded({extended: true}));

//simple route
app.get("/", (req, res) => {
    res.json({message: "This is my basic route."});
});

// Create a route for getting all contacts
app.get("/contacts", function(req, res){
    sql.query("SELECT * FROM contacts", (err, mysqlres) => {
        if (err) {
        console.log("error: ", err);
        res.status(400).send({message: "error in getting all contacts: " + err});
        return;
        }
        console.log("got all contacts...");
        res.send(mysqlres);
        return;
    });
});
    
//set port, listen for requests
app.listen(8080, () => {
    console.log("Server is running on port 8080.");
});

