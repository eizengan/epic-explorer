import React, { Component } from 'react';
import './ExpandableImage.css';

class ExpandableImage extends Component {
  constructor(props) {
    super(props);
    this.state = { expanded: false };
    this.expand = this.expand.bind(this);
    this.shrink = this.shrink.bind(this);
  }

  expand() {
    this.setState({ expanded: true });
  }
  shrink() {
    this.setState({ expanded: false });
  }

  render() {
    const classes = ['expandable-image'];
    if (this.state.expanded) classes.push('expanded');

    const onClick = this.state.expanded ? () => {} : this.expand;

    let lat = this.props.imageData.center.lat;
    lat = `${Math.abs(lat.toFixed(3))}°${lat > 0 ? 'N' : 'S'}`;
    let lon = this.props.imageData.center.lon;
    lon = `${Math.abs(lon.toFixed(3))}°${lon > 0 ? 'W' : 'E'}`;
    const date = this.props.imageData.date.format('M-D-YYYY, h:mm a');

    return (
      <div className={classes.join(' ')} onClick={onClick}>
        {this.state.expanded && (
          <div className="close-button" onClick={this.shrink}>
            <div className="close-button-icon" />
          </div>
        )}
        <img
          src={this.props.imageData.imageURL}
          alt={this.props.imageData.imageName}
        />
        {this.state.expanded && (
          <div className="overlay">
            <div>
              {lat}, {lon}
            </div>
            <div>{date}</div>
          </div>
        )}
      </div>
    );
  }
}

export default ExpandableImage;
