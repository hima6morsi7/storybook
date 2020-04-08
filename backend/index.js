const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const bcrypt = require('bcrypt');
const jwt = require("./jwt");

require("./db");
const Users = require("./models/user_schema");
const Message = require("./models/message_schema");
const io = require("socket.io")(http)

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const port = 8080;


app.post("/register", async (req, res) => {
  try {
    req.body.password = await bcrypt.hash(req.body.password, 8);
    await Users.create(req.body);
    console.log("hello world");
    res.json({ result: "success", message: "Register successfully" });
  } catch (err) {
    console.log(err)
    res.json({ result: "error", message: err.errmsg });
  }
});
app.get("/dashboard", async (req, res) => {
  try {
    res.setHeader("Content-Type", "application/json");
        res.statusCode  =  200;
        connectdb.then(db  =>  {
            Message.find({}).then(messages  =>  {
            res.json(messages);
            })
          })
  } catch (err) {
    console.log(err)
    res.json({ result: "error", message: err.errmsg });
  }
});
app.post("/login", async (req, res) => {
  let doc = await Users.findOne({ email: req.body.email });
  if (doc) {
    if (bcrypt.compareSync(req.body.password, doc.password)) {
      const payload = {
        id: doc._id,
        level: doc.level,
        username: doc.username
      };

      let token = jwt.sign(payload);
      res.json({ result: "success", token, message: "Login successfully" });
    } else {
      // Invalid password
      res.json({ result: "error", message: "Invalid password" });
    }
  } else {
    // Invalid username
    res.json({ result: "error", message: "Invalid username" });
  }
});
io.on("connection", socket => {
  console.log("user connected");
    socket.on("disconnect", function() {
    console.log("user disconnected");
    });  
    socket.on("chat message", function(msg) {
        console.log("message: "  +  msg);
        //broadcast message to everyone in port:5000 except yourself.
    socket.broadcast.emit("received", { message: msg  });

    //save chat to the database
    connect.then(db  =>  {
    console.log("connected correctly to the server");

    let  meessage  =  new Message({ message: msg, sender: "Anonymous"});
    meessage.save();
    });
    });
})
app.listen(port, () => {
  console.log("Server is running... on port " + port);
});