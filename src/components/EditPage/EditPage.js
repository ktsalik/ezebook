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
      saving: false,
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
    this.setState({
      saving: true,
    });
    PageModel.update(this.state.page.id, {
      id: this.state.page.id,
      title: this.state.page.title,
      description: this.state.page.description,
      type: this.state.page.type,
      isActive: true,
      publishedOn: this.state.page.publishedOn,
    }).then(data => {
      setTimeout(() => {
        this.setState({
          saving: false,
        });
      }, 1000);
    }).catch(() => {
      this.setState({
        saving: false,
      });
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
            <div>
              {
                this.state.saving
                  ? 'Saving Changes...'
                  : ''
              }
            </div>
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
