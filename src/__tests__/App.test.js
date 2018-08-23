import React from 'react';
import { shallow, mount } from 'enzyme';
import moment, { min } from 'moment';
import App from '../App';

function createFakeFetch(data) {
  return jest
    .fn()
    .mockImplementation(() => Promise.resolve({ json: () => data }));
}

it('renders without crashing', () => {
  shallow(<App />);
});
it('updates date boundaries when mounted', () => {
  expect.assertions(2);
  const minDateString = '2018-01-01';
  const maxDateString = '2018-12-31';
  global.fetch = createFakeFetch([
    { date: minDateString },
    { date: maxDateString }
  ]);
  const app = shallow(<App />);

  app
    .instance()
    .componentDidMount()
    .then(() => {
      const minMoment = app.state('minMoment');
      const maxMoment = app.state('maxMoment');

      expect(minMoment.isSame(minDateString)).toEqual(true);
      expect(maxMoment.isSame(maxDateString)).toEqual(true);
    });
});
it('updates image data when date changes', () => {
  global.fetch = createFakeFetch([]);
  const app = shallow(<App />)

  app
    .instance()
    .onDateChange('2018-01-01')
    .then(() => {
      const imageData = app.state('imageData');
      expect(imageData).toBeInstanceOf(Array);
      expect(imageData.length).toEqual(0);
    });
});
it('displays message when no images exist for selected date', () => {
  const app = shallow(<App />);
  app.setState({ imageData: [] });
  expect(app.find('.no-images').length).toEqual(1);
});
it('displays message when no date selected', () => {
  const app = shallow(<App />);
  app.setState({ selectedMoment: undefined });
  expect(app.find('.no-date').length).toEqual(1);
});
