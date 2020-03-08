import React from 'react';
import './PagePublishDate.css';

class PagePublishDate extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      showTimeAgo: true,
    };

    this.onMouseEnter = this.onMouseEnter.bind(this);
    this.onMouseLeave = this.onMouseLeave.bind(this);
  }

  onMouseEnter() {
    this.setState({
      showTimeAgo: false,
    });
  }

  onMouseLeave() {
    this.setState({
      showTimeAgo: true,
    });
  }

  render() {
    return (
      <div
        className="publish-date"
        onMouseEnter={this.onMouseEnter}
        onMouseLeave={this.onMouseLeave}
      >
        {this.state.showTimeAgo ? this.props.page.publishedOnAgo : this.props.page.publishedOnDate}
      </div>
    );
  }
}
export default PagePublishDate;
