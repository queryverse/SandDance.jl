import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import * as serviceWorker from './serviceWorker';

import * as deck from '@deck.gl/core';
import * as layers from '@deck.gl/layers';
import * as luma from 'luma.gl';
import * as fabric from 'office-ui-fabric-react';
import * as vega from 'vega';
import { Explorer, use } from '@msrvida/sanddance-explorer';
import "@msrvida/sanddance-explorer/dist/css/sanddance-explorer.css"

fabric.initializeIcons();

use(fabric as any, vega, deck, layers, luma);

export function startApp(data) {

  const explorerProps = {
    logoClickUrl: '/',
    mounted: (explorer:any) => {
        explorer.load(data);
    }
  }

    ReactDOM.render(React.createElement(Explorer, explorerProps), document.getElementById('root'));

    serviceWorker.unregister();
};

global['startApp'] = startApp;


// const data = [
//   { a: 1, b: "c1" },
//   { a: 1, b: "c2" },
//   { a: 2, b: "c3" },
//   { a: 3, b: "c4" }
// ];




// ReactDOM.render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>,
//   document.getElementById('root')
// );

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA

