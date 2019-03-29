import React from 'react';
import ReactDOM from 'react-dom';
import GameModeSelection from "./gameModeSelection";

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<GameModeSelection />, div);
  ReactDOM.unmountComponentAtNode(div);
});
