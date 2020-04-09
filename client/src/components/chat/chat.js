import React, { Component } from 'react';
import axios from 'axios';
import "./chat.css";
import Message from "../message";
import socketIOClient from "socket.io-client";
import jwt from 'jwt-decode';
import Header from "../../components/header";
import Sidebar from "../../components/sidebar"; 

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

  deleteMessage = async (msg) => {
  const response = await axios
    .post("http://localhost:8080/user/delete", msg)
    if(response.data.code === 0){
      console.log("deleted")
      this.setState({ messages: this.state.messages.filter((message) => message._id !== msg._id) })
    }
    else{
      console.log("server error")
    }
  }

  editMessage = async (obj) => {
    // let data={id, message, name}

    const editedMessage =  await axios.post(`http://localhost:8080/user/update`, obj)
    if(editedMessage.data.code === 0){
      let indexOfEditedMessage = this.state.messages.findIndex(message => message._id === obj.id)
console.log(indexOfEditedMessage)
      this.setState({
          messages: [...this.state.messages.slice(0,indexOfEditedMessage), editedMessage.data.updatedMessage, ...this.state.messages.slice(indexOfEditedMessage + 1)]
      })    }
    else{
      console.log("server error")
    }
   
  }
  render() {
    if(!localStorage.getItem("TOKEN_KEY")){
      this.props.history.push('/login');
    }
    let  user = jwt(localStorage.getItem("TOKEN_KEY")) ;
    return (
      <div>
      <Header />
      <Sidebar user={user} /> 
      <div className="wrapper">
      <div className="content-wrapper">
        <div className="card border-primary">
          <h5 className="card-header bg-primary text-white">
            <i className="fas fa-comment"></i> Chat
          </h5>
          <div className="card-body overflow-auto">
          
            {this.state.messages.map((msg, index) => (
              <Message
                key={index}
                username={msg.from}
                message={msg.message}
                id={msg._id}
                msg={msg}
                deleteMessage={this.deleteMessage}
                editMessage={this.editMessage}
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
      </div>
      </div>
           
    )
  }

  }
export default Chat;