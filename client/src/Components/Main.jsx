import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";

import Badge from "./Badge";

import { IoPeopleSharp } from "react-icons/io5";
import { IoWallet } from "react-icons/io5";
import { GrContact } from "react-icons/gr";
import { IoSearchOutline } from "react-icons/io5";
import investing from "../assets/images/investing.png";
import user1 from "../assets/images/user1.png";
import user2 from "../assets/images/user2.jpg";
import news from "../assets/images/news.png";
import { IoMdCopy } from "react-icons/io";
import { BiSolidBadgeDollar } from "react-icons/bi";

function Main({ userData }) {

  useEffect(() => {
    if (userData) {
      console.log(userData, "Updated userData");
    }
  }, [userData]);

  const userType = "gold";
  const copyId = async () => {
    try {
      await navigator.clipboard.writeText(userData.referralId);
      toast.success("Referral ID copied successfully.");
    } catch (err) {
      console.error("Failed to copy: ", err);
    }
  };
  return (
    <div className="w-full flex flex-col sm:flex-row ">
      <div className="sm:w-[70%] w-full  flex flex-col p-4">
        <div className="mb-4 flex flex-col sm:flex-row justify-between gap-2">
          <div className="flex gap-3 items-center">
            <h1 className="text-lg font-semibold text-nowrap">
              {userData.name}
            </h1>
            <div>
                {userData.userType === "silver" ?
                <Badge type={"silver"} /> :
                userData.userType === "gold" ?
                <Badge type={"gold"} /> :
                userData.userType === "platinum" ?
                <Badge type={"platinum"} />: ""
                }
              
            </div>
          </div>

          <div>
            <div
              id="demo"
              className="items-center border inline-flex border-gray-300 rounded-md overflow-hidden"
            >
              <div className=" bg-gray-300 px-2 h-[30px] font-medium text-xs flex justify-center items-center">
                ID
              </div>
              <div className="text-sm px-2">{userData.referralId}</div>
              <div
                onClick={copyId}
                className=" bg-white py-1 px-1 font-medium text-xs text-black hover:text-secondary border-l-2 cursor-pointer"
              >
                <IoMdCopy size={20} />
              </div>
            </div>
          </div>
        </div>

        <div className=" flex flex-wrap w-full gap-3">
          <div className="px-8 bg-tertiary rounded-3xl flex flex-col items-center justify-center h-48 w-60">
            <h5 className="text-xs font-semibold">Total Investment</h5>
            <h1 className="text-4xl font-semibold mt-5">&#x20b9;{userData?.investmentAmount || 0}</h1>

            <h6 className="font-normal text-xs mt-2">
              + <span className="text-xs font-semibold">&#x20b9;2508</span> last
              week
            </h6>
            <div className="flex mt-3">
              <div className="mx-2 bg-black text-xs text-white font-normal w-24 h-12 rounded-full flex justify-center items-center">
                Envest More
              </div>
              <div className="mx-2 bottom-2 right-2 bg-primary w-12 h-12 text-black text-xl font-light rounded-full flex justify-center items-center">
                +
              </div>
            </div>
          </div>
          <div className="px-8 bg-tertiary rounded-3xl flex flex-col items-center justify-center h-48 w-60">
            <h5 className="text-xs font-semibold">Total Earnings</h5>
            <h1 className="text-4xl font-semibold mt-5">&#x20b9;{userData?.investmentEarning+userData?.referralEarning || 0}</h1>

            <h6 className="font-normal text-xs mt-2">
              + <span className="text-xs font-semibold">&#x20b9;2508</span> last
              week
            </h6>
            <div className="flex mt-3">
              <div className="mx-2 bg-black text-xs text-white font-normal w-24 h-12 rounded-full flex justify-center items-center">
                Envest More
              </div>
              <div className="mx-2 bottom-2 right-2 bg-primary w-12 h-12 text-black text-xl font-light rounded-full flex justify-center items-center">
                +
              </div>
            </div>
          </div>
          <div className="rounded-3xl flex flex-col h-48 gap-3">
            <div className="px-3 py-2 w-60 h-full bg-gradient-to-b from-primary to-[#ACD790] rounded-3xl flex">
              <div className="flex items-center">
                <div className="text-white bg-black rounded-full h-8 w-8 flex justify-center items-center">
                  <IoPeopleSharp size={15} />
                </div>
              </div>
              <div className=" flex flex-col justify-center items-start w-full ps-4">
                <h5 className="text-xs font-semibold">From Refferals</h5>
                <h2 className="text-3xl">&#x20b9;{userData?.referralEarning || 0}</h2>
                <h6 className="font-normal text-xs invisible">
                  + <span className="text-xs font-semibold">&#x20b9;2508</span>{" "}
                  last week
                </h6>
              </div>
            </div>
            <div className="px-3 py-2 w-60 h-full bg-gradient-to-b from-[#ACD790] to-secondary rounded-3xl flex">
              <div className="flex items-center">
                <div className="text-white bg-black rounded-full h-8 w-8 flex justify-center items-center">
                  <IoWallet size={15} />
                </div>
              </div>
              <div className=" flex flex-col justify-center items-start w-full ps-4">
                <h5 className="text-xs font-semibold">From Investments</h5>
                <h2 className="text-3xl">&#x20b9;{userData?.investmentEarning || 0}</h2>
                <h6 className="font-normal text-xs invisible">
                  + <span className="text-xs font-semibold">&#x20b9;2508</span>{" "}
                  last week
                </h6>
              </div>
            </div>
          </div>
        </div>
        <div id="referalBox" className="w-full mt-4">
          <div className="border-t-2 border-gray-200 my-4"></div>

          <h1 className="text-xs font-semibold">Referrals</h1>

          <div className="flex flex-col gap-2 mt-3">
            <div className="w-full flex justify-between px-3 gap-3 items-center">
              <div className="w-8 h-3 rounded-full min-w-10"></div>
              <div className="w-full text-gray-500 text-center ms-3">
                <h5 className="text-xs font-medium">Name</h5>
              </div>
              <div className="w-full text-gray-500 text-center ms-3">
                <h5 className="text-xs font-medium">Share</h5>
              </div>
              <div className="w-full text-gray-500 text-center ms-3">
                <h5 className="text-xs font-medium">Total</h5>
              </div>
            </div>

            <div className="w-full bg-secondary rounded-3xl flex justify-between p-2 gap-3 items-center">
              <div className="w-8 h-8 rounded-full bg-white min-w-8">
                <img className="rounded-full w-8 h-8" src={user1} alt="" />
              </div>
              <div className="w-full text-center ms-3">
                <h5 className="text-xs font-medium">Robert Brown</h5>
              </div>
              <div className="w-full text-center ms-3">
                <h5 className="text-xs font-medium">3.5%</h5>
              </div>
              <div className="w-full text-center ms-3">
                <h5 className="text-xs font-medium">&#x20b9;2350</h5>
              </div>
            </div>
            <div className="w-full bg-secondary rounded-3xl flex justify-between p-2 gap-3 items-center">
              <div className="w-8 h-8 rounded-full bg-white min-w-8">
                <img className="rounded-full w-8 h-8" src={user2} alt="" />
              </div>
              <div className="w-full text-center ms-3">
                <h5 className="text-xs font-medium">Robert Brown</h5>
              </div>
              <div className="w-full text-center ms-3">
                <h5 className="text-xs font-medium">3.5%</h5>
              </div>
              <div className="w-full text-center ms-3">
                <h5 className="text-xs font-medium">&#x20b9;2350</h5>
              </div>
            </div>
            <div className="w-full bg-secondary rounded-3xl flex justify-between p-2 gap-3 items-center">
              <div className="w-8 h-8 rounded-full bg-white min-w-8">
                <img className="rounded-full w-8 h-8" src={user1} alt="" />
              </div>
              <div className="w-full text-center ms-3">
                <h5 className="text-xs font-medium">Robert Brown</h5>
              </div>
              <div className="w-full text-center ms-3">
                <h5 className="text-xs font-medium">3.5%</h5>
              </div>
              <div className="w-full text-center ms-3">
                <h5 className="text-xs font-medium">&#x20b9;2350</h5>
              </div>
            </div>
            <div className="w-full bg-secondary rounded-3xl flex justify-between p-2 gap-3 items-center">
              <div className="w-8 h-8 rounded-full bg-white min-w-8">
                <img className="rounded-full w-8 h-8" src={user2} alt="" />
              </div>
              <div className="w-full text-center ms-3">
                <h5 className="text-xs font-medium">Robert Brown</h5>
              </div>
              <div className="w-full text-center ms-3">
                <h5 className="text-xs font-medium">3.5%</h5>
              </div>
              <div className="w-full text-center ms-3">
                <h5 className="text-xs font-medium">&#x20b9;2350</h5>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div
        id="sidebar"
        className="bg-quarter sm:w-[30%] w-[100%] flex flex-col shadow-md"
      >
        <div id="sidebar-top-div" className=" w-[100%] px-5 py-5">
          <div className="flex justify-between w-full pb-5">
            <div className="text-gray-500 text-[10px] font-medium flex">
              <IoSearchOutline size={15} color="black" />{" "}
              <span className="ms-1">Search</span>
            </div>
            <div className="text-gray-500 text-[10px] font-medium flex">
              <GrContact size={15} color="black" />{" "}
              <span className="ms-1">Contact Us</span>
            </div>
          </div>
          <div id="toggle-button" className="w-full flex justify-center">
            <div className="p-1 w-full bg-white h-10 rounded-full flex items-center">
              <div className="w-1/2 h-9 bg-primary rounded-full flex justify-center items-center">
                <p className="text-xs font-semibold">Deposit</p>
              </div>
              <div className="w-1/2 h-9 bg-white rounded-full flex justify-center items-center">
                <p className="text-xs font-semibold">Withdraw</p>
              </div>
            </div>
          </div>
          <div id="form-deposit" className="w-full mt-5 rounded-3xl">
            <form>
              <label className="text-xs font-semibold">Enter Amount</label>
              <input
                className="w-full rounded-full mt-1 h-10 mb-2 px-2 border-solid border-2"
                type="number"
                step={1}
                name="amount"
                placeholder="INR"
              />
              <label className="text-xs font-semibold">Remarks</label>
              <input
                className="w-full rounded-full mt-1 h-10 px-2 border-solid border-2 "
                type="text"
                name="amount"
                placeholder="Type here..."
              />
              <button
                type="submit"
                className="h-10 w-full bg-black text-white text-xs font-medium mt-5 rounded-full"
              >
                Pay Now
              </button>
            </form>
          </div>
          <div id="events" className="flex flex-col gap-3">
            <div className="text-xs mt-5 font-semibold">Latest News</div>

            <div className="w-full bg-tertiary rounded-3xl flex p-3">
              <div className="w-8 h-8 rounded-full bg-white min-w-8">
                <img className="w-8 h-8 rounded-full" src={news} alt="" />
              </div>
              <div className="w-full text-wrap ms-3">
                <h5 className="text-xs font-medium">
                  sed do eiusmod tempor incididunt ut labore et dolore magna
                  aliqua. Ut enim ad minim veniam.
                </h5>
              </div>
            </div>

            <div className="w-full bg-tertiary rounded-3xl flex p-3">
              <div className="w-8 h-8 rounded-full bg-white min-w-8">
                <img className="w-8 h-8 rounded-full" src={news} alt="" />
              </div>
              <div className="w-full text-wrap ms-3">
                <h5 className="text-xs font-medium">
                  sed do eiusmod tempor incididunt ut labore et dolore magna
                  aliqua. Ut enim ad minim veniam.
                </h5>
              </div>
            </div>

            <div className="w-full bg-tertiary rounded-3xl flex p-3">
              <div className="w-8 h-8 rounded-full bg-white min-w-8">
                <img className="w-8 h-8 rounded-full" src={news} alt="" />
              </div>
              <div className="w-full text-wrap ms-3">
                <h5 className="text-xs font-medium">
                  sed do eiusmod tempor incididunt ut labore et dolore magna
                  aliqua. Ut enim ad minim veniam.
                </h5>
              </div>
            </div>
            <div className="w-full bg-primary rounded-3xl flex p-3">
              <div className="w-8 h-8 rounded-full bg-white min-w-8">
                <img className="w-8 h-8 rounded-full" src={news} alt="" />
              </div>
              <div className="w-full text-wrap ms-3">
                <h5 className="text-xs font-medium">
                  sed do eiusmod tempor incididunt ut labore et dolore magna
                  aliqua. Ut enim ad minim veniam.
                </h5>
              </div>
            </div>
            <div className="w-full bg-primary rounded-3xl flex p-3">
              <div className="w-8 h-8 rounded-full bg-white min-w-8">
                <img className="w-8 h-8 rounded-full" src={news} alt="" />
              </div>
              <div className="w-full text-wrap ms-3">
                <h5 className="text-xs font-medium">
                  sed do eiusmod tempor incididunt ut labore et dolore magna
                  aliqua. Ut enim ad minim veniam.
                </h5>
              </div>
            </div>
            <div className="w-full bg-gradient-to-t from-[#ACD790] to-primary rounded-3xl flex p-3">
              <div className="w-8 h-8 rounded-full bg-white min-w-8">
                <img className="w-8 h-8 rounded-full" src={news} alt="" />
              </div>
              <div className="w-full text-wrap ms-3">
                <h5 className="text-xs font-medium">
                  sed do eiusmod tempor incididunt ut labore et dolore magna
                  aliqua. Ut enim ad minim veniam.
                </h5>
              </div>
            </div>
            <div className="w-full bg-gradient-to-t from-[#ACD790] to-primary rounded-3xl flex p-3">
              <div className="w-8 h-8 rounded-full bg-white min-w-8">
                <img className="w-8 h-8 rounded-full" src={news} alt="" />
              </div>
              <div className="w-full text-wrap ms-3">
                <h5 className="text-xs font-medium">
                  sed do eiusmod tempor incididunt ut labore et dolore magna
                  aliqua. Ut enim ad minim veniam.
                </h5>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Main;
