import React, { Component } from 'react';
import axios from 'axios';
import "./chat.css";
import Message from "../message";
import socketIOClient from "socket.io-client";
import jwt from 'jwt-decode';

const socket = socketIOClient("ws://localhost:8080");


class Chat extends Component {

  constructor(props){
    super(props)
    this.state = {
      username : "",
      message  : "",
      messages : []
    }
  }
  
  componentDidMount(){
    const that = this;
    if(!localStorage.getItem("TOKEN_KEY")){
      this.props.history.push('/login');
    }
    const token = localStorage.getItem("TOKEN_KEY");
    const  user = jwt(localStorage.getItem("TOKEN_KEY")) ;
    const uName = user.username
    if (uName) {
      this.setUserName(uName)
    }
    axios
    .get("http://localhost:8080/user/getmsglist", { headers: { "Authorization" : `Bearer ${token}`} })
    .then(res => {
      if (res.data.code === 0) {
        this.setState({messages: res.data.msgs})
      } else if (res.data.result === 1) {
        return {"err" : "data not received"}
      }
    })
    .catch(error => {
      console.log(error);
    });
    socket.on('recvmsg',function(message){
      console.log('recvmsg',message)
      // const userid = getState().user._id
      // dispatch(msgRecv(data, userid))
      that.setMessages(message)
  })
  }


  setUserName(username){
    this.setState({username : username})
  }
  setMessage(message){
    this.setState({message : message})
  }
  setMessages(message){
    this.setState(state => {
      const messages = [...state.messages, message];

      return {messages};
    });
  }


  render() {
    
    return (
      <div className="wrapper">
        <div className="card border-primary">
          <h5 className="card-header bg-primary text-white">
            <i className="fas fa-comment"></i> Chat
          </h5>
          <div className="card-body overflow-auto">
          {/* { (this.state.edit_message === message_user.id)
                ? <MessageForm 
                    key={message_user.id}
                    id={message_user.id} 
                    content={message_user.content} 
                    editMessageChange={this.editMessageChange}
                    newMessageChange={this.newMessageChange}
                    hashtags={this.props.hashtags} 
                />
                : <span>{ ReactHtmlParser(message_user.content_with_link)} <br /></span>
                } */}
            {this.state.messages.map((msg, index) => (
              <Message
                key={index}
                userName={msg.username}
                message={msg.message}
              />
            ))}
          </div>
          <div className="card-footer border-primary p-0">
            <div className="input-group">
              <input
                value={this.state.message}
                onChange={e => {
                  this.setMessage(e.target.value)
                }}
                type="text"
                className="form-control input-sm"
                placeholder="Type your message here..."
              />
              <button
                className="btn btn-primary btn-sm"
                onClick={ () => {
                  const msg = {
                    message:this.state.message,
                    from: this.state.username,
                  }
                  // this.setMessages(msg)
                  this.setMessage("")
                  console.log("msg " ,msg)
                  socket.emit("sendmsg", msg)
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