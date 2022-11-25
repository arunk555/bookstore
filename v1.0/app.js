require('dotenv').config();
const express = require('express');
const mongodb = require('./database/monodb').connect();
const app = express();
const admUserRoute = require('./route/admin/user');

const { VERSION } =process.env;
const mainRoute = VERSION;
const admRoute =  "/"+mainRoute+"/admin";

app.use(express.json({
    limit: '500mb'
}));

app.use(express.urlencoded({
    extended: false
}));

app.use(admRoute, admUserRoute);


app.use("*", function(req, res){
 return res.status(404).json({
   status: false,
   message: "Requsted route is not found!"
 });
});


module.exports = app;