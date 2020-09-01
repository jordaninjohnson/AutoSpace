import React from 'react';
import "./style.css";
import { Link } from "react-router-dom";

class ActionBtn extends React.Component {

  state = {

  }


  render() {
    return (
      <button className="actionBtn" onClick={this.props.handleClick} type="submit" disabled={this.props.disabled}>{this.props.children}</button>
    );
  }
}

export default ActionBtn;