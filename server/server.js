const express = require("express");
const port = 5000;
const app = express();
const tasks = require("./routes/tasks");
const connectDB = require("./db/connect");
require("dotenv").config();
// .then(() => console.log("CONNECTED TO DB..."))
// .catch((err) => console.log(err));

//*middleware
app.use(express.json());

//*routes
app.get("/", (req, res) => {
  res.send("task manager app");
});
app.use("/api/v1/tasks", tasks);

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(port, console.log("server running on port 5000"));
  } catch (error) {
    console.log(error);
  }
};

start();
