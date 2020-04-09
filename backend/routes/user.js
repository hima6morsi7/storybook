const express = require('express')
const Router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require("../jwt");
const User = require("../models/user_schema");
const Chat = require("../models/message_schema");
const _filter = { 'pwd': 0, '__v': 0 };
const fs = require('fs');
const path = require('path');
const publicKEY = fs.readFileSync(__dirname + '/../keys/server.pem', 'utf8');

// Delete all chat records
// Chat.remove({}, function(e, d) {})
// Encryption
Router.get('/list', function(req, res) {
    const { type } = req.query
    // Delete all users
    // User.remove({}, function(e, d) {})
    User.find({ type }, _filter, function(err, doc) {
        return res.json({ code: 0, data: doc })
    })
});
Router.get('/getmsglist', function(req, res) {
    const jwt = require('jsonwebtoken');
    const decoded = jwt.verify(req.headers.authorization.split(' ')[1],publicKEY);			
    
    User.find({}, function(err, userdoc) {
        let users = {};
        userdoc.forEach(v => {
            if(decoded.username === v.username ){
                users[v._id] = { name: v.username,currentuser : true}
            }
            users[v._id] = { name: v.username,currentuser : false}
        })
        
        Chat.find({ from: decoded.username }, function(err, doc) {
            // console.log(doc)
            if (!err) {
                return res.json({ code: 0, msgs: doc, users: users })
            }
        })
    })
})
Router.post('/update', async function(req, res) {
    const { id,from,message } = req.body;
    console.log(req.body)
    const editMessage = {
        message: message,
        from,
        id
    };
    const updatedMessage = await Chat.findByIdAndUpdate(id, editMessage, { new: true });
    res.json({ code: 0, updatedMessage })    
})
Router.post('/delete', async function(req, res) {
    const deletedMessage = await Chat.findByIdAndRemove(req.body);
    res.json({ code: 0, deletedMessage })    
})
Router.post('/readmsg', function(req, res) {
    const userid = req.cookies.userid;
    if (!userid) {
        return json.dumps({ code: 1 });
    }
    const body = req.body;
    User.findByIdAndUpdate(userid, body, function(err, doc) {
        const data = Object.assign({}, {
            user: doc.user,
            type: doc.type
        }, body)
        return res.json({ code: 0, data })
    })
});
Router.post("/login", async (req, res) => {
    let doc = await User.findOne({ email: req.body.email });
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
  Router.post("/register", async (req, res) => {
    try {
      req.body.password = await bcrypt.hash(req.body.password, 8);
      await User.create(req.body);
      console.log("hello world");
      res.json({ result: "success", message: "Register successfully" });
    } catch (err) {
      console.log(err)
      res.json({ result: "error", message: err.errmsg });
    }
  });
Router.get('/info', function(req, res) {
    const { userid } = req.cookies;
    if (!userid) {
        return res.json({ code: 1 })
    }
    User.findOne({ _id: userid }, _filter, function(err, doc) {
            if (err) {
                return res.json({code: 1, msg:'back-end error'})
            }
            if (doc) {
                return res.json({ code: 0, data: doc })
            }
        })
        // Do users have cookies?

});


  

module.exports = Router