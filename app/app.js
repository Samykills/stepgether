import React from 'react';
import {Provider} from 'mobx-react';
import Store from './stores/';
import AppRouter from './router/router';

const App = () => (
  <Provider {...Store}>
    <AppRouter />
  </Provider>
);

export default App;
