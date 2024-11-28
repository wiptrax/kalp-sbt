"use client"

import React, { useState } from 'react';
import { AlertCircle, CheckCircle2, ChevronRight, Wallet, Lock } from 'lucide-react';
import { useSBTApi } from "@/hooks/useSBTApi";

const FIXED_WALLET = "ded665bca7d412891f44a571d908b66184b0ee10";

function Mint() {

    const {mintSBT} = useSBTApi();
    const [recipientAddress, setRecipientAddress] = useState('');
    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState({ status: '', message: '' });

    const handleMint = async () => {
        if (!recipientAddress) {
          setResult({
            status: 'error',
            message: 'Please enter recipient address'
          });
          return;
        }
    
        setLoading(true);
        setResult({ status: '', message: '' });
    
        try {
          const response = await mintSBT(recipientAddress)
        //   console.log(response)
            
          setResult({
            status: 'success',
            message: 'Certification SBT minted successfully! Your achievement is now permanently recorded on the blockchain.'
          });
          setRecipientAddress('');
          setLoading(false);
          
        } catch (error) {
          console.error('Mint error:', error);
          setResult({
            status: 'error',
            message: (error instanceof Error && error.message === 'AUTH_ERROR') 
              ? 'Authentication failed. Please check API key.'
              : (error instanceof Error ? error.message : 'Failed to mint certification. Please try again.')
          });
          setLoading(false);
        }
      };
    
      return (
        <div>
    
            {/* Main Card */}
            <div className="bg-white rounded-2xl shadow-xl p-8">
            <h1 className="text-black font-bold text-2xl mb-4">Mint SBT</h1>
              {/* System Wallet Display */}
              <div className="mb-8 p-4 bg-gray-50 rounded-lg border border-gray-200">
                <div className="flex items-center mb-2">
                  <Lock className="h-5 w-5 text-gray-500 mr-2" />
                  <h3 className="font-medium text-gray-700">System Wallet Address</h3>
                </div>
                <div className="bg-white p-3 rounded border border-gray-200">
                  <code className="text-sm text-gray-600 break-all">{FIXED_WALLET}</code>
                </div>
              </div>
    
              {/* Recipient Address Input */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2 text-black">
                  Recipient Address
                  <span className="text-red-500 ml-1">*</span>
                </label>
                <div className="relative">
                  <Wallet className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-800 h-5 w-5" />
                  <input
                    type="text"
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-black"
                    placeholder="Enter recipient's wallet address"
                    value={recipientAddress}
                    onChange={(e) => setRecipientAddress(e.target.value)}
                  />
                </div>
                <p className="mt-1 text-sm text-gray-500">Enter the wallet address that will receive the certification</p>
              </div>
    
              {/* Mint Button */}
              <button
                onClick={handleMint}
                disabled={!recipientAddress || loading}
                className={`mt-8 w-full flex items-center justify-center space-x-2 py-3 px-4 rounded-lg text-white font-medium ${
                  !recipientAddress || loading
                    ? 'bg-gray-400 cursor-not-allowed'
                    : 'bg-indigo-600 hover:bg-indigo-700 transition-colors'
                }`}
              >
                {loading ? (
                  <div className="flex items-center">
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    <span>Minting Certificate...</span>
                  </div>
                ) : (
                  <>
                    <span>Mint Certification</span>
                    <ChevronRight className="h-5 w-5" />
                  </>
                )}
              </button>
    
              {/* Result Alert */}
              {result.status && (
                <div className={`mt-6 p-4 rounded-lg ${
                  result.status === 'success' ? 'bg-green-50' : 'bg-red-50'
                }`}>
                  <div className="flex items-start">
                    {result.status === 'success' ? (
                      <CheckCircle2 className="h-5 w-5 text-green-600 mt-0.5" />
                    ) : (
                      <AlertCircle className="h-5 w-5 text-red-600 mt-0.5" />
                    )}
                    <div className="ml-3">
                      <h3 className={`text-sm font-medium ${
                        result.status === 'success' ? 'text-green-800' : 'text-red-800'
                      }`}>
                        {result.status === 'success' ? 'Success!' : 'Error'}
                      </h3>
                      <p className={`mt-1 text-sm ${
                        result.status === 'success' ? 'text-green-700' : 'text-red-700'
                      }`}>
                        {result.message}
                      </p>
                    </div>
                  </div>
                </div>
              )}
          </div>

        </div>
      );
}

export default Mint