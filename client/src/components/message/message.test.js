import React from 'react';
import { shallow } from 'enzyme';
import Message from './message';

describe('<Message />', () => {
  test('renders', () => {
    const wrapper = shallow(<Message />);
    expect(wrapper).toMatchSnapshot();
  });
});
