

import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import PrismaCms from "@prisma-cms/front";

import * as serviceWorker from './serviceWorker';

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
        EthAccounts {
          id
          address
          balance(convert:ether)
        }
      } 
    }
    ${UserNoNestingFragment}
    `,
  }}
  queryFragments={queryFragments}
/>, document.getElementById('root'));

serviceWorker.unregister();

