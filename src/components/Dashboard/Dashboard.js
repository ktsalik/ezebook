import React from 'react';
import {
  Link,
} from "react-router-dom";
import moment from 'moment';
import './Dashboard.css';
import PageModel from '../../Page';
import DarkModeToggle from '../DarkModeToggle/DarkModeToggle';
import PageItem from '../PageItem/PageItem';
import SearchBar from '../SearchBar/SearchBar';

class Dashboard extends React.Component {
  constructor() {
    super();

    this.state = {
      pages: [],
      view: {
        // 20 empty object with an id
        pages: new Array(20).fill().map((_, i) => ({ id: i })),
      },
      iconsLoaded: false,
    };

    let checkTextFontsInterval;
    window.addEventListener('load', () => {
      checkTextFontsInterval = setInterval(() => {
        // check if font-family "Varela Round" has loaded and only then get pages data
        if (this.state.pages.length === 0 && document.fonts.check('1px "Varela Round"')) {
          clearTimeout(checkTextFontsInterval); // stop checking
          this.getPages(); // get pages data
        }
      }, 100);
    });
    if (document.readyState == 'complete') {
      this.getPages();
    }

    let checkIconsFontsInterval = setInterval(() => {
      this.setState({
        iconsLoaded: document.fonts.check('1px "Material Icons"'),
      });
      if (this.state.iconsLoaded) {
        clearInterval(checkIconsFontsInterval);
      }
    });

    this.onDarkModeChange = this.onDarkModeChange.bind(this);
    this.onSearchTermChange = this.onSearchTermChange.bind(this);
    this.getPages = this.getPages.bind(this);
  }

  getPages() {
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
      // update component state with pages data
      this.setState({
        pages: data,
        view: {
          ...this.state.view,
          pages: data,
        }
      });
    });
  }

  onDarkModeChange(state) {
    this.props.onDarkModeChange(state);
  }

  onSearchTermChange(value) {
    if (value.trim().length > 0) {
      // filter list with search term
      this.setState({
        view: {
          ...this.state.view,
          pages: this.state.pages.filter(page => page.title.includes(value)),
        },
      });
    } else {
      // show again all pages
      this.setState({
        view: {
          ...this.state.view,
          pages: this.state.pages,
        }
      });
    }
  }

  render() {
    return (
      <div className={`dashboard-view ${this.props.darkMode === 'on' ? 'dark' : 'light'}`}>
        <div className="toolbar">
          <Link to="/create-page" className="btn-create-page">
            <div className="btn-create-page__title">Create Page</div>
            {
              this.state.iconsLoaded
                ? <i className="material-icons">add</i>
                : undefined
            }
          </Link>
          <div className="search-bar-container">
            <SearchBar 
              onChange={this.onSearchTermChange}
              darkMode={this.props.darkMode}
            />
          </div>
          <div className="dark-mode-container">
            <DarkModeToggle
              darkMode={this.props.darkMode}
              onChange={this.onDarkModeChange}
            />
          </div>
        </div>
        <div className="pages-list">
          {this.state.view.pages.map(page => (
            <PageItem
              key={page.id}
              page={page}
              darkMode={this.props.darkMode}
              showTypeIcon={this.state.iconsLoaded}
            />
          ))}
        </div>
      </div>
    );
  }
}
export default Dashboard;
