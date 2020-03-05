import React from 'react';
import moment from 'moment';
import './Dashboard.css';
import PageModel from '../../Page';
import PagePublishDate from '../PagePublishDate/PagePublishDate';
import PageType from '../PageType/PageType';

class Dashboard extends React.Component {
  constructor() {
    super();

    this.state = {
      pages: [],
      view: {
        pages: [],
      },
    };

    PageModel.getPages().then(data => {
      // sort pages data by desc id
      data.sort((a, b) => {
        if (a.id > b.id) {
          return -1;
        } else {
          return 1;
        }
      });
      // process pages data
      data.forEach(page => {
        page.publishedOnDate = moment(page.publishedOn).format('DD-MM-YYYY HH:mm');
        page.publishedOnAgo = moment(page.publishedOn).fromNow();
      });
      // update state with pages data
      this.setState({
        pages: data,
        view: {
          ...this.state.view,
          pages: data,
        }
      });
    });
  }

  render() {
    return (
      <div className="dashboard">
        <div className="pages-list">
          {this.state.view.pages.map(page => (
            <div 
              className="page item"
              key={page.id}
            >
              <div className="page__title">
                {page.title}
              </div>
              <div className="page__type">
                <PageType
                  page={page}
                />
              </div>
              <div className="page__footer">
                <PagePublishDate
                  page={page}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }
}
export default Dashboard;
