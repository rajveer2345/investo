import React, { useEffect } from "react";

import { getAdminTransactions, getUserTransactions } from "../api/transaction";

import { useState } from "react";
import Loader from "../Components/Loader";
 

function TransactionHistory() {
  const [loading, setLoading] = useState(false);

async function getHistory(){

  const data = await getAdminTransactions();
  if(data?.message === "success"){
    console.log(data.data,"history")
  }
}

useEffect(()=>{getHistory(); console.log("first")},[])

  return (
    <>
      {loading ? <Loader /> : null}

      <div className="w-full">
        <div className="m-3">
          <h1 className="text-lg font-semibold">History</h1>
          <p className="text-xs text-gray-400 font-normal">
            Check your transactions history
          </p>
        </div>
        <div className="bg-quarter mx-3 shadow-md rounded-lg p-4"></div>
      </div>
    </>
  );
}

export default TransactionHistory;
