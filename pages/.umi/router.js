import React from 'react';
import { Router as DefaultRouter, Route, Switch } from 'react-router-dom';
import dynamic from 'umi/dynamic';
import renderRoutes from 'umi/_renderRoutes';
require('C:/Users/chena/Desktop/umi-cnode/global.css');


let Router = DefaultRouter;


const routes = [
  {
    "component": require('../../layouts/index.js').default,
    "routes": [
      {
        "path": "/index.html",
        "exact": true,
        "component": () => React.createElement(require('C:/Users/chena/AppData/Roaming/npm/node_modules/umi/node_modules/umi-build-dev/lib/Compiling.js').default, { route: '/index.html' })
      },
      {
        "path": "/detail",
        "exact": true,
        "component": require('../detail.js').default
      },
      {
        "path": "/home",
        "exact": true,
        "component": () => React.createElement(require('C:/Users/chena/AppData/Roaming/npm/node_modules/umi/node_modules/umi-build-dev/lib/Compiling.js').default, { route: '/home' })
      },
      {
        "path": "/",
        "exact": true,
        "component": require('../index.js').default
      }
    ]
  }
];

export default function() {
  return (
<Router history={window.g_history}>
  { renderRoutes(routes) }
</Router>
  );
}
