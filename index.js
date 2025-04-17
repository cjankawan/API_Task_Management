require("dotenv").config();
const express = require("express");
const app = express();
const taskRoutes = require("./routes/taskRoutes");
const connectDB = require("./config/db");
const errorMiddleware = require("./middlewares/errorMiddleware");
const morgan = require("morgan");

connectDB();
app.use(morgan("dev"));
app.use(express.json());
app.use("/api/tasks", taskRoutes);
app.use(errorMiddleware);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
