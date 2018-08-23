import moment from 'moment';

const EPICAPI = {
  apiEndpoint: 'https://api.nasa.gov/EPIC/api/enhanced',
  archiveEndpoint: 'https://api.nasa.gov/EPIC/archive/enhanced',
  apiKey: process.env.REACT_APP_API_KEY || 'DEMO_KEY',

  apiFetch: function(url, errorDefault) {
    return global
      .fetch(url)
      .then(res => res.json())
      .then(res => {
        if (res.error) throw Error(`${res.error.code}: ${res.error.message}`);
        return res;
      })
      .catch(err => {
        if (!process.env.REACT_APP_TESTING) console.log(err);
        return errorDefault;
      });
  },
  fetchImageDateStrings: function() {
    const url = `${this.apiEndpoint}/all?api_key=${this.apiKey}`;
    return this.apiFetch(url, []);
  },
  fetchImageDataByDateString: function(dateString) {
    const url = `${this.apiEndpoint}/date/${dateString}?api_key=${this.apiKey}`;
    return this.apiFetch(url, []).then(this.mapAPIImageData);
  },
  mapAPIImageData(imageData) {
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
  },

  createImageURL: function(imageName) {
    const datePart = imageName.split('_')[2];
    const datePath =
      `${datePart.slice(0, 4)}/` +
      `${datePart.slice(4, 6)}/` +
      `${datePart.slice(6, 8)}`;
    const url = `${
      this.archiveEndpoint
    }/${datePath}/jpg/${imageName}.jpg?api_key=${this.apiKey}`;
    return encodeURI(url);
  }
};

export default EPICAPI;
