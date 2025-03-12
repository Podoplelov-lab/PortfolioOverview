import React from 'react';
import useWebSocket from '../../hooks/useWebSocket';
import AssetList from '../AssetList/AssetList';
import AssetForm from '../AssetForm/AssetForm';
import styles from './PortfolioOverview.module.scss';

const PortfolioOverview: React.FC = () => {
  useWebSocket(); 

  return (
    <div className={styles.portfolioOverview}>
      <h1>Portfolio Overview</h1>
      <AssetForm />
      <AssetList />
    </div>
  );
};

export default PortfolioOverview;