const mongoose = require("mongoose");
const MONGO_URI =
  "mongodb+srv://qbro123:otibt1307@assignment-ri9it.gcp.mongodb.net/assignment?authSource=admin&replicaSet=assignment-shard-0&readPreference=primary&appname=MongoDB%20Compass%20Community&ssl=true";
const connectDB = async () => {
  const conn = await mongoose.connect(MONGO_URI, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  });
  console.log(`MongoDB Connected: ${conn.connection.name}`);
};
module.exports = connectDB;
