import React from 'react';

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
        style={{
          width: '100%',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          whiteSpace: 'nowrap',
          textAlign: 'center',
        }}
      >
        {this.state.showTimeAgo ? this.props.page.publishedOnAgo : this.props.page.publishedOnDate}
      </div>
    );
  }
}
export default PagePublishDate;
