import EPICAPI from './EPICAPI';

it('has default api key', () => {
  expect(EPICAPI.apiKey).toBe('DEMO_KEY');
});

it('has endpoint for api', () => {
  expect(EPICAPI.apiEndpoint).toBe('https://api.nasa.gov/EPIC/api/enhanced');
});

it('has endpoint for image archive', () => {
  expect(EPICAPI.archiveEndpoint).toBe(
    'https://api.nasa.gov/EPIC/archive/enhanced'
  );
});

it('converts image data to a url', () => {
  const image = 'epic_RGB_20160601002713';

  expect(EPICAPI.extractImageURL(image)).toBe(
    `https://api.nasa.gov/EPIC/archive/enhanced/2016/06/01/jpg/epic_RGB_20160601002713.jpg?api_key=DEMO_KEY`
  );
});
