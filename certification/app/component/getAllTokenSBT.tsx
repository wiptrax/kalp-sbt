"use client";

import React, { useState, useEffect } from "react";
import { AlertCircle, CheckCircle2 } from "lucide-react";
import { useSBTApi } from "@/hooks/useSBTApi";

function SearchByAllSBT() {
  const { getAllTokenIDs } = useSBTApi();
  const [loading, setLoading] = useState(false);
  const [pageLoaded, setPageLoaded] = useState(false);
  const [result, setResult] = useState({ status: "", message: null, data: [] });

  // Set `pageLoaded` to true after the component mounts
  useEffect(() => {
    setPageLoaded(true);
  }, []);

  const handleGetAllTokenIDs = async () => {
    setLoading(true);
    setResult({ status: "", message: null, data: [] });

    try {
      const response = await getAllTokenIDs();

      if (response?.status === "SUCCESS" && response.result?.result?.length > 0) {
        setResult({
          status: "success",
          message: `Successfully retrieved ${response.result.result.length} token IDs.`,
          data: response.result.result,
        });
      } else {
        throw new Error("No token IDs found or the response was empty.");
      }
    } catch (error) {
      console.error("SearchByAllSBT error:", error);
      setResult({
        status: "error",
        message:
          error instanceof Error
            ? error.message
            : "Failed to retrieve token IDs. Please try again.",
        data: [],
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div className="bg-white rounded-2xl shadow-xl p-8">
        <h1 className="text-black font-bold text-2xl mb-4">Fetch All SBT Token IDs</h1>

        {/* Fetch Button */}
        <button
          onClick={handleGetAllTokenIDs}
          disabled={!pageLoaded || loading}
          className={`w-full flex items-center justify-center space-x-2 py-3 px-4 rounded-lg text-white font-medium ${
            !pageLoaded || loading
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
              <span>Fetching Token IDs...</span>
            </div>
          ) : (
            <span>Fetch Token IDs</span>
          )}
        </button>

        {/* Result Display */}
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
                    <>
                      <p>{result.message}</p>
                      <ul className="mt-2 list-disc list-inside">
                        {result.data.map((tokenID, index) => (
                          <li key={index} className="text-gray-700">
                            {tokenID}
                          </li>
                        ))}
                      </ul>
                    </>
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

export default SearchByAllSBT;
