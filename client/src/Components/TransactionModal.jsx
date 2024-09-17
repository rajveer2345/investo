import React, { useState } from "react";

function TransactionModal({ amountType, setOpen, transactionData, setTansactionData, handleMakeTransaction }) {
    const[amount, setAmount] = useState(0);
    const[description, setDescription] = useState("");
  return (
    <div className="h-screen w-full flex justify-center items-center bg-black bg-opacity-50 fixed z-50 top-0 right-0">
      <div className="bg-white p-5 rounded-3xl flex flex-col gap-2">
        <h1>Update {amountType}</h1>
        <input
          onChange={(e)=>{setTansactionData((prev)=>({...prev, amount: e.target.value}))}}
          className="w-[300px] rounded-full h-8  px-2 border-solid border-2 "
          type="number"
          name="investmentAmount"
          placeholder="Amount"
        />
        <textarea  onChange={(e)=>{setTansactionData((prev)=>({...prev, description: e.target.value}))}} className="w-[300px] rounded-3xl h-20  px-2 border-solid border-2">

        </textarea>
        <div className="flex gap-2 justify-end mt-3">
          <button onClick={()=>{setOpen(false)}} className="h-8 w-20 bg-black text-white text-xs font-medium rounded-full">
            Cancel
          </button>
          <button onClick={()=>{handleMakeTransaction(); setOpen(false)}} className="h-8 w-20 bg-black text-white text-xs font-medium rounded-full">
            {transactionData?.type === "withdraw" ? "Withdraw" : "Deposit"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default TransactionModal;
