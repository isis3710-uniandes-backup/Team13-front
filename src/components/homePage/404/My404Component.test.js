import React from 'react';
import ReactDOM from 'react-dom';
import My404Component from "./My404Component";

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<My404Component />, div);
  ReactDOM.unmountComponentAtNode(div);
});
