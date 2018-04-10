import React from 'react';
import { Router as DefaultRouter, Route, Switch } from 'react-router-dom';
import dynamic from 'umi/dynamic';
import renderRoutes from 'umi/_renderRoutes';
require('/Users/aoshengchen/Desktop/umi-cnode/global.css');


let Router = DefaultRouter;


const routes = [
  {
    "component": require('/Users/aoshengchen/Desktop/umi-cnode/layouts/index.js').default,
    "routes": [
      {
        "path": "/index.html",
        "exact": true,
        "component": () => React.createElement(require('/usr/local/lib/node_modules/umi/node_modules/_umi-build-dev@0.14.0@umi-build-dev/lib/Compiling.js').default, { route: '/index.html' })
      },
      {
        "path": "/detail",
        "exact": true,
        "component": require('../detail.js').default
      },
      {
        "path": "/home",
        "exact": true,
        "component": () => React.createElement(require('/usr/local/lib/node_modules/umi/node_modules/_umi-build-dev@0.14.0@umi-build-dev/lib/Compiling.js').default, { route: '/home' })
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
