import React, { Component } from 'react';
import user from "../../assets/avatar.png"
import './message.css';
function Message ({username,message}) {
  return (
    <>
      <div className="media">
        <img
          className="rounded-circle chat-logo align-self-start mr-3"
          src={user}
          alt="Avatar"
        />
        <div className="media-body">
          <h5 className="mt-0">{username}</h5>
          <p>{message}</p>
        </div>
      </div>
      <div className="dropdown-divider"></div>
    </>
  )
  }

export default Message;
