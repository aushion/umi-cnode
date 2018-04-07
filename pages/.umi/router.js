import React from 'react';
import { Router as DefaultRouter, Route, Switch } from 'react-router-dom';
import dynamic from 'umi/dynamic';
import renderRoutes from 'umi/_renderRoutes';
require('H:/hackernews/global.css');


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
        "path": "/",
        "exact": true,
        "component": require('../index.js').default
      },
      {
        "path": "/list",
        "exact": true,
        "component": () => React.createElement(require('C:/Users/chena/AppData/Roaming/npm/node_modules/umi/node_modules/umi-build-dev/lib/Compiling.js').default, { route: '/list' })
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
