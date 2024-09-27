import React, { useEffect, useState } from "react";
import TransactionViewModal from "./TransactionViewModal";

const TransactionTable = ({ transactions, role }) => {
  const [modalTransaction, setModalTransaction] = useState({});
  const [modalOpen, setModalOpen] = useState(false);

  function handleViewClick(data) {
    setModalTransaction(data);
    console.log("first");
    setModalOpen(true);
  }

  useEffect(() => {
    console.log(modalOpen);
  }, [modalOpen]);

  if (!Array.isArray(transactions)) {
    return (
      <div className="m-3 bg-quarter rounded-lg overflow-hidden overflow-x-auto text-center"></div>
    );
  }
  if (!transactions.length > 0) {
    return (
      <div className="m-3 bg-quarter rounded-xl overflow-hidden overflow-x-auto text-center py-5">
        No Transactions available
      </div>
    );
  }

  return (
    <>
      {modalOpen && (
        <TransactionViewModal
          transaction={modalTransaction}
          setOpen={setModalOpen}
        />
      )}
      <div className="m-3 bg-quarter rounded-lg overflow-hidden overflow-x-auto">
        <table className="w-full border-collapse border border-gray-300 rounded-3xl text-center">
          <thead>
            <tr>
              <th className="border px-2 py-2 text-sm font-semibold">S. No.</th>
              <th className="border px-2 py-2 text-sm font-semibold">From</th>
              {role === "admin" && (
                <th className="border px-2 py-2 text-sm font-semibold">
                  User ID
                </th>
              )}
              <th className="border px-2 py-2 text-sm font-semibold">Type</th>
              <th className="border px-2 py-2 text-sm font-semibold">
                Category
              </th>
              <th className="border px-2 py-2 text-sm font-semibold">Amount</th>
              <th className="border px-2 py-2 text-sm font-semibold">Date</th>
              <th className="border px-2 py-2 text-sm font-semibold">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((transaction, index) => (
              <tr className="odd:bg-white even:bg-quarter" key={transaction._id}>
                <td className="border px-2 py-2 text-sm font-normal w-14">
                  {index + 1}
                </td>
                <td className="border px-2 py-2 text-sm font-normal">
                  {transaction?.from}
                </td>
                {role === "admin" && (
                  <td className="border px-2 py-2 text-sm font-normal">
                    {transaction?.userId?.email}
                  </td>
                )}
                <td className="border px-2 py-2 text-sm font-normal">
                  {transaction?.type}
                </td>
                <td className="border px-2 py-2 text-sm font-normal">
                  {transaction?.category}
                </td>
                <td className="border px-2 py-2 text-sm font-normal">
                  {transaction?.amount/100}
                </td>
                <td className="border px-2 py-2 text-sm font-normal">
                  {new Date(transaction?.date).toLocaleString()}
                </td>
                <td className="border px-2 py-2">
                  <button
                    onClick={() => {
                      handleViewClick(transaction);
                    }}
                    className="bg-secondary text-xs font-medium text-white px-4 py-1 rounded"
                  >
                    View
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default TransactionTable;
