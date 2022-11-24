const app = require('./app');
const { API_PORT } = process.env;
app.listen(API_PORT || 4000, function(){
 console.log("Express server start on the port %d env %s", this.address().port, app.settings.env);
});
