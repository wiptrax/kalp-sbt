"use client";

import React, { useState } from "react";
import { AlertCircle, CheckCircle2, ChevronRight, Wallet, Puzzle } from "lucide-react";
import { useSBTApi } from "@/hooks/useSBTApi";

function Query() {
  const { querySBT } = useSBTApi();
  const [OwnerAddress, setOwnerAddress] = useState("");
  const [TokenID, setTokenID] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState({ status: "", message: null });

  const handleQuery = async () => {
    if (!OwnerAddress) {
      setResult({
        status: "error",
        message: "Please enter owner's address",
      });
      return;
    }
    if (!TokenID) {
      setResult({
        status: "error",
        message: "Please enter Token ID",
      });
      return;
    }

    setLoading(true);
    setResult({ status: "", message: null });

    try {
      const response = await querySBT(OwnerAddress, TokenID);

      setResult({
        status: "success",
        message: response.result.result,
      });

      setOwnerAddress("");
      setTokenID("");
    } catch (error) {
      console.error("Query error:", error);
      setResult({
        status: "error",
        message:
          error instanceof Error
            ? error.message
            : "Failed to query SBT. Please try again.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div className="bg-white rounded-2xl shadow-xl p-8">
        <h1 className="text-black font-bold text-2xl mb-4">Querry SBT</h1>
        {/* Owner's Address Input */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Owner's Address
            <span className="text-red-500 ml-1">*</span>
          </label>
          <div className="relative">
            <Wallet className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-800 h-5 w-5" />
            <input
              type="text"
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-black"
              placeholder="Enter owner's wallet address"
              value={OwnerAddress}
              onChange={(e) => setOwnerAddress(e.target.value)}
            />
          </div>
          <p className="mt-1 text-sm text-gray-500 mb-2">
            Enter the wallet address to query
          </p>
        </div>

        {/* Token ID Input */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Token ID
            <span className="text-red-500 ml-1">*</span>
          </label>
          <div className="relative">
            <Puzzle className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-800 h-5 w-5" />
            <input
              type="text"
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-black"
              placeholder="Enter the Token ID"
              value={TokenID}
              onChange={(e) => setTokenID(e.target.value)}
            />
          </div>
          <p className="mt-1 text-sm text-gray-500">Enter the Token ID</p>
        </div>

        {/* Query Button */}
        <button
          onClick={handleQuery}
          disabled={!OwnerAddress || !TokenID || loading}
          className={`mt-8 w-full flex items-center justify-center space-x-2 py-3 px-4 rounded-lg text-white font-medium ${
            !OwnerAddress || !TokenID || loading
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-indigo-600 hover:bg-indigo-700 transition-colors"
          }`}
        >
          {loading ? (
            <div className="flex items-center">
              <svg
                className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
              <span>Querying SBT...</span>
            </div>
          ) : (
            <>
              <span>Query SBT</span>
              <ChevronRight className="h-5 w-5" />
            </>
          )}
        </button>

        {/* Result Alert */}
        {result.status && (
          <div
            className={`mt-6 p-4 rounded-lg ${
              result.status === "success" ? "bg-green-50" : "bg-red-50"
            }`}
          >
            <div className="flex items-start">
              {result.status === "success" ? (
                <CheckCircle2 className="h-5 w-5 text-green-600 mt-0.5" />
              ) : (
                <AlertCircle className="h-5 w-5 text-red-600 mt-0.5" />
              )}
              <div className="ml-3">
                <h3
                  className={`text-sm font-medium ${
                    result.status === "success" ? "text-green-800" : "text-red-800"
                  }`}
                >
                  {result.status === "success" ? "Success!" : "Error"}
                </h3>
                <div className="mt-1 text-sm text-gray-700">
                  {result.status === "success" && result.message ? (
                    <div>
                      <p>
                        <strong>Owner:</strong> {result.message?.owner || "N/A"}
                      </p>
                      <p>
                        <strong>Token ID:</strong> {result.message?.tokenID || "N/A"}
                      </p>
                      <p>
                        <strong>Metadata:</strong>{" "}
                        {(() => {
                          try {
                            const metadataObj = JSON.parse(
                              result.message?.metadata || "{}"
                            );
                            return `description: ${metadataObj?.description || "N/A"}`;
                          } catch (error) {
                            return "Invalid metadata format";
                          }
                        })()}
                      </p>
                    </div>
                  ) : (
                    <p>{result.message || "Unknown error occurred."}</p>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Query;
