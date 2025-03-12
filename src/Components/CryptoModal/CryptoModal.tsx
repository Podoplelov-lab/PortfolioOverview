// src/components/CryptoModal/CryptoModal.tsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styles from './CryptoModal.module.scss';

interface Crypto {
    id: string;
    name: string;
    symbol: string;
    current_price: number;
}

interface CryptoModalProps {
    onSelect: (crypto: Crypto) => void;
    onClose: () => void;
}

const CryptoModal: React.FC<CryptoModalProps> = ({ onSelect, onClose }) => {
    const [cryptos, setCryptos] = useState<Crypto[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchCryptos = async () => {
            try {
                const response = await axios.get(
                    'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false'
                );
                setCryptos(response.data);
            } catch (error) {
                console.error('Error fetching cryptos:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchCryptos();
    }, []);

    if (loading) {
        return (
            <div className={styles.modalOverlay}>
                <div className={styles.modalContent}>
                    <h2>Loading...</h2>
                </div>
            </div>
        );
    }

    return (
        <div className={styles.modalOverlay}>
            <div className={styles.modalContent}>
                <div className={styles.flex}>
                    <h2>Select a Cryptocurrency</h2>
                    <button className={styles.closeButton} onClick={onClose}>
                        &times;
                    </button>
                </div>
                <ul className={styles.cryptoList}>
                    {cryptos.map((crypto) => (
                        <li
                            key={crypto.id}
                            onClick={() => onSelect(crypto)}
                            className={styles.cryptoItem}
                        >
                            <span>{crypto.name} ({crypto.symbol.toUpperCase()})</span>
                            <span>${crypto.current_price.toFixed(2)}</span>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default CryptoModal;