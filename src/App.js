import React, { Component } from 'react';
import EPICAPI from './EPICAPI';
import moment from 'moment';
import Calendar from 'react-calendar';
import './DatePickerStyle.css';
import ExpandableImage from './ExpandableImage';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedMoment: undefined,
      minMoment: undefined,
      maxMoment: undefined,
      imageData: []
    };
    this.onDateChange = this.onDateChange.bind(this);
  }

  componentDidMount() {
    EPICAPI.fetchImageDateStrings().then(dates => {
      const sortedDates = dates.map(d => d.date).sort();
      const minMoment = moment(sortedDates[0]);
      const maxMoment = moment(sortedDates[sortedDates.length - 1]);

      this.setState({
        minMoment: minMoment,
        maxMoment: maxMoment
      });
      this.onDateChange(maxMoment);
    });
  }

  onDateChange(date) {
    const selectedMoment = moment(date);
    this.setState({ selectedMoment: selectedMoment });
    EPICAPI.fetchImageDataByDateString(selectedMoment.format('YYYY-MM-DD'))
      .then(this.translateAPIImageData)
      .then(imageData => {
        this.setState({ imageData: imageData });
      });
  }

  translateAPIImageData(imageData) {
    return imageData.map(d => {
      const id = d.identifier;
      const imageName = d.image;
      const imageURL = EPICAPI.createImageURL(d.image);
      const center = d.centroid_coordinates;
      const date = moment(d.date);

      return {
        id: id,
        imageName: imageName,
        imageURL: imageURL,
        center: center,
        date: date
      };
    });
  }

  render() {
    const images = imageData.map(d => (
      <ExpandableImage key={d.id} imageData={d} />
    ));

    const minDate = this.state.minMoment && this.state.minMoment.toDate();
    const maxDate = this.state.maxMoment && this.state.maxMoment.toDate();

    let selectedDate;
    if (this.state.selectedMoment && this.state.selectedMoment.isValid())
      selectedDate = this.state.selectedMoment.toDate();

    return (
      <div className="app">
        <div className="calendar-container">
          <Calendar
            minDetail="decade"
            minDate={minDate}
            maxDate={maxDate}
            value={selectedDate}
            onChange={this.onDateChange}
          />
        </div>
        <div className="images-container">{images}</div>
      </div>
    );
  }
}

export default App;
