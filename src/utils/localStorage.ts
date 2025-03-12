// src/utils/localStorage.ts
import { Asset } from '../types/asset';

const LOCAL_STORAGE_KEY = 'portfolioAssets';

export const saveAssetsToLocalStorage = (assets: Asset[]) => {
  localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(assets));
};

export const loadAssetsFromLocalStorage = (): Asset[] => {
  const assets = localStorage.getItem(LOCAL_STORAGE_KEY);
  return assets ? JSON.parse(assets) : [];
};