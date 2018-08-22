import React from 'react';
import { shallow } from 'enzyme';
import moment from 'moment';
import ExpandableImage from '../ExpandableImage';

function createTestData() {
  return {
    id: '20180820001751',
    imageName: 'epic_RGB_20180820001751',
    imageURL:
      'https://api.nasa.gov/EPIC/archive/enhanced/2018/08/20/jpg/epic_RGB_20180820001751.jpg?api_key=DEMO_KEY',
    center: {
      lat: 10.2938,
      lon: 166.542014
    },
    date: moment('2018-08-20 00:13:03')
  };
}

it('renders without crashing', () => {
  shallow(<ExpandableImage imageData={createTestData()} />);
});
it('set to expanded state on click', () => {
  const image = shallow(<ExpandableImage imageData={createTestData()} />);
  image.simulate('click');
  expect(image.state('expanded')).toEqual(true);
});
it('displays close button if in expanded state', () => {
  const image = shallow(<ExpandableImage imageData={createTestData()} />);
  image.setState({ expanded: true });
  expect(image.find('.close-button').length).toEqual(1);
});
it('displays info overlay if in expanded state', () => {
  const image = shallow(<ExpandableImage imageData={createTestData()} />);
  image.setState({ expanded: true });
  expect(image.find('.overlay').length).toEqual(1);
});
it('set to unexpanded state on close button click', () => {
  const image = shallow(<ExpandableImage imageData={createTestData()} />);
  image.setState({ expanded: true });
  image.find('.close-button').simulate('click');
  expect(image.state('expanded')).toEqual(false);
});
