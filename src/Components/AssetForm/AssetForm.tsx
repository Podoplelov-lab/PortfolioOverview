import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addAsset } from '../../store/slices/portfolioSlice';
import CryptoModal from '../CryptoModal/CryptoModal';
import styles from './AssetForm.module.scss';

const AssetForm: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const dispatch = useDispatch();

// src/components/AssetForm/AssetForm.tsx
const handleAddAsset = (crypto: { id: string; name: string; current_price: number }) => {
  dispatch(
    addAsset({
      id: crypto.id,
      name: crypto.name,
      quantity: 1,
      price: crypto.current_price,
      change24h: 0,
      share: 0,
    })
  );
  setIsModalOpen(false);
};

  return (
    <div className={styles.assetForm}>
      <button onClick={() => setIsModalOpen(true)}>Add Asset</button>

      {isModalOpen && (
        <CryptoModal
          onSelect={handleAddAsset}
          onClose={() => setIsModalOpen(false)}
        />
      )}
    </div>
  );
};

export default AssetForm;