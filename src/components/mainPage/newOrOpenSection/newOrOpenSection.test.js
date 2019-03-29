import React from 'react';
import ReactDOM from 'react-dom';
import NewOrOpenSection from "./newOrOpenSection";

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<NewOrOpenSection/>, div);
  ReactDOM.unmountComponentAtNode(div);
});
