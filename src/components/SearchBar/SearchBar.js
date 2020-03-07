import React from 'react';
import './SearchBar.css';

class SearchBar extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      showPlaceholder: true,
      value: '',
    };

    this.triggerChangeTimeout = null;

    this.elRef = React.createRef();

    this.onInputFocus = this.onInputFocus.bind(this);
    this.onInputBlur = this.onInputBlur.bind(this);
    this.onInputChange = this.onInputChange.bind(this);
    this.onPlaceholderClick = this.onPlaceholderClick.bind(this);
    this.clear = this.clear.bind(this);
  }

  onInputFocus() {
    this.setState({
      showPlaceholder: false,
    });
  }

  onInputBlur() {
    if (this.state.value.length === 0) {
      this.setState({
        showPlaceholder: true,
      });
    }
  }

  onInputChange(e) {
    this.setState({
      value: e.target.value,
    });
    clearTimeout(this.triggerChangeTimeout)
    this.triggerChangeTimeout = setTimeout(() => {
      this.props.onChange(this.state.value);
    }, 333);
  }

  clear() {
    this.setState({
      value: '',
    });
    this.props.onChange('');
    this.elRef.current.querySelector('input').focus();
  }

  onPlaceholderClick() {
    this.elRef.current.querySelector('input').focus();
  }

  render() {
    return (
      <div
        className={`search-bar ${this.props.darkMode === 'on' ? 'dark' : ''}`}
        ref={this.elRef}
      >
        {this.state.showPlaceholder ? (
          <div
            className="placeholder"
            onClick={this.onPlaceholderClick}
          >
            Search
          </div>
        ) : ''}
        <input
          type="text"
          onFocus={this.onInputFocus}
          onBlur={this.onInputBlur}
          value={this.state.value}
          onChange={this.onInputChange}
        ></input>
        {this.state.value.length > 0
          ? <div
              className="btn-clear"
              onClick={this.clear}
            >
              &times;
            </div>
          : ''
        }
      </div>
    );
  }
}
export default SearchBar;
