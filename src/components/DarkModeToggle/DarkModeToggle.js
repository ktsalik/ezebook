import React from 'react';
import './DarkModeToggle.css';

class DarkModeToggle extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      active: false,
    };
    
    this.onClick = this.onClick.bind(this);
  }

  onClick() {
    let newState = !this.state.active;
    this.setState({
      active: newState,
    });
    this.props.onChange(newState ? 'on' : 'off');
  }

  render() {
    return (
      <div
        className={`dark-mode-toggle ${this.state.active ? 'dark' : 'normal'}`}
        onClick={this.onClick}
      >
        <div className={`bullet ${this.state.active ? 'active' : ''}`}></div>
      </div>
    );
  }
}
export default DarkModeToggle;
