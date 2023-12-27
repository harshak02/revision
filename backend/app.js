import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import router from "./routes/user-routes";
import blogRouter from "./routes/blog-router";
const app = express();

// app.use("/api",(req,res,next) => {
//     res.send("Hello World!")
// })
app.use(express.json());
dotenv.config();

app.use("/api/user",router);
app.use("/api/blog",blogRouter);

const connect = async () => {
  await mongoose
    .connect(
      process.env.MONGO
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
