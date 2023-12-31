import express from "express";
import dotenv from "dotenv";
import binRouter from "./routes/binRouter.js";
import mongoose from "mongoose";
import userRouter from "./routes/userRouter.js";

dotenv.config();

const port = process.env.PORT || 6942;

const app = express();

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", process.env.CLIENT_URL);
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, PATCH, DELETE"
  );
  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-Requested-With, Content-Type, Authorization"
  );
  next();
});

app.use(express.json({ limit: "50mb" }));
app.use("/user", userRouter);
app.use("/bin", binRouter);
app.get("/", (req, res) => res.json({ message: "BinMaps API" }));
app.use((req, res) =>
  res.status(404).json({ success: false, message: "Not Found" })
);

const startServer = async () => {
  try {
    await mongoose.connect(process.env.MONGO_CONNECT);
    app.listen(port, () => console.log(`Looking at: ${port}`));
  } catch (error) {
    console.log(error);
  }
};

startServer();
