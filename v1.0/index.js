const app = require('./app');
const { PORT } = process.env;
app.listen(PORT || 4000, function(){
 console.log("Express server start on the port %d env %s", this.address().port, app.settings.env);
});
