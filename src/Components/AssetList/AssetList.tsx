// src/components/AssetList/AssetList.tsx
import React from 'react';
import { FixedSizeList as List } from 'react-window';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../store/store';
import { removeAsset } from '../../store/slices/portfolioSlice';
import styles from './AssetList.module.scss';

const AssetList: React.FC = () => {
  const assets = useSelector((state: RootState) => state.portfolio.assets);
  const dispatch = useDispatch();

  const Row = ({ index, style }: { index: number; style: React.CSSProperties }) => {
    const asset = assets[index];
    return (
      <div
        style={style}
        className={styles.assetRow}
        onClick={() => dispatch(removeAsset(asset.id))}
      >
        <span>{asset.name}</span>
        <span>{asset.quantity}</span>
        <span>${asset.price.toFixed(2)}</span>
        <span>${(asset.quantity * asset.price).toFixed(2)}</span>
        <span>{asset.change24h}%</span>
        <span>{asset.share}%</span>
      </div>
    );
  };

  return (
    <List
      height={400}
      itemCount={assets.length}
      itemSize={50}
      width="100%"
    >
      {Row}
    </List>
  );
};

export default AssetList;