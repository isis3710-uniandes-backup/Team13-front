import React from 'react';
import ReactDOM from 'react-dom';
import FooterSection from "./footerSection";

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<FooterSection />, div);
  ReactDOM.unmountComponentAtNode(div);
});
