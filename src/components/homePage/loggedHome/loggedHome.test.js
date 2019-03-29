import React from 'react';
import ReactDOM from 'react-dom';
import LoggedHome from './loggedHome';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<LoggedHome />, div);
  ReactDOM.unmountComponentAtNode(div);
});
