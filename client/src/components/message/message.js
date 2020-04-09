// import React, { Component } from 'react';
// import user from "../../assets/avatar.png"
// import './message.css';
// function Message ({username,message}) {
//   return (
//     <>
//       <div className="media">
//         <img
//           className="rounded-circle chat-logo align-self-start mr-3"
//           src={user}
//           alt="Avatar"
//         />
//         <div className="media-body">
//           <h5 className="mt-0">{username}</h5>
//           <p>{message}</p>
//         </div>
//       </div>
//       <div className="dropdown-divider"></div>
//     </>
//   )
//   }

// import './message.css';

import React, { Component } from 'react';
import Edit from '../edit';
import './message.css';

class Message extends Component {

  state = {
    editOn: false,
    messageToEdit:{}
  }

  editToggle = (message) => {
    let messageObj = message
    this.setState({ editOn: !this.state.editOn, messageToEdit: messageObj })

  }

    render() {
        return (
          <div>
            <div className="list-group">
              <div className="list-group-item">
                <div className="row">
                    <div id="name" className="col-md-2 ">{this.props.username}</div>
                    <div id="message" className="col-md-7 ">{this.props.message}</div>

                    <button id="edit" style={{marginRight: .3 +'em'}} className="col-md-1 btn btn-info"
                    onClick={()=>this.editToggle({id: this.props.id, from: this.props.username, message: this.props.message})}>edit</button>

                    <button id="delete" className="col-md-1 btn btn-danger" onClick={()=>this.props.deleteMessage(this.props.msg)}>delete</button>

                </div>
                <div className="col-md-6 bg-light">
                {!this.state.editOn ? <div></div> :
                    <Edit
                    editMessage={this.props.editMessage}
                    editToggle={this.props.editToggle}
                    message={this.props.message}
                    messages={this.props.messages}
                    messageToEdit={this.state.messageToEdit}
                    />}
                </div>
              </div>
            </div>
          </div>
        )
    }
}
export default Message;
