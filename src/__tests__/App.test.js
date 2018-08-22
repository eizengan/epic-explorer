import React from 'react';
import { shallow } from 'enzyme';
import fetch from 'isomorphic-fetch';
import App from '../App';

beforeEach(() => {
  global.fetch = fetch;
});

it('renders without crashing', () => {
  shallow(<App />);
});
