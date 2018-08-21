const EPICAPI = {
  apiEndpoint: 'https://api.nasa.gov/EPIC/api/enhanced',
  archiveEndpoint: 'https://api.nasa.gov/EPIC/archive/enhanced',
  apiKey: 'DEMO_KEY',

  fetchImageDateStrings: function() {
    const url = `${this.apiEndpoint}/all?api_key=${this.apiKey}`;
    return fetch(url).then(res => res.json());
  },
  fetchImageDataByDateString: function(dateString) {
    const url = `${this.apiEndpoint}/date/${dateString}?api_key=${this.apiKey}`;
    return fetch(url).then(res => res.json());
  },
  createImageURL: function(imageName) {
    const datePart = imageName.split('_')[2];
    const datePath = `${datePart.slice(0, 4)}/${datePart.slice(4, 6)}/${datePart.slice(6, 8)}`;
    const url = `${this.archiveEndpoint}/${datePath}/jpg/${imageName}.jpg?api_key=${
      this.apiKey
    }`;
    return encodeURI(url);
  }
};

export default EPICAPI;
