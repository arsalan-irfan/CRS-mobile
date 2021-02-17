// In App.js in a new project

import * as React from "react";
import { Provider } from 'react-redux'
import MainLayout from './MainLayout';
import store from './store'

function App() {
  return (
    <Provider store={store}>
      <MainLayout />
    </Provider>
  );
}

export default App;
