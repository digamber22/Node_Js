const express = require("express");
const {connectMongoDb} = require('./connection')
const {logReqRes} = require("./middlewares");
const userRouter = require("./routes/user");

const app = express();
const port = 8000;

// connection
connectMongoDb('mongodb://127.0.0.1:27017/Youtube-app-1').then(() =>
console.log('mongoDb connected') )


// middlewares
app.use(express.urlencoded({ extended: false }));
app.use(express.json());


app.use(logReqRes("log.txt"));
app.use("/api/users", userRouter);

/* -------------------- SERVER -------------------- */
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
