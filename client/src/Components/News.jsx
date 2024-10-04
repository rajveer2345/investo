import React, { useEffect, useState } from "react";
import { getAllNews, createNews, updateNews, deleteNews } from "../api/news";
import NewsBlock from "./NewsBlock";
import toast from "react-hot-toast";
import { FaStar } from "react-icons/fa";
import Loader from "../Components/Loader";

function News({ role }) {
  const [newsData, setNewsData] = useState([]);
  const [newNews, setNewNews] = useState(null);
  const [editSelected, setEditSelected] = useState("");
  const [loading, setLoading] = useState(false);

  async function getNews() {
    setLoading(true);
    const data = await getAllNews();
    if (data?.message === "success") {
      setNewsData(data.data);
    } else {
      toast.error("Error.");
    }
    setLoading(false);
    setEditSelected("")
  }

  function handleCreateNews() {
    setNewNews({ title: "", content: "" });
    setEditSelected("")
  }

  function handleNewNewsChange(e) {
    setNewNews((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  async function handleSave() {
    setLoading(true);
    if (newNews.title.trim() === "" || newNews.content.trim() === "") {
      toast.error("Title or content can not be blank.");
      return;
    }
    const res = await createNews(newNews);
    if (res.message === "success") {
      toast.success("News added successfully.");
    } else {
      toast.error("Error, please try again.");
    }
    setEditSelected("")
    setNewNews(null);
    getNews();
    setLoading(false);
  }

  async function handleDeleteNew() {
    setNewNews(null);
    setEditSelected("")
  }

  async function handleDeleteNews(id) {
    setLoading(true);
    const res = await deleteNews(id);
    if (res.message === "success") {
      toast.success("News deleted successfully");
      
    } else {
      toast.error("Error, please try again.");
    }
    getNews();
    setLoading(false);
    setEditSelected("")
  }




  return (
    <>
      {loading && <Loader />}
      <div className="w-full">
        <div className="m-3">
          <h1 className="text-lg font-semibold">News</h1>
          <p className="text-xs text-gray-400 font-normal">
            Add and view your latest news here
          </p>
        </div>
        <div className="bg-quarter mx-3 shadow-md rounded-lg p-3 flex justify-between items-center flex-wrap-reverse gap-2">
          <button
            onClick={getNews}
            className="h-8 bg-black text-white text-xs font-medium rounded-full px-3"
          >
            Show all news
          </button>
          <button
            onClick={handleCreateNews}
            className="h-10 w-10 bg-secondary text-white text-xl font-medium rounded-full"
          >
            +
          </button>
        </div>
        <div className="flex flex-col gap-2 py-3 px-3">
          {/* new news */}
          {newNews && (
            <div className="flex bg-quarter rounded-lg p-2 gap-3">
              <div className="flex items-start">
                <div className="text-white bg-secondary p-2 rounded-full">
                  {" "}
                  <FaStar size={16} />
                </div>
              </div>
              <div className="flex flex-col gap-2 w-full">
                <input
                  onChange={handleNewNewsChange}
                  className="rounded-lg text-sm font-medium p-2"
                  type="text"
                  value={newNews?.title || ""}
                  name="title"
                />
                <textarea
                  onChange={handleNewNewsChange}
                  className="w-full rounded-lg h-fit text-sm font-normal p-2"
                  name="content"
                  value={newNews?.content || ""}
                ></textarea>
              </div>
              <div className="flex flex-col gap-2">
                <button
                  onClick={handleSave}
                  className="bg-secondlight rounded-lg px-4 py-2 text-xs font-medium text-black"
                >
                  Save
                </button>
                <button
                  onClick={handleDeleteNew}
                  className="bg-red-100 rounded-lg px-4 py-2 text-xs font-medium text-black"
                >
                  Delete
                </button>
              </div>
            </div>
          )}

          {/* all news */}
          {newsData.length > 0 &&
            newsData.map((news, index) => {
              return (
                <NewsBlock
                  setLoading={setLoading}
                  key={news._id}
                  news={news}
                  handleDeleteNews={handleDeleteNews}
                  editSelected={editSelected}
                  setEditSelected={setEditSelected}
                  getNews={getNews}
                />
              );
            })}

          {/* no news */}
          {newsData.length === 0 && (
            <div className="bg-quarter shadow-md rounded-lg p-2 flex justify-center items-center text-sm font-normal">
              No news available
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default News;
