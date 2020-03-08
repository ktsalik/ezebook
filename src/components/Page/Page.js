import React from 'react';
import moment from 'moment';
import './Page.css';

class Page extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      view: {
        title: this.props.page.title,
        description: this.props.page.description,
        type: this.props.page.type,
        publishedOn: this.props.page.publishedOn,
      },
    };

    this.onTitleInputChange = this.onTitleInputChange.bind(this);
    this.onDescriptionInputChange = this.onDescriptionInputChange.bind(this);
    this.chooseType = this.chooseType.bind(this);
    this.onPublishDateChange = this.onPublishDateChange.bind(this);
  }

  onTitleInputChange(e) {
    this.setState({
      view: {
        ...this.state.view,
        title: e.target.value,
      },
    }, () => {
      this.props.onChange(this.state.view);
    });
  }

  onDescriptionInputChange(e) {
    this.setState({
      view: {
        ...this.state.view,
        description: e.target.value,
      },
    }, () => {
      this.props.onChange(this.state.view);
    });
  }

  chooseType(type) {
    this.setState({
      view: {
        ...this.state.view,
        type: type,
      },
    }, () => {
      this.props.onChange(this.state.view);
    });
  }

  onPublishDateChange(e) {
    let date = moment();
    switch (e.target.value.slice(-1)) {
      case 'm':
        date.add('month', parseInt(e.target.value));
        break;
      case 'y':
        date.add('year', parseInt(e.target.value));
        break;
      default:
        date = moment();
        break;
    }
    this.setState({
      view: {
        ...this.state.view,
        publishedOn: date.format("YYYY-MM-DD HH:mm:ss"),
      },
    }, () => {
      this.props.onChange(this.state.view);
    });
  }

  render() {
    return (
      <div className={`page ${this.props.darkMode === 'on' ? 'dark' : 'light'}`}>
        <input
          className="title-input"
          type="text"
          placeholder="Page Title"
          value={this.state.view.title}
          onChange={this.onTitleInputChange}
        ></input>
        <textarea
          className="description-input"
          placeholder="Page Description"
          cols="51"
          rows="12"
          value={this.state.view.description}
          onChange={this.onDescriptionInputChange}
        ></textarea>
        <div className="types-container">
          <button
            className={`${this.state.view.type === 0 ? 'active' : ''}`}
            onClick={this.chooseType.bind(this, 0)}
          >
            <i className="material-icons">menu_open</i>
          </button>
          <button
            className={`${this.state.view.type === 1 ? 'active' : ''}`}
            onClick={this.chooseType.bind(this, 1)}
          >
            <i className="material-icons">error_outline</i>
          </button>
          <button
            className={`${this.state.view.type === 2 ? 'active' : ''}`}
            onClick={this.chooseType.bind(this, 2)}
          >
            <i className="material-icons">dashboard</i>
          </button>
        </div>
        <select
          className="publish-date"
          onChange={this.onPublishDateChange}
        >
          <option value="now">Now</option>
          <option value="1m">1 Month</option>
          <option value="5m">5 Months</option>
          <option value="10m">10 Months</option>
          <option value="1y">1 Year</option>
          <option value="2y">2 Years</option>
          <option value="3y">3 Years</option>
        </select>
      </div>
    );
  }
}
export default Page;
