import React, { Component } from 'react';
import EPICAPI from './EPICAPI';
import moment from 'moment';
import DatePicker from 'react-date-picker';
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
      .then(this.translateImageData)
      .then(imageData => {
        this.setState({ imageData: imageData });
      });
  }

  translateImageData(imageData) {
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
    return (
      <div className="app">
        <DatePicker
          minDetail="decade"
          minDate={this.state.minMoment && this.state.minMoment.toDate()}
          maxDate={this.state.maxMoment && this.state.maxMoment.toDate()}
          value={
            this.state.selectedMoment && this.state.selectedMoment.toDate()
          }
          onChange={this.onDateChange}
        />
      </div>
    );
  }
}

export default App;
