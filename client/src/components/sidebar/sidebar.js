import React, { Component } from 'react';
// import jwt from 'jwt-decode';

class Sidebar extends Component {
  constructor(props){
    super(props)
    this.state = {
      title:"storybook",
      username:"storybook"
    }
  }
  render() {
    if(!localStorage.getItem("TOKEN_KEY")){
      this.props.history.push('/login');
    }
    console.log(this.props.user)
    // let  user = jwt(localStorage.getItem("TOKEN_KEY")) ;
    return (
  <aside className="main-sidebar sidebar-dark-primary elevation-4">
  {/* Brand Logo */}
  <a href="index3.html" className="brand-link">
    <img src="dist/img/AdminLTELogo.png" alt={this.state.title + "logo"} className="brand-image img-circle elevation-3" style={{opacity: '.8'}} />
    <span className="brand-text font-weight-light">{this.state.title}</span>
  </a>
  {/* Sidebar */}
  <div className="sidebar">
    {/* Sidebar user panel (optional) */}
    <div className="user-panel mt-3 pb-3 mb-3 d-flex">
      <div className="image">
        <img src="dist/img/user2-160x160.jpg" className="img-circle elevation-2" alt="User Image" />
      </div>
      <div className="info">
        <a href="#" className="d-block">{this.props.user.username}</a>
      </div>
    </div>  
  </div>
  {/* /.sidebar */}
</aside>
    );
  }
}

export default Sidebar;
