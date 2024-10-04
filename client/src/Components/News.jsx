import React from "react";
import NewsBlock from "./NewsBlock";

function News({ role }) {
  return (
    <>
      <div className="w-full">
        <div className="m-3">
          <h1 className="text-lg font-semibold">News</h1>
          <p className="text-xs text-gray-400 font-normal">
            Add and view your latest news here
          </p>
        </div>
        <div className="bg-quarter mx-3 shadow-md rounded-lg p-3 flex justify-between items-center flex-wrap-reverse gap-2">
          <button className="h-8 bg-black text-white text-xs font-medium rounded-full px-3">
            Show all news
          </button>
          <button className="h-10 w-10 bg-secondary text-white text-xl font-medium rounded-full">
            +
          </button>
        </div>
        <div className="flex flex-col gap-2 py-3 px-3">
          <NewsBlock />
        </div>
      </div>
    </>
  );
}

export default News;
