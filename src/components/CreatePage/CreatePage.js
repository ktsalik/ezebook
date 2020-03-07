import React from 'react';
import './CreatePage.css';

class CreatePage extends React.Component {
  constructor() {
    super();

    this.state = {
      
    };
  }

  render() {
    return (
      <div className={`create-page-view ${this.props.darkMode === 'on' ? 'dark' : 'light'}`}>
        new page
      </div>
    );
  }
}
export default CreatePage;
