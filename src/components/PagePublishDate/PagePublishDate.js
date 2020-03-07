import React from 'react';
import './PagePublishDate.css';

class PagePublishDate extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      showTimeAgo: false,
    };

    this.onMouseEnter = this.onMouseEnter.bind(this);
    this.onMouseLeave = this.onMouseLeave.bind(this);
    this.onClick = this.onClick.bind(this);
  }

  onMouseEnter() {
    this.setState({
      showTimeAgo: true,
    });
  }

  onMouseLeave() {
    this.setState({
      showTimeAgo: false,
    });
  }

  onClick() {
    this.setState({
      showTimeAgo: false,
    });
  }

  render() {
    return (
      <div
        className="publish-date"
        onMouseEnter={this.onMouseEnter}
        onMouseLeave={this.onMouseLeave}
        onClick={this.onClick}
      >
        {this.state.showTimeAgo ? this.props.page.publishedOnAgo : this.props.page.publishedOnDate}
      </div>
    );
  }
}
export default PagePublishDate;
