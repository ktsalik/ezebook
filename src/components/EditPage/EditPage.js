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
    
    // will be used to add a delay between real-time updates and Api calls
    this.updateTimeout = undefined;

    this.onPageChange = this.onPageChange.bind(this);
    this.deletePage = this.deletePage.bind(this);
  }

  componentDidMount() {
    // get page details
    PageModel.getPage(window.location.href.split('/').slice(-1)[0]).then(page => {
      this.setState({
        page: page,
      }, () => {
        // store locally in order to highlight the page item on Dashboard later
        localStorage.lastSeenPage = this.state.page.id;
      });
    });

    document.body.scrollTop = 0; // For Safari
    document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
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
      setTimeout(() => { // add a delay in order to be visible
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
        ...this.state.page, // current page data
        ...page // page data from Page component
      },
    }, () => {
      // Api call to update the page
      clearTimeout(this.updateTimeout);
      this.updateTimeout = setTimeout(() => {
        this.updatePage();
      }, 500);
    });
  }

  deletePage() {
    PageModel.delete(this.state.page.id).then(() => {
      // go back to Dashboard
      window.history.back();
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
            {
              this.state.page.id > -1
                ? <div>Page&nbsp;{this.state.page.id}</div>
                : <div>Fetching Page</div>
            }
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
                  darkMode={this.props.darkMode}
                />
              : (
                <div className="ghost-page">
                  <div className="ghost-page__title"></div>
                  <div className="ghost-page__description"></div>
                </div>
              )
          }
          <button
            className="btn-delete"
            onClick={this.deletePage}
          >Delete</button>
        </div>
      </div>
    );
  }
}
export default EditPage;
