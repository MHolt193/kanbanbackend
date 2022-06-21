const express = require("express");
const bodyParser = require("body-parser");
const cors = require('cors')
require("dotenv/config");
const port = process.env.PORT || 5000;
const connectDb = require("./config/db");

connectDb();

const app = express();
//body parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//CORS
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
  res.header("Access-Controll-Allow-Credentials", true)
  next();
});
//Routes

app.use("/api/boards", require("./routes/boardRoutes"));
app.use("/api/users", require("./routes/userRoutes"));
app.use("/api/boards/list", require("./routes/listRoutes"));

//listen
app.listen(port, () => {
  console.log(`Server Running on port ${port}`);
});

//connect to db
