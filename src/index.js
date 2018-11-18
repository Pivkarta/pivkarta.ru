

import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import PrismaCms from "@prisma-cms/front";

import registerServiceWorker from './registerServiceWorker';

import App from "./App";

import {
  UserNoNestingFragment,
} from "./schema/generated/api.fragments";

ReactDOM.render(<PrismaCms
  // lang="en"
  App={App}
  apolloOptions={{
    apiQuery: `{
      user:me{
        ...UserNoNesting
      } 
    }
    ${UserNoNestingFragment}
    `,
  }}
/>, document.getElementById('root'));
registerServiceWorker();

