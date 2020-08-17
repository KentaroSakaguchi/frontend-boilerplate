import React from 'react';

import { Counter } from './Counter.jsx';

export default {
  title: ' jsx/Counter Button',
  component: Counter,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
};

const Template = () => <Counter />;

export const Counter2 = Template.bind({});
Counter2.args = {
  label: 'Button',
};
