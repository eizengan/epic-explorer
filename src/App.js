import React, { Component } from 'react';
import EPICAPI from './EPICAPI';
import moment from 'moment';
import Calendar from 'react-calendar';
import ExpandableImage from './ExpandableImage';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedMoment: undefined,
      minMoment: undefined,
      maxMoment: undefined,
      imageData: undefined
    };
    this.onDateChange = this.onDateChange.bind(this);
  }

  componentDidMount() {
    return EPICAPI.fetchImageDateStrings().then(dates => {
      if (!dates || !dates.length) return;

      const sortedDates = dates.map(d => d.date).sort();
      const minMoment = moment(sortedDates[0]);
      const maxMoment = moment(sortedDates[sortedDates.length - 1]);

      this.setState({
        minMoment: minMoment,
        maxMoment: maxMoment
      });
    });
  }

  onDateChange(date) {
    const selectedMoment = moment(date);
    this.setState({ selectedMoment: selectedMoment });
    return EPICAPI.fetchImageDataByDateString(
      selectedMoment.format('YYYY-MM-DD')
    ).then(imageData => this.setState({ imageData: imageData }));
  }

  render() {
    const imageData = this.state.imageData;
    const images = imageData && imageData.map(d => (
      <div key={d.id} className="image">
        <ExpandableImage imageData={d} />
      </div>
    ));

    const minDate = this.state.minMoment && this.state.minMoment.toDate();
    const maxDate = this.state.maxMoment && this.state.maxMoment.toDate();

    let selectedDate;
    if (this.state.selectedMoment && this.state.selectedMoment.isValid())
      selectedDate = this.state.selectedMoment.toDate();

    return (
      <div className="app">
        <div className="about-pane">
          <h1 className="header">EPIC Explorer</h1>
          <p className="subheader">
            Learn more about EPIC&nbsp;
            <a
              href="https://epic.gsfc.nasa.gov/about/epic"
              rel="noopener noreferrer external"
              target="_blank"
            >
              here
            </a>
          </p>
        </div>
        <div className="calendar-container">
          <Calendar
            minDetail="decade"
            minDate={minDate}
            maxDate={maxDate}
            value={selectedDate}
            onChange={this.onDateChange}
          />
        </div>
        <div className="images-container">
          {images}
          {!images && <div className="no-date">Select a Date</div>}
          {images && !images.length && <div className="no-images">No images to show!</div>}
        </div>
      </div>
    );
  }
}

export default App;
