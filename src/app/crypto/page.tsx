// app/crypto/page.tsx
"use client";

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import CryptoCard from '../../components/CryptoCard';
import { Circles } from 'react-loader-spinner';

const CryptoPage = () => {
  const [cryptos, setCryptos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCryptos = async () => {
      try {
        const response = await axios.get('https://api.coingecko.com/api/v3/coins/markets', {
          params: {
            vs_currency: 'usd',
            ids: 'bitcoin,ethereum,tether,binancecoin,solana,staked-ether,usd-coin,ripple,toncoin,dogecoin,cardano,tron,avalanche-2,shiba-inu,wrapped-bitcoin,chainlink,polkadot,bitcoin-cash,uniswap,near,litecoin,leo-token,matic-network,dai,weth,pepe,kaspa,internet-computer,usd-ether,renzo-restaked-eth,ethereum-classic,fetch-ai,aptos,monero,render-token,hedera-hashgraph,stellar,cosmos,okb,mantle,arbitrum,filecoin,blockstack,immutable-x,crypto-com-chain,maker,dogwhifhat,injective-protocol,vechain,sui,first-digital-usd,the-graph,optimism,rocket-pool-eth,bittensor,arweave,lido-dao,bonk,floki-inu,ondo,bitget-token,mantle-staked-eth,fantom,brett,theta,aave,notcoin,thorchain,whitebit,jasmycoin,ether-fi-staked-eth,algorand,eos,core,pyth,quant-network,jupiter,celestia,kelp-dao-restaked-eth,sei,gate,flare-networks,ethereum-name-service,gala,kucoin-shares,zebec-protocol,beam,flow,akash-network,bitcoin-sv,axie-infinity,elrond-erd-2,ethena,tokenize-xchange,bittorrent,starknet,neo,marinade-staked-sol,ordinals',
            price_change_percentage: '1h,24h,7d',
            interval: '1m'
          }
        });
        console.log(response.data); // Verifica los datos devueltos por la API
        setCryptos(response.data);
        setLoading(false);
      } catch (err) {
        setError(err);
        setLoading(false);
      }
    };
    fetchCryptos();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gradient-to-b from-black to-purple-900">
        <Circles height="80" width="80" color="#4fa94d" ariaLabel="loading" />
      </div>
    );
  }

  if (error) {
    return <p className="text-center mt-4">Error: {error.message}</p>;
  }

  return (
    <div className="min-h-screen bg-black text-white p-8">
      <h1 className="text-3xl font-bold text-center mb-6">Crypto Data</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {cryptos.map((crypto) => (
          <CryptoCard key={crypto.id} crypto={crypto} />
        ))}
      </div>
    </div>
  );
};

export default CryptoPage;
