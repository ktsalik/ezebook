import React from 'react';
import {
  Link,
} from "react-router-dom";
import moment from 'moment';
import './CreatePage.css';
import PageModel from '../../Page';
import Page from '../Page/Page';

class CreatePage extends React.Component {
  constructor() {
    super();

    this.state = {
      page: {
        title: '',
        description: '',
        type: 0,
        publishedOn: moment().add(1, 'month').format("YYYY-MM-DD HH:mm:ss"),
      },
      view: {
        creating: false,
      },
    };

    this.onCreateClick = this.onCreateClick.bind(this);
    this.onPageChange = this.onPageChange.bind(this);
  }

  onCreateClick() {
    if (this.state.view.creating) {
      return false;
    }

    this.setState({
      view: {
        ...this.state.view,
        creating: true,
      },
    });
    PageModel.create({
      "id": 1,
      "title": this.state.page.title,
      "description": this.state.page.description,
      "type": this.state.page.type,
      "isActive": true,
      "publishedOn": this.state.page.publishedOn,
    }).then(data => {
      window.history.back();
    }).catch(() => {
      this.setState({
        view: {
          ...this.state.view,
          creating: false,
        },
      });
    });
  }

  onPageChange(page) {
    this.setState({
      page: {
        ...page,
      },
    });
  }

  render() {
    return (
      <div className={`create-page-view ${this.props.darkMode === 'on' ? 'dark' : 'light'}`}>
        <div className="new-page-container">
          <Link
            to="/"
            className="btn-back"
          >
            <i className="material-icons">arrow_back</i>
          </Link>
          <Page
            page={this.state.page}
            onChange={this.onPageChange}
          />
          <button
            className="btn-create"
            type="button"
            onClick={this.onCreateClick}
          >
            {
              this.state.view.creating
                ? 'Creating'
                : 'Create'
            }
          </button>
        </div>
      </div>
    );
  }
}
export default CreatePage;
