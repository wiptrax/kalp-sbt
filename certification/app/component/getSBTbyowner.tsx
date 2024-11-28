"use client";

import React, { useState } from "react";
import { AlertCircle, CheckCircle2, Wallet } from "lucide-react";
import { useSBTApi } from "@/hooks/useSBTApi";

function SearchByOwner() {
  const { getSBTByOwner } = useSBTApi();
  const [OwnerAddress, setOwnerAddress] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState({ status: "", message: null });

  const handleGetSBTByOwner = async () => {
    if (!OwnerAddress) {
      setResult({
        status: "error",
        message: "Please enter the owner's address.",
      });
      return;
    }

    setLoading(true);
    setResult({ status: "", message: null });

    try {
      const response = await getSBTByOwner(OwnerAddress);

      if (response?.status === "FAILURE") {
        const errorDetails = response?.result || "";
        if (errorDetails.includes("owner") && errorDetails.includes("does not have an SBT")) {
          throw new Error(
            `The owner '${OwnerAddress}' does not have any Soulbound Tokens (SBTs).`
          );
        } else {
          throw new Error("An unexpected error occurred while fetching SBTs.");
        }
      }

      if (response?.result?.result) {
        const { owner, tokenID, metadata } = response.result.result;
        const metadataObj = JSON.parse(metadata || "{}");

        setResult({
          status: "success",
          message: {
            owner,
            tokenID,
            description: metadataObj?.description || "No description available",
          },
        });
      } else {
        throw new Error("No valid data found.");
      }

      setOwnerAddress("");
    } catch (error) {
      console.error("SearchByOwner error:", error);
      setResult({
        status: "error",
        message:
          error instanceof Error
            ? `${error.message} : owner ${OwnerAddress} does not have an SBT`
            : "Failed to retrieve SBT. Please try again.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div className="bg-white rounded-2xl shadow-xl p-8">
        <h1 className="text-black font-bold text-2xl mb-4">Search SBT by Owner</h1>

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
              placeholder="Enter the owner's wallet address"
              value={OwnerAddress}
              onChange={(e) => setOwnerAddress(e.target.value)}
            />
          </div>
          <p className="mt-1 text-sm text-gray-500">
            Enter the wallet address to search for associated SBTs.
          </p>
        </div>

        {/* Search Button */}
        <button
          onClick={handleGetSBTByOwner}
          disabled={!OwnerAddress || loading}
          className={`mt-8 w-full flex items-center justify-center space-x-2 py-3 px-4 rounded-lg text-white font-medium ${
            !OwnerAddress || loading
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
              <span>Searching...</span>
            </div>
          ) : (
            <span>Search SBT</span>
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
                  {result.status === "success" ? (
                    <div>
                      <p>
                        <strong>Owner:</strong> {result.message.owner}
                      </p>
                      <p>
                        <strong>Token ID:</strong> {result.message.tokenID}
                      </p>
                      <p>
                        <strong>Description:</strong> {result.message.description}
                      </p>
                    </div>
                  ) : (
                    <p>{result.message}</p>
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

export default SearchByOwner;
