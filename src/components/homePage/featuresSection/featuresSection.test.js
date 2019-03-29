import React from 'react';
import ReactDOM from 'react-dom';
import FeaturesSection from "./featuresSection";

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<FeaturesSection />, div);
  ReactDOM.unmountComponentAtNode(div);
});
