require('dotenv').config();
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const passport = require("passport");
const cors = require('cors');
const app = express();

const users = require("./routes/user.route");
const project = require("./routes/project.route");
const vrData = require("./routes/360-view.route");

app.use(cors());
app.use(
  bodyParser.urlencoded({
    extended: false
  })
);
app.use(bodyParser.json());

// Connect to MongoDB
mongoose.connect(
    process.env.DB,
    { useNewUrlParser: true, useUnifiedTopology: true }
  )
  .then(() => console.log("MongoDB successfully connected"))
  .catch(err => console.log(err));

// Passport middleware
app.use(passport.initialize());

// Passport config
require("./config/passport")(passport);

// Routes
app.use(`${process.env.API_PREFIX}/users`, users);
app.use(`${process.env.API_PREFIX}/project`, project);
app.use(`${process.env.API_PREFIX}/360-view`, vrData);

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server up and running on port ${port} !`));
