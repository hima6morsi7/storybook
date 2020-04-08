import React, { Component } from 'react';
import { withRouter,Link} from "react-router-dom";
import './footer.css';
class Footer extends Component {
  render() {
    return (
    <footer className="main-footer">
  <strong>Copyright © 2020 <a href="#">StoryBook</a>.</strong> All rights
  reserved.
</footer>
  );
  }
}

export default withRouter(Footer);
