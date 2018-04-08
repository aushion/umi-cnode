import React from 'react';
import { Router as DefaultRouter, Route, Switch } from 'react-router-dom';
import dynamic from 'umi/dynamic';
import renderRoutes from 'umi/_renderRoutes';
import('/Users/aoshengchen/Desktop/umi-cnode/global.css');


let Router = DefaultRouter;


const routes = [
  {
    "component": require('/Users/aoshengchen/Desktop/umi-cnode/layouts/index.js').default,
    "routes": [
      {
        "path": "/index.html",
        "exact": true,
        "component": () => React.createElement(require('/usr/local/lib/node_modules/umi/node_modules/_umi-build-dev@0.13.3@umi-build-dev/lib/Compiling.js').default, { route: '/index.html' })
      },
      {
        "path": "/",
        "exact": true,
        "component": require('../index.js').default
      },
      {
        "path": "/list",
        "exact": true,
        "component": require('../list.js').default
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
