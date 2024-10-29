const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const connect = require("./dbConfig/dbConfig");
const authRoute = require("./routes/authRoute");
const taskRoute = require("./routes/taskRoute");
const uploadRouter = require("./routes/uploadRouter");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 8080;

const corsOptions = {
  origin: process.env.CLIENT_URL,
  credentials: true,
};

//Middlewares
app.use(express.json());
app.use(cookieParser());
app.use(cors(corsOptions));

//Routes
app.use("/api/auth", authRoute);
app.use("/api/task", taskRoute);
app.use("/api/upload", uploadRouter); //upload image of user

connect(); //COnnect to DB

app.listen(PORT, () => console.log(`Server Started on PORT: ${PORT}`));
