import React from 'react';
import ReactDOM from 'react-dom';
import IntroSection from "./introSection";

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<IntroSection />, div);
  ReactDOM.unmountComponentAtNode(div);
});
