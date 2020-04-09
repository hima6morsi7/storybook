const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const userRouter = require('./routes/user');
const cookieParser = require('cookie-parser');

require("./db");
const Message = require("./models/message_schema");
const http = require('http');
app.all('*',function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With');
  res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
  if (req.method === 'OPTIONS') {
      res.send(200);
  }
  else {
      next();
  }
});
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieParser());
app.use('/user', userRouter);

const port = 8080;

const server = app.listen(port, () => {
  console.log("Server is running... on port " + port);
});
const io = require("socket.io")(server);
io.on("connection", socket => {
  console.log("user connected");
    socket.on("disconnect", function() {
    console.log("user disconnected");
    });  
    socket.on('sendmsg', async function(data) {
      console.log(data)
      const { from, message } = data;
      console.log(message,from)
      const chatid = [from].sort().join('_');
      try {
        await Message.create({ chatid, from, message });
        io.emit('recvmsg', { chatid, from, message })
       
      } catch (err) {
        console.log(err)
        io.emit('errmsgmsg', err)        
      }

  })
})
