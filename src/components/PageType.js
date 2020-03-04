import React from 'react';

class PageType extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const getIcon = function(type) {
      var icon;
      switch (type) {
        case 0:
          icon = <i className="material-icons">menu_open</i>;
          break;
        case 1:
          icon = <i className="material-icons">error_outline</i>;
          break;
        case 2:
          icon = <i className="material-icons">dashboard</i>;
          break;
        default:
          icon = <i className="material-icons">help</i>;
      }
      return icon;
    };

    return (
      <div
        className="page-type"
      >
        {getIcon(this.props.page.type)}
      </div>
    );
  }
}
export default PageType;
