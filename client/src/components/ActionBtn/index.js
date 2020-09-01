import React from 'react';
import "./style.css";


class ActionBtn extends React.Component {

  state = {

  }


  render() {
    return (
<<<<<<< HEAD
      <button className="actionBtn" onClick={this.props.handleClick} type="submit" disabled={this.props.disabled}>{this.props.children}</button>
=======
      <Link to={this.props.url}>
        <button className="actionBtn level-item" onClick={this.props.handleClick}>{this.props.children}</button>
      </Link>
>>>>>>> 837808dac1f21a90e7d71289b8cbf7870f8c738d
    );
  }
}

export default ActionBtn;