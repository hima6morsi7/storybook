import React, { Component } from "react";
import Footer from "./components/footer";
import Dashboard from "./components/dashboard";
import Register from "./components/register";
import Login from "./components/login";
import Chat from './components/chat'
import { BrowserRouter as Router, Switch, Route,Redirect,withRouter } from "react-router-dom";

const isLoggedIn = () => {
  return localStorage.getItem("TOKEN_KEY") != null;
};

// Protected Route
const SecuredRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      // ternary condition

      isLoggedIn() === true ? (
        <Component {...props} />
      ) : (
        <Redirect to="/login" />
      )
    }
  />
);
export default class App extends Component {
  
  render() {
    let props = this.props;   
    return (
      <Router>
          <Switch>
           <div>                     
            <Route path="/register" component={Register} />
            <Route path="/login" component={Login} />
            <SecuredRoute path="/dashboard" component={Dashboard} />
            <SecuredRoute path='/chat' component={Chat} />

           </div>
           
          </Switch>
      </Router>
    );
  }
}