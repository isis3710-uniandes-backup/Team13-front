import React from 'react';
import ReactDOM from 'react-dom';
import SignupComponent from "./signupComponent";

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<SignupComponent />, div);
  ReactDOM.unmountComponentAtNode(div);
});
