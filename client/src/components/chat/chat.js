import React, { Component } from 'react';

import React, { useState, useEffect } from "react"
import "./Chat.css"
import Message from "./Message"
import socketIOClient from "socket.io-client"
const socket = socketIOClient("http://localhost:8080")

class Chat extends Component {
  constructor(props){
    super(props)
    this.state = {
      userName : "",
      message  : "",
      messages : []
    }
  }
  componentDidMount(){
    const uName = prompt("Name?")
    if (uName) {
      this.setUserName(uName)
    }
    socket.on("message", message => {
      this.setMessages([...messages, message])
    })
  }
  setUserName(username){
    this.setState({username : username})
  }
  setMessage(message){
    this.setState({message : message})
  }
  setMessages(messages){
    this.setState({messages : messages})
  }
  render() {
    return (
      <div className="wrapper">
        <div className="card border-primary">
          <h5 className="card-header bg-primary text-white">
            <i className="fas fa-comment"></i> Chat
          </h5>
          <div className="card-body overflow-auto">
            {messages.map((msg, index) => (
              <Message
                key={index}
                userName={msg.userName}
                message={msg.message}
              />
            ))}
          </div>
          <div className="card-footer border-primary p-0">
            <div className="input-group">
              <input
                value={message}
                onChange={e => {
                  this.setMessage(e.target.value)
                }}
                type="text"
                className="form-control input-sm"
                placeholder="Type your message here..."
              />
              <button
                className="btn btn-primary btn-sm"
                onClick={_ => {
                  const msg = {
                    id: Math.random() * 10,
                    message,
                    userName: userName,
                  }
                  this.setMessages([...messages, msg])
                  this.setMessage("")
  
                  socket.emit("message", msg)
                }}
              >
                Send
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }

  }
export default Chat;