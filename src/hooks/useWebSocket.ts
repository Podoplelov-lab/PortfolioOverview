// src/hooks/useWebSocket.ts
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { updateAssetPrice } from '../store/slices/portfolioSlice';

const useWebSocket = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    // Подключаемся к WebSocket Binance
    const socket = new WebSocket('wss://stream.binance.com:9443/ws');

    // Подписываемся на поток цен для BTC, ETH и других криптовалют
    const subscribeMessage = JSON.stringify({
      method: 'SUBSCRIBE',
      params: ['btcusdt@ticker', 'ethusdt@ticker', 'bnbusdt@ticker', 'solusdt@ticker'],
      id: 1,
    });

    socket.onopen = () => {
      socket.send(subscribeMessage);
    };

    socket.onmessage = (event) => {
      const data = JSON.parse(event.data);

      if (data.stream) {
        const symbol = data.data.s; // Например, "BTCUSDT"
        const price = parseFloat(data.data.c); // Текущая цена
        const assetId = symbol.toLowerCase().replace('usdt', ''); // Преобразуем в "btc", "eth" и т.д.

        // Обновляем цену актива в портфеле
        dispatch(updateAssetPrice({ id: assetId, price }));
      }
    };

    return () => {
      socket.close();
    };
  }, [dispatch]);
};

export default useWebSocket;