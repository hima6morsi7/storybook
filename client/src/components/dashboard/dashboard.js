import React, { Component } from 'react';
import jwt from 'jwt-decode';
import Header from "../../components/header";
import Sidebar from "../../components/sidebar";
class Dashboard extends Component {
  constructor(props){
    super(props)
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
     
    {/* Content Wrapper. Contains page content */}
  <div className="content-wrapper">
    {/* Content Header (Page header) */}
    <div className="content-header">
      <div className="container-fluid">
        <div className="row mb-2">
          <div className="col-sm-6">
            <h1 className="m-0 text-dark">Dashboard</h1>
          </div>{/* /.col */}
          <div className="col-sm-6">
            <ol className="breadcrumb float-sm-right">
              <li className="breadcrumb-item"><a href="#">Home</a></li>
              <li className="breadcrumb-item active">Dashboard v1</li>
            </ol>
          </div>{/* /.col */}
        </div>{/* /.row */}
      </div>{/* /.container-fluid */}
    </div>
    {/* /.content-header */}
    {/* Main content */}
    <section className="content">
     
    </section>
    {/* /.content */}
  </div>
  {/* /.content-wrapper */}
</div>
</div>)
    
  }
}

export default Dashboard;
