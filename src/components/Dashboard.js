import React from 'react';
import './Dashboard.css';
import PageModel from '../Page.js';

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
      // sort pages by desc id
      data.sort((a, b) => {
        if (a.id > b.id) {
          return -1;
        } else {
          return 1;
        }
      });
      // update state
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
        <div className="page-list">
          {this.state.view.pages.map(page => (
            <div 
              className="page item"
              key={page.id}
            >
              <div className="page__title">
                {page.title}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }
}
export default Dashboard;
