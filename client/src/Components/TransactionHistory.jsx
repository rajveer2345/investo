import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getAdminTransactions, getUserTransactions } from "../api/transaction";
import TransactionTable from "./TransactionTable";

import { useState } from "react";
import Loader from "../Components/Loader";

function TransactionHistory({ role }) {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState("all");
  const [transactions, setTransactions] = useState([]);
  const [ftransactions, setFtransactions] = useState([]);

  const [dateRange, setDateRange] = useState({
    startDate: new Date(),
    endDate: new Date(),
  });

  async function getHistory(e) {
    setLoading(true);
    e.preventDefault();
    try {
      const data =
        role === "admin"
          ? await getAdminTransactions(dateRange)
          : await getUserTransactions(dateRange);
    
        //const data = await getAdminTransactions(dateRange);
        if (data?.message === "success") {
          setSelectedFilter("all");
          setTransactions(data?.data);
          setFtransactions(data?.data);
        } else if (data?.message === "Invalid token") {
          localStorage.clear();
          navigate("/");
        }

    } catch (error) {
      console.log("Error: ", error);
    }
    setLoading(false);
  }

  const formatDate = (date) => {
    return new Date(date).toISOString().split("T")[0];
  };

  function setFilter(type) {
    setSelectedFilter(type);
  }

  useEffect(() => {
    switch (selectedFilter) {
      case "all":
        return setFtransactions(transactions);
      case "deposit":
        setFtransactions(
          transactions.filter((obj, index) => {
            if (obj.type === "deposit") {
              return true;
            } else {
              return false;
            }
          })
        );
        break;
      case "withdraw":
        setFtransactions(
          transactions.filter((obj, index) => {
            if (obj.type === "withdraw") {
              return true;
            } else {
              return false;
            }
          })
        );
        break;
      default:
        break;
    }
  }, [selectedFilter, transactions]);

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
        <div className="bg-quarter mx-3 shadow-md rounded-lg p-3 flex justify-between items-center flex-wrap-reverse gap-2">
          <div className="flex gap-2">
            <div
              onClick={() => {
                setSelectedFilter("all");
              }}
              className={`border-2 rounded-xl text-xs font-semibold px-3 py-1 ${
                selectedFilter === "all"
                  ? "border-secondary"
                  : "border-gray-200"
              }`}
            >
              All
            </div>
            <div
              onClick={() => {
                setSelectedFilter("deposit");
              }}
              className={`border-2 rounded-xl text-xs font-semibold px-3 py-1 ${
                selectedFilter === "deposit"
                  ? "border-secondary"
                  : "border-gray-200"
              }`}
            >
              Deposit
            </div>
            <div
              onClick={() => {
                setSelectedFilter("withdraw");
              }}
              className={`border-2 rounded-xl text-xs font-semibold px-3 py-1 ${
                selectedFilter === "withdraw"
                  ? "border-secondary"
                  : "border-gray-200"
              }`}
            >
              Withdraw
            </div>
          </div>
          <form
            className="flex gap-3 items-center text-xs font-semibold"
            onSubmit={getHistory}
          >
            <div>
              <label>From: </label>
              <input
                max={formatDate(new Date())}
                className="w-28 p-1 rounded-md border border-gray-200"
                type="date"
                value={
                  dateRange.startDate ? formatDate(dateRange.startDate) : ""
                }
                onChange={(e) =>
                  setDateRange({ ...dateRange, startDate: e.target.value })
                }
                required
              />
            </div>
            <div>
              <label>To: </label>
              <input
                max={formatDate(new Date())}
                className="w-28 p-1 rounded-md border border-gray-200"
                type="date"
                value={dateRange.endDate ? formatDate(dateRange.endDate) : ""}
                onChange={(e) =>
                  setDateRange({ ...dateRange, endDate: e.target.value })
                }
                required
              />
            </div>

            <button
              type="submit"
              className="h-8 w-20 bg-black text-white text-xs font-medium rounded-full"
            >
              Search
            </button>
          </form>
        </div>
        <div>
          <TransactionTable transactions={ftransactions} />
        </div>
      </div>
    </>
  );
}

export default TransactionHistory;
