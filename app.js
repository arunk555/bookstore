require('dotenv').config();
const express = require('express');
const mongodb = require('./database/monodb').connect();
const app = express();
const admUserRoute = require('./route/admin/user');
const admProdRoute = require('./route/admin/product');

const { VERSION } =process.env;
const mainRoute = VERSION;
const admRoute =  "/"+mainRoute+"/admin";
//console.log(admRoute);
app.use(express.json({
    limit: '500mb'
}));

app.use(express.urlencoded({
    extended: false
}));

/* Admin Users Route */
app.use(admRoute, admUserRoute);
/* Product Route */
app.use(admRoute, admProdRoute);

/*app.get('/', (req, res)=>{
  return res.status(200).json({
    status: true,
    message: "Hi friends!"
  });
});*/

app.use("*", function(req, res){
 return res.status(404).json({
   status: false,
   message: "Requsted route is not found!"
 });
});


module.exports = app;