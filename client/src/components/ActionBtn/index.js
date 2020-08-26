import React from 'react';
import "./style.css";


class ActionBtn extends React.Component {

  state = {

  }


  render() {
    return (
      <button className="actionBtn" onClick={this.props.handleClick} type="submit">{this.props.children}</button>
    );
  }
}

export default ActionBtn;