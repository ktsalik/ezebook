import React from 'react';
import './PageItem.css';
import PagePublishDate from '../PagePublishDate/PagePublishDate';
import PageType from '../PageType/PageType';

class PageItem extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div
        className={`page item ${this.props.darkMode === 'on' ? 'dark' : ''}`}
      >
        <div
          className="page__title-container" 
          title={this.props.page.title}
        >
          {this.props.page.title}
          {!this.props.page.title ? <div className="page__title-ghost"></div> : undefined}
        </div>
        <div className="page__type-container">
          {
            this.props.showTypeIcon
              ? <PageType
                  page={this.props.page}
                />
              : undefined
          }
        </div>
        <div className="page__footer">
          <PagePublishDate
            page={this.props.page}
          />
          {!this.props.page.publishedOn ? <div className="page__publish-date-ghost"></div> : undefined}
        </div>
      </div>
    );
  }
}
export default PageItem;
