const path = require("path");
const express = require("express");
const colors = require("colors");
const dotenv = require("dotenv").config();
const { errorHandler } = require("./middleware/errorMiddleware");
const connectDB = require("./config/db");
const port = process.env.PORT || 8000;
const cors = require("cors");

connectDB();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const DEV_API = "http://localhost:3000"
const PROD_API = "https://orbital-frontend-axsauce.vercel.app"

app.use(
  cors({
    origin: DEV_API,
  })
);

app.get("/", (req, res, _next) => {
  res.send("<h1>AXSauce Backend Server</h1>");
});
app.use("/api/modules", require("./routes/moduleRoutes"));
app.use("/api/users", require("./routes/userRoutes"));

app.use(errorHandler);

app.listen(port, () => console.log(`Server started on port ${port}`));

module.exports = app