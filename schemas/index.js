const mongoose = require("mongoose");

/**
 * Connect to MongoDB
 */
const connectDB = () => {
  mongoose.connect(
    process.env.MONGODB_URI,
    {
      dbName: "expense-tracker",
    },
    (error) => {
      if (error) {
        console.log("MongoDB connection failed", error);
      } else {
        console.log("MongoDB connection success");
      }
    }
  );
};

mongoose.connection.on("error", (error) => {
  console.error("MongoDB connection error", error);
});

// Listening to the status for disconnection and try to reconnect
mongoose.connection.on("disconnected", () => {
  console.log("MonboDB disconnected. Trying to reconnect...");
  connectDB();
});

module.exports = connectDB;
