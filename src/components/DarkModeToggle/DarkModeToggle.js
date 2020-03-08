import React from 'react';
import './DarkModeToggle.css';

class DarkModeToggle extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      active: this.props.darkMode === 'on',
    };
    
    this.onClick = this.onClick.bind(this);
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.darkMode != this.props.darkMode) {
      this.setState({
        active: this.props.darkMode === 'on',
      });
    }
  }

  onClick() {
    // toggle state
    let newState = !this.state.active;
    // update component state
    this.setState({
      active: newState,
    });
    // trigger component change event
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
