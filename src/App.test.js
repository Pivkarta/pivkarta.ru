import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import PrismaCms from "@prisma-cms/front";

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<PrismaCms
    App={App}
  />, div);
  ReactDOM.unmountComponentAtNode(div);
});


// describe('Fake test', () => {
//   it('displays a welcome message', () => {
//     expect("message").toContain('message')
//   })
// })