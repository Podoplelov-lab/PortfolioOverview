// src/App.tsx
import React from 'react';
import { Provider } from 'react-redux';
import { store } from './store/store';
import PortfolioOverview from './components/PortfolioOverview/PortfolioOverview.tsx';
import './assets/styles/global.scss';

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <PortfolioOverview />
    </Provider>
  );
};

export default App;