

import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import PrismaCms from "@prisma-cms/front";

import registerServiceWorker from './registerServiceWorker';

import App from "./App";

ReactDOM.render(<PrismaCms
  // lang="en"
  App={App}
  // themeOptions={{
  //   direction: 'ltr',
  //   paletteType: 'light',
  //   paletteType: 'dark',
  // }}
/>, document.getElementById('root'));
registerServiceWorker();

