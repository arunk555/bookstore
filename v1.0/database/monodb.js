const mongoose = require('mongoose');
const { MONGO_URL } = process.env;

exports.connect=async()=>{
  try {
    await mongoose.connect(MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log("successfully connected to the mongodb" );
  } catch (error) {
    console.log("Unable to connect the mongoDB! Error "+error.message);
    process.exit(1);
  }
};
