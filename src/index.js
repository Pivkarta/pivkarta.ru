

import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import PrismaCms from "@prisma-cms/front";

import registerServiceWorker from './registerServiceWorker';

import App from "./App";

import {
  UserNoNestingFragment,
} from "./schema/generated/api.fragments";

import * as queryFragments from "./schema/generated/api.fragments";

ReactDOM.render(<PrismaCms
  // lang="en"
  App={App}
  // themeOptions={{
  //   direction: 'ltr',
  //   paletteType: 'light',
  //   paletteType: 'dark',
  // }}
  apolloOptions={{
    apiQuery: `{
      user:me{
        ...UserNoNesting
      } 
    }
    ${UserNoNestingFragment}
    `,
  }}
  queryFragments={queryFragments}
/>, document.getElementById('root'));
registerServiceWorker();

