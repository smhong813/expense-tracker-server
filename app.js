const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const dotenv = require("dotenv");
dotenv.config();

const connectDB = require("./schemas");
const apiRouter = require("./routes/api");

const app = express();
app.set("port", process.env.PORT || 8080);

connectDB();

app.use(morgan("dev"));
app.use(express.json());
app.use(cors());

app.use("/api", apiRouter);

app.use((req, res, next) => {
  const error = new Error(`${req.method} ${req.url} router doesn't exist`);
  error.status = 404;
  next(error);
});

app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.json({
    error: {
      status: err.status,
      message: err.message,
    },
  });
});

app.listen(app.get("port"), () => {
  console.log(`Server on: ${app.get("port")}`);
});
