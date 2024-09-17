import React, { useEffect, useState } from "react";
import { fetchUser } from "../api/user";
import { makeTransaction } from "../api/transaction";
import Loader from "../Components/Loader";
import toast from "react-hot-toast";
import TransactionModal from "./TransactionModal";

function UserEdit() {
  const [fetchedUserData, setFetchedUserData] = useState({});
  const [formView, setFormView] = useState("fetch");
  const [queryEmail, setQueryEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [modelView, setModelView] = useState(false);
  const [transactionData, setTransactionData] = useState({
    userId: "",
    from: "",
    reference: "",
    type: "",
    category: "",
    amount: 0,
    description: "",
  });

  async function fetchUserData() {
    setFormView("fetch");
    setLoading(true);

    try {
      const userData = await fetchUser(queryEmail);

      if (userData.message === "success") {
        setFetchedUserData(userData?.data);
      } else {
        toast.error(userData.message);
      }
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  }

  async function handleMakeTransaction() {
    setLoading(true);

    try {
      const transaction = await makeTransaction(transactionData);
      if (transaction?.message === "Success") {
        toast.success("Transaction successful.");
        setFormView("fetch");
      } else {
        toast.error("Transaction failed.");
      }
    } catch (error) {
      console.log(error);
    }
    fetchUserData();
    setLoading(false);
  }

  function handleQueryChange(e) {
    setQueryEmail(e.target.value);
  }

  useEffect(() => {
    let tData = {
      userId: fetchedUserData._id,
      from: "admin",
      reference: "66dc4d299d7bc13a754f5461",
      type: "",
      category: "",
      amount: 0,
      description: "",
    };

    setTransactionData(tData);
  }, [fetchedUserData]);

  return (
    <>
      {modelView && (
        <TransactionModal
          setOpen={setModelView}
          transactionData={transactionData}
          setTansactionData={setTransactionData}
          handleMakeTransaction={handleMakeTransaction}
        />
      )}
      {loading ? <Loader /> : null}
      <div className="w-full">
        <div className="bg-quarter m-4 shadow-md rounded-lg p-6">
          <div class="w-1/2 items-start flex gap-2">
            <input
              onChange={handleQueryChange}
              className="w-full rounded-full h-8 px-2 border-solid border-2"
              type="text"
              name="queryEmail"
              value={queryEmail}
              placeholder="Enter User E-mail"
            />
            <button
              onClick={fetchUserData}
              className="h-8 w-20 bg-black text-white text-xs font-medium rounded-full"
            >
              Search
            </button>
          </div>

          {formView == "fetch" && Object.keys(fetchedUserData).length > 0 && (
            <div className="w-full bg-secondary rounded-3xl flex justify-between p-2 gap-3 items-center mt-5">
              <div className="w-8 h-8 rounded-full bg-white min-w-8">
                <img className="rounded-full w-8 h-8" src="" alt="" />
              </div>
              <div className="w-full text-left ms-3">
                <h5 className="text-xs font-medium">{fetchedUserData.name}</h5>
              </div>
              <div className="w-full text-left ms-3">
                <h5 className="text-xs font-medium">{fetchedUserData.email}</h5>
              </div>

              <div className="w-full text-center ms-3 flex gap-1 justify-end">
                <button
                  onClick={() => {
                    setFormView("view");
                  }}
                  className="h-8 w-24 bg-black text-white text-xs font-medium rounded-full"
                >
                  View
                </button>
                <button
                  onClick={() => {
                    setFetchedUserData({});
                    setQueryEmail("");
                  }}
                  className="h-8 w-24 bg-black text-white text-xs font-medium rounded-full"
                >
                  Close
                </button>
              </div>
            </div>
          )}

          {Object.keys(fetchedUserData).length > 0 && formView === "view" && (
            <div id="form-deposit" className="w-full mt-5 rounded-3xl">
              <div className="w-full border border-gray-300 my-2"></div>

              <label className="text-xs font-semibold">Name</label>
              <input
                className="w-full rounded-full mt-1 h-8 mb-1 px-2 border-solid border-2"
                type="text"
                disabled={true}
                value={fetchedUserData?.name}
                name="name"
                placeholder="INR"
              />
              <label className="text-xs font-semibold">Email</label>
              <input
                disabled={true}
                value={fetchedUserData?.email}
                className="w-full rounded-full mt-1 h-8 mb-1 px-2 border-solid border-2 "
                type="text"
                name="email"
                placeholder="Type here..."
              />

              <label className="text-xs font-semibold">Membership</label>
              <input
                disabled={true}
                value={fetchedUserData?.userType}
                className="w-full rounded-full mt-1 h-8 mb-1 px-2 border-solid border-2 "
                type="text"
                name="amount"
                placeholder="Type here..."
              />

              <div className="flex flex-col gap-2">
                <label className="text-xs font-semibold">
                  Investment amount
                </label>
                <div className="flex gap-2">
                  <input
                    disabled={true}
                    value={fetchedUserData?.investmentAmount}
                    className="w-full rounded-full mt-1 h-8 mb-1 px-2 border-solid border-2 "
                    type="text"
                    name="nvestmentAmount"
                    placeholder="Type here..."
                  />
                  <button
                    onClick={() => {
                      setTransactionData((prev) => ({
                        ...prev,
                        type: "deposit",
                        category: "investment",
                      }));
                      setModelView(true);
                    }}
                    className="h-8 w-20 bg-black text-white text-xs font-medium rounded-full"
                  >
                    Deposit
                  </button>
                  <button
                    onClick={() => {
                      setTransactionData((prev) => ({
                        ...prev,
                        type: "withdraw",
                        category: "investment",
                      }));
                      setModelView(true);
                    }}
                    className="h-8 w-20 bg-black text-white text-xs font-medium rounded-full"
                  >
                    Withdraw
                  </button>
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-xs font-semibold">
                  Investment Earning
                </label>
                <div className="flex gap-2">
                  <input
                    disabled={true}
                    value={fetchedUserData?.investmentEarning}
                    className="w-full rounded-full mt-1 h-8 mb-1 px-2 border-solid border-2 "
                    type="text"
                    name="amount"
                    placeholder="Type here..."
                  />
                  <button
                    onClick={() => {
                      setTransactionData((prev) => ({
                        ...prev,
                        type: "withdraw",
                        category: "investmentEarning",
                      }));
                      setModelView(true);
                    }}
                    className="h-8 w-20 bg-black text-white text-xs font-medium rounded-full"
                  >
                    Withdraw
                  </button>
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-xs font-semibold">
                  Referral Earning
                </label>
                <div className="flex gap-2">
                  <input
                    disabled={true}
                    value={fetchedUserData?.referralEarning}
                    className="w-full rounded-full mt-1 h-8 mb-1 px-2 border-solid border-2 "
                    type="text"
                    name="amount"
                    placeholder="Type here..."
                  />
                  <button
                    onClick={() => {
                      setTransactionData((prev) => ({
                        ...prev,
                        type: "withdraw",
                        category: "referralEarning",
                      }));
                      setModelView(true);
                    }}
                    className="h-8 w-20 bg-black text-white text-xs font-medium rounded-full"
                  >
                    Withdraw
                  </button>
                </div>
              </div>

              <label className="text-xs font-semibold">Referred by</label>
              <input
                disabled={true}
                value={
                  fetchedUserData?.referredBy
                    ? `${fetchedUserData?.referredBy?.name} (${fetchedUserData?.referredBy?.email})`
                    : "Not referred by anyone"
                }
                className="w-full rounded-full mt-1 h-8 mb-1 px-2 border-solid border-2 "
                type="text"
                name="amount"
                placeholder="Type here..."
              />
              <label className="text-xs font-semibold">Total referrals</label>
              <input
                disabled={true}
                value={fetchedUserData?.referrals?.length || 0}
                className="w-full rounded-full mt-1 h-8 mb-1 px-2 border-solid border-2 "
                type="text"
                name="amount"
                placeholder="Type here..."
              />
              <label className="text-xs font-semibold">Account status</label>
              <input
                disabled={true}
                className="w-full rounded-full mt-1 h-8 mb-1 px-2 border-solid border-2 "
                type="text"
                name="amount"
                value={fetchedUserData?.isVerified ? "Active" : "Inactive"}
                placeholder="Type here..."
              />

              <div className="flex justify-end gap-2 mt-3">
                <button
                  onClick={() => {
                    setFormView("fetch");
                  }}
                  className="h-8 w-24 bg-black text-white text-xs font-medium rounded-full"
                >
                  Close
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default UserEdit;
