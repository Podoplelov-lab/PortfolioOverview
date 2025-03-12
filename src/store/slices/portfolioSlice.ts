import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Asset } from '../../types/asset';
import { saveAssetsToLocalStorage, loadAssetsFromLocalStorage } from '../../utils/localStorage';

interface PortfolioState {
  assets: Asset[];
}

const initialState: PortfolioState = {
  assets: loadAssetsFromLocalStorage(),
};

const portfolioSlice = createSlice({
  name: 'portfolio',
  initialState,
  reducers: {
    addAsset: (state, action: PayloadAction<Omit<Asset, 'id' | 'share'>>) => {
      const newAsset = { ...action.payload, id: Date.now().toString(), share: 0 };
      state.assets.push(newAsset);
      updateShares(state);
      saveAssetsToLocalStorage(state.assets);
    },
    removeAsset: (state, action: PayloadAction<string>) => {
      state.assets = state.assets.filter((asset) => asset.id !== action.payload);
      updateShares(state);
      saveAssetsToLocalStorage(state.assets);
    },
    updateAssetPrice: (state, action: PayloadAction<{ id: string; price: number }>) => {
      const asset = state.assets.find((asset) => asset.id === action.payload.id);
      if (asset) {
        asset.price = action.payload.price;
        updateShares(state);
        saveAssetsToLocalStorage(state.assets);
      }
    },
  },
});

// Функция для обновления долей активов
const updateShares = (state: PortfolioState) => {
  const totalValue = state.assets.reduce((sum, asset) => sum + asset.quantity * asset.price, 0);
  state.assets.forEach((asset) => {
    asset.share = totalValue > 0 ? (asset.quantity * asset.price * 100) / totalValue : 0;
  });
};

export const { addAsset, removeAsset, updateAssetPrice } = portfolioSlice.actions;
export default portfolioSlice.reducer;