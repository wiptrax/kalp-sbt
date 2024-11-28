"use client"
import { useState } from 'react';

export const useSBTApi = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const apiKey = process.env.NEXT_PUBLIC_API_KEY;
  const FIXED_WALLET = "ded665bca7d412891f44a571d908b66184b0ee10";

  const callApi = async (endpoint: string, args : { [key: string]: any }) => {
    setError(null);
    const params = {
      network: 'TESTNET',
      blockchain: 'KALP',
      walletAddress: FIXED_WALLET,
      args: args,
    };

    try {
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': apiKey!,
          'Accept': 'application/json'
        },
        body: JSON.stringify(params),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || `HTTP error! status: ${response.status}`);
      }
      setLoading(false);
      return data;
    } catch (err : any) {
      console.log(err)
      setError(err);
      setLoading(false);
      throw err;
    }
  };

  const mintSBT = async (address: string) => {
    setLoading(true);
    const endpoint =
      'https://gateway-api.kalp.studio/v1/contract/kalp/invoke/Fendsz9A6Jlo5iuulGq16n3IQshulw7L1732704125253/MintSBT';
    const args = {
      "address": address,
    };
    return callApi(endpoint, args);
  };

  const querySBT = async (owner: string, tokenId: string) => {
    setLoading(true);
    const endpoint =
      'https://gateway-api.kalp.studio/v1/contract/kalp/query/Fendsz9A6Jlo5iuulGq16n3IQshulw7L1732704125253/QuerySBT';
    const args = {
      owner: owner,
      tokenID: tokenId,
    };
    return callApi(endpoint, args);
  };

  const getSBTByOwner = async (owner: string) => {
    setLoading(true);
    const endpoint =
      'https://gateway-api.kalp.studio/v1/contract/kalp/query/Fendsz9A6Jlo5iuulGq16n3IQshulw7L1732704125253/GetSBTByOwner';
    const args = {
      owner: owner,
    };
    return callApi(endpoint, args);
  };

  const attemptTransfer = async (from: string, to: string, tokenId: string) => {
    const endpoint = 'https://gateway-api.kalp.studio/v1/contract/kalp/query/KaiWcmxQ9GxzHIdlmWAbQQpcnX59TSqV1732700814244/TransferSBT';
    const args = {
      from: from,
      to: to,
      tokenID: tokenId,
    };
    return callApi(endpoint, args);
  };

  const getAllTokenIDs = async () => {
    const endpoint =
      'https://gateway-api.kalp.studio/v1/contract/kalp/query/Fendsz9A6Jlo5iuulGq16n3IQshulw7L1732704125253/GetAllTokenIDs';
    const args = {};
    return callApi(endpoint, args);
  };

  return { mintSBT, querySBT, getSBTByOwner, attemptTransfer, getAllTokenIDs, loading, error };
};


