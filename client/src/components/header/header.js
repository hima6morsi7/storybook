import React, { Component } from 'react';
import swal from "sweetalert";
import { withRouter,Link} from "react-router-dom";
class Header extends Component {
  Logout = () => {
    swal("Are your sure SignOut?", {
      buttons: {
        nope: {
          text: "Let me back",
          value: "nope"
        },
        sure: {
          text: "I'm, Sure",
          value: "sure"
        }
      }
    }).then(value => {
      switch (value) {
        case "sure":
          swal(" SignOut Successfully", "success").then(val => {
            localStorage.removeItem("TOKEN_KEY");
            this.props.history.push("/login");
            
          });
          break;
        case "nope":
          swal("Ok", "success");
          break;
        default:
          swal("Got away safely!");
      }
    });
  };
  render() {
    return (
    <nav className="main-header navbar navbar-expand navbar-white navbar-light">

      {/* Right navbar links */}
      <ul className="navbar-nav ml-auto">
        {/* Messages Dropdown Menu */}
        <li className="nav-item dropdown">
          <a className="nav-link" data-toggle="dropdown" href="#">
          <i className="fas fa-th-large" />
          </a>
          
          <div className="dropdown-menu dropdown-menu-lg dropdown-menu-right">
            <span className="dropdown-item dropdown-header">menu</span>
            <div className="dropdown-divider" />

            <a
              href="#"
              onClick={() => this.Logout()}
              className="dropdown-item">
              <i className="fas fa-sign-out-alt mr-2" /> Logout   </a>
          </div>
        </li>

      </ul>
    </nav>)
  }
}

export default withRouter(Header);
