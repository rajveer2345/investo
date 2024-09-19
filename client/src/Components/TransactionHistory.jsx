import React from "react";



import { useState } from "react";
import Loader from "../Components/Loader";

function TransactionHistory() {

  const [loading, setLoading] = useState(false);


  return (
    <>
      {loading ? <Loader /> : null}

      <div className="w-full">
        <div className="m-3">
          <h1 className="text-lg font-semibold">History</h1>
          <p className="text-xs text-gray-600">
            Check your transactions history
          </p>
        </div>
        <div className="bg-quarter mx-3 shadow-md rounded-lg p-4">
    
        </div>
      </div>
    </>
  );
}

export default TransactionHistory;
