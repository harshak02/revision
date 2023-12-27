import express from "express";
import mongoose from "mongoose";
import router from "./routes/user-routes";
import blogRouter from "./routes/blog-router";
const app = express();

// app.use("/api",(req,res,next) => {
//     res.send("Hello World!")
// })
app.use(express.json());
app.use("/api/user",router);
app.use("/api/blog",blogRouter);
const MONGOURL = "mongodb+srv://sreeharshak002:helloworld@cluster0.qnrsazu.mongodb.net/Blog?retryWrites=true&w=majority"

const connect = async () => {
  await mongoose
    .connect(
      MONGOURL
    )
    .then(() => {
      console.log("Connected to DB!");
    })
    .catch((err) => {
      throw err;
    });
};

app.listen(5000, () => {
  connect();
  console.log("Connected to Server!");
});
