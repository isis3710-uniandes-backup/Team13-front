import React from 'react';
import ReactDOM from 'react-dom';
import NavBarComponent from "./navBarComponent";

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<NavBarComponent />, div);
  ReactDOM.unmountComponentAtNode(div);
});
