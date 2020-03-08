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
        publishedOn: moment().format("YYYY-MM-DD HH:mm:ss"),
      },
      creating: false, // flag for active http request on api
    };

    this.onCreateClick = this.onCreateClick.bind(this);
    this.onPageChange = this.onPageChange.bind(this);
  }

  componentDidMount() {
    // scroll to top
    document.body.scrollTop = 0; // For Safari
    document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
  }

  onCreateClick() {
    if (this.state.creating) {
      // prevent multiple http requests
      return false;
    }

    this.setState({
      creating: true,
    });
    PageModel.create({
      id: -1,
      title: this.state.page.title,
      description: this.state.page.description,
      type: this.state.page.type,
      isActive: true,
      publishedOn: this.state.page.publishedOn,
    }).then(data => {
      // go back to Dashboard
      window.history.back();
    }).catch(() => {
      this.setState({
        creating: false,
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
            darkMode={this.props.darkMode}
          />
          <button
            className="btn-create"
            type="button"
            onClick={this.onCreateClick}
          >
            {
              this.state.creating
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
