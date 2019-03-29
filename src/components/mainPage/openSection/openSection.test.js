import React from 'react';
import ReactDOM from 'react-dom';
import OpenSection from "./openSection";

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<OpenSection/>, div);
  ReactDOM.unmountComponentAtNode(div);
});
