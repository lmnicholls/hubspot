const path = require("path");
const express = require("express");
const { urlencoded } = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const keys = require("./config/keys");
const routes = require("./routes/index");
const app = express();
require("dotenv/config");

const PORT = process.env.PORT || 8000;

//local connection to start for dev and testing
//plan for deployment to heroku
mongoose.connect(
  keys.MONGODB_URI,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  () => console.log("connected to db")
);

//middlewares
app.use(express.json());
app.use(urlencoded({ extended: false }));
app.use(cors());

//routes
app.use(routes);

//cofiguring client routes
if (process.env.NODE_ENV === "production") {
  //aaron's code from the lesson
  //app.use(express.static("../../client/build"));
  // const path = require("path");
  // app.get("*", (req, res) => {
  //   res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  // });

  //code that lauren set up website
  // Have Node serve the files for our built React app
  app.use(express.static(path.resolve(__dirname, "../../client/build")));

  // All other GET requests not handled before will return our React app
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "../../client/build", "index.html"));
  });
}

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
