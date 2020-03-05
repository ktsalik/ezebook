import React from 'react';
import './PageType.css';

class PageType extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      showTooltip: false,
    };

    this.elRef = React.createRef();
  }

  componentDidMount() {
    let el = this.elRef.current;

    let showTimeout;
    el.onmouseover = () => {
      clearTimeout(showTimeout);
      showTimeout = setTimeout(() => {
        this.setState({
          showTooltip: true,
        });
        let tooltipEl = el.querySelector('.tooltip');
        tooltipEl.style.top = (el.getBoundingClientRect().top) - (tooltipEl.offsetHeight) + 'px';
        tooltipEl.style.left = (el.querySelector('.icon').getBoundingClientRect().left) - ((tooltipEl.offsetWidth - el.querySelector('.icon').offsetWidth) / 2) + 'px';
      }, 500);
    };

    el.onmouseleave = () => {
      clearTimeout(showTimeout);
      this.setState({
        showTooltip: false,
      });
    };
  }

  render() {
    const getIcon = function(type) {
      let icon;
      switch (type) {
        case 0:
          icon = <i className="icon material-icons">menu_open</i>;
          break;
        case 1:
          icon = <i className="icon material-icons">error_outline</i>;
          break;
        case 2:
          icon = <i className="icon material-icons">dashboard</i>;
          break;
        default:
          icon = <i className="icon material-icons">help</i>;
      }
      return icon;
    };

    const getDescription = function(type) {
      let description;
      switch (type) {
        case 0:
          description = `Responsive page that shows the Menu`;
          break;
        case 1:
          description = `Responsive page for the Events`;
          break;
        case 2:
          description = `Responsive page for general content`;
          break;
        default:
          description = `Unknown Page Type`;
          break;
      }
      return description;
    };

    return (
      <div
        className="page-type"
        ref={this.elRef}
      >
        {getIcon(this.props.page.type)}
        <div
          className={`tooltip ${this.state.showTooltip ? 'open' : 'closed'}`}
        >
          {getDescription(this.props.page.type)}
        </div>
      </div>
    );
  }
}
export default PageType;
