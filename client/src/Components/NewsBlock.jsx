import React, { useEffect, useState } from "react";
import { FaStar } from "react-icons/fa";
import { updateNews } from "../api/news";
import toast from "react-hot-toast";


function NewsBlock({
  setLoading,
  news,
  handleDeleteNews,
  editSelected,
  setEditSelected,
  getNews,
}) {
  const [currentNews, setCurrentNews] = useState(news);

  function handleChange(e) {
    setCurrentNews((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  async function handleUpdate() {
    setLoading(true)
    if (currentNews.title.trim() === "" || currentNews.content.trim() === "") {
      toast.error("Title or content can not be blank.");
      return;
    }
    const res = await updateNews(currentNews._id, currentNews);
    if (res.message === "success") {
      toast.success("News updated successfully.");
      
      getNews();
    } else {
      toast.error("Error, please try again.");
    }
    setLoading(false)
    setEditSelected("")
  }

  return (
    <div className="flex bg-quarter rounded-lg p-2 gap-3">
      <div className="flex items-start">
        <div className="text-white bg-secondary p-2 rounded-full">
          {" "}
          <FaStar size={16} />
        </div>
      </div>
      <div className="flex flex-col gap-2 w-full">
        <input
          onChange={handleChange}
          disabled={editSelected === currentNews._id ? false : true}
          className="rounded-lg text-sm font-medium p-2"
          type="text"
          name="title"
          value={currentNews?.title}
        />
        <textarea
          onChange={handleChange}
          disabled={editSelected === currentNews._id ? false : true}
          className="w-full rounded-lg h-fit text-sm font-normal p-2"
          name="content"
          value={currentNews?.content}
        ></textarea>
      </div>
      <div className="flex flex-col gap-2">
        {editSelected === currentNews._id ? (
          <button
            onClick={() => {
              handleUpdate(currentNews._id);
            }}
            className="bg-secondlight rounded-lg px-4 py-2 text-xs font-medium text-black"
          >
            Save
          </button>
        ) : (
          <button
            onClick={() => {
              setEditSelected(currentNews._id);
            }}
            className="bg-secondlight rounded-lg px-4 py-2 text-xs font-medium text-black"
          >
            Edit
          </button>
        )}

        <button
          onClick={() => {
            handleDeleteNews(currentNews._id);
          }}
          className="bg-red-100 rounded-lg px-4 py-2 text-xs font-medium text-black"
        >
          Delete
        </button>
      </div>
    </div>
  );
}

export default NewsBlock;
