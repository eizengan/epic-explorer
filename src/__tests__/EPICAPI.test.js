import EPICAPI from '../EPICAPI';

it('has an api key', () => {
  expect(EPICAPI.apiKey).toBeDefined();
});

it('has an endpoint for api', () => {
  expect(EPICAPI.apiEndpoint).toBeDefined();
});

it('has an endpoint for image archive', () => {
  expect(EPICAPI.archiveEndpoint).toBeDefined();
});

it('handles date fetch failures gracefully', () => {
  expect.assertions(3);
  global.fetch = jest
    .fn()
    .mockImplementation(() => Promise.reject('intentionally broken fetch'));
  EPICAPI.fetchImageDateStrings().then(res => {
    expect(global.fetch).toHaveBeenCalled();
    expect(res).toBeInstanceOf(Array);
    expect(res.length).toEqual(0);
  });
});
it('handles image data fetch failures gracefully', () => {
  expect.assertions(3);
  global.fetch = jest
    .fn()
    .mockImplementation(() => Promise.reject('intentionally broken fetch'));
  EPICAPI.fetchImageDataByDateString('2016-06-01').then(res => {
    expect(global.fetch).toHaveBeenCalled();
    expect(res).toBeInstanceOf(Array);
    expect(res.length).toEqual(0);
  });
});

it('converts image data to a url', () => {
  const image = 'epic_RGB_20160601002713';

  expect(EPICAPI.createImageURL(image)).toBe(
    `https://api.nasa.gov/EPIC/archive/enhanced/2016/06/01/jpg/epic_RGB_20160601002713.jpg?api_key=DEMO_KEY`
  );
});
