import React from 'react';
import {
  Link,
} from "react-router-dom";
import moment from 'moment';
import './EditPage.css';
import PageModel from '../../Page';
import Page from '../Page/Page';

class EditPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      page: {
        id: -1,
        title: '',
        description: '',
        type: -1,
        publishedOn: undefined,
      },
    };

    this.updateTimeout = undefined;

    PageModel.getPage(window.location.href.split('/').slice(-1)[0]).then(page => {
      this.setState({
        page: page,
      });
    });

    this.onPageChange = this.onPageChange.bind(this);
  }

  updatePage() {
    PageModel.update(this.state.page.id, {
      id: this.state.page.id,
      title: this.state.page.title,
      description: this.state.page.description,
      type: this.state.page.type,
      isActive: true,
      publishedOn: this.state.page.publishedOn,
    }).then(data => {
      
    }).catch(() => {
      
    });
  }

  onPageChange(page) {
    this.setState({
      page: {
        ...this.state.page,
        ...page
      },
    }, () => {
      clearTimeout(this.updateTimeout);
      this.updateTimeout = setTimeout(() => {
        this.updatePage();
      }, 500);
    });
  }

  render() {
    return (
      <div className={`edit-page-view ${this.props.darkMode === 'on' ? 'dark' : 'light'}`}>
        <div className="edit-page-container">
          <div className="header">
            <Link
              to="/"
              className="btn-back"
            >
              <i className="material-icons">arrow_back</i>
            </Link>
            <div>Page&nbsp;{this.state.page.id}</div>
          </div>
          {
            this.state.page.id > -1
              ? <Page
                  page={this.state.page}
                  onChange={this.onPageChange}
                />
              : ''
          }
        </div>
      </div>
    );
  }
}
export default EditPage;
