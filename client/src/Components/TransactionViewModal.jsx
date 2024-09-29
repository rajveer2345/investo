import React, { useState } from "react";

function TransactionModal({ transaction, setOpen }) {
  return (
    <>
      <div className="h-screen w-full flex justify-center items-center bg-black bg-opacity-50 fixed z-50 top-0 right-0">
        <div className="bg-white p-3 rounded-xl flex flex-col gap-1">
          <h1 className="text-sm font-medium mb-1">Transaction Details</h1>
          <div className="w-[300px]">
            <label className="block font-semibold text-xs mb-1">User ID</label>
            <input
              className="w-full rounded-full h-8 px-2 border-solid border"
              type="text"
              name="userId"
              value={transaction?.userId?.email}
              readOnly
            />
          </div>
          <div className="w-[300px]">
            <label className="block font-semibold text-xs mb-1">From</label>
            <input
              className="w-full rounded-full h-8 px-2 border-solid border-2"
              type="text"
              name="from"
              value={transaction?.from}
              readOnly
            />
          </div>
          <div className="w-[300px]">
            <label className="block font-semibold text-xs mb-1">Reference</label>
            <input
              className="w-full rounded-full h-8 px-2 border-solid border-2"
              type="text"
              name="reference"
              value={transaction?.reference?.email}
              readOnly
            />
          </div>
          <div className="w-[300px]">
            <label className="block font-semibold text-xs mb-1">Type</label>
            <input
              className="w-full rounded-full h-8 px-2 border-solid border-2"
              type="text"
              name="type"
              value={transaction?.type}
              readOnly
            />
          </div>
          <div className="w-[300px]">
            <label className="block font-semibold text-xs mb-1">Category</label>
            <input
              className="w-full rounded-full h-8 px-2 border-solid border-2"
              type="text"
              name="category"
              value={transaction?.category}
              readOnly
            />
          </div>
          <div className="w-[300px]">
            <label className="block font-semibold text-xs mb-1">Amount</label>
            <input
              className="w-full rounded-full h-8 px-2 border-solid border-2"
              type="number"
              name="amount"
              value={transaction?.amount/100}
              readOnly
            />
          </div>
          <div className="w-[300px]">
            <label className="block font-semibold text-xs mb-1">Balance after transaction</label>
            <input
              className="w-full rounded-full h-8 px-2 border-solid border-2"
              type="number"
              name="amount"
              value={transaction?.balanceAfter/100}
              readOnly
            />
          </div>
          {transaction.description &&
            <div className="w-[300px]">
            <label className="block font-semibold text-xs mb-1">Description</label>
            <textarea
              className="w-full rounded-3xl h-10 px-2 border-solid border-2"
              name="description"
              value={transaction?.description || "No Description"}
              readOnly
            ></textarea>
          </div>
          }
          
          <div className="w-[300px]">
            <label className="block font-semibold text-xs mb-1">Date</label>
            <input
              className="w-full rounded-full h-8 px-2 border-solid border-2"
              type="text"
              name="date"
              value={new Date(transaction?.date).toLocaleString()}
              readOnly
            />
          </div>
          <div className="flex gap-2 justify-end mt-3">
            <button
              onClick={() => setOpen(false)}
              className="h-8 w-20 bg-black text-white text-xs font-medium rounded-full"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default TransactionModal;
