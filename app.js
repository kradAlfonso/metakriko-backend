const express = require("express");
const mongoose = require("mongoose");
const dotenv = require('dotenv');

const app = express();
app.use(express.static("public"));
dotenv.config();

console.log(process.env.DB);

const db = process.env.DB;

mongoose.connect(
  db,
  {
    useNewUrlParser: true,
  }
);

const usersSchema = {
  name: String,
};

const User = mongoose.model("User", usersSchema);

const user1 = new User({
  name: "Alfonso Kriko",
});

const user2 = new User({
  name: "Luis Kriko",
});

const user3 = new User({
  name: "Fer Kriko",
});

const defaultUsers = [user1, user2, user3];

app.get("/", function (req, res) {
  User.find({}, function (err, foundUsers) {
    if (err) {
      console.log(error);
    } else {
      if (foundUsers.length === 0) {
        User.insertMany(defaultUsers, function (error) {
          if (error) {
            console.log(error);
          } else {
            console.log("Successfully savevd default users to DB.");
          }
        });
      }
    }
  });
});

let port = process.env.PORT;
if (port == null || port == "") {
  port = 8000;
}

app.listen(port, function () {
  console.log("Server started successfully");
});
