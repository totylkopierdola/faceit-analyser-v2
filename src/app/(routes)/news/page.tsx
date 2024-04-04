"use client";
import { useEffect, useState } from "react";
import BackgroundShapes from "@/components/BackgroundShapes";
import axios from "axios";

const NewsPage = () => {
  const [news, setNews] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [newsPerPage] = useState(6);

  useEffect(() => {
    const getNews = async () => {
      try {
        const response = await axios.get(
          `https://hltv-api.vercel.app/api/news.json`
        );
        setNews(response.data);
      } catch (error) {
        console.error("Error fetching news:", error);
      }
    };

    getNews();
  }, []);

  // Get current news
  const indexOfLastNews = currentPage * newsPerPage;
  const indexOfFirstNews = indexOfLastNews - newsPerPage;
  const currentNews = news.slice(indexOfFirstNews, indexOfLastNews);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="relative isolate overflow-hidden bg-gray-900 sm:h-[calc(100vh-4rem)]">
      <BackgroundShapes loader color="bg-blue-500" opacity="opacity-5" />
      <div className="bg-transparent py-24 sm:pt-10 pt-12 relative ">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl lg:mx-0">
            <h2
              onClick={() => console.log(news)}
              className="text-3xl font-bold tracking-tight text-gray-50 sm:text-4xl cursor-pointer"
            >
              HLTV News
            </h2>
            <p className="mt-2 text-lg leading-8 text-gray-50">
              Learn how to grow your business with our expert advice.
            </p>
          </div>
          <div className="mx-auto mt-2 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-6 border-t border-gray-200 pt-10 sm:pt-4 lg:mx-0 lg:max-w-none lg:grid-cols-2">
            {currentNews.map((post, index) => (
              <article
                key={index}
                className="flex max-w-xl flex-col justify-start bg-slate-800 p-6 rounded-md "
              >
                <div className="flex items-center gap-x-4 text-xs">
                  <time dateTime={post.time} className="text-gray-500">
                    {new Date(post.time).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                    })}
                  </time>
                </div>
                <div className="group relative">
                  <h3 className="mt-3 text-lg font-semibold leading-6 text-gray-50 group-hover:text-gray-50">
                    <a
                      href={post.link}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {post.title}
                    </a>
                  </h3>
                  <p className="mt-5 line-clamp-3 text-sm leading-6 text-gray-50">
                    {post.description}
                  </p>
                </div>
              </article>
            ))}
          </div>
          {/* Pagination */}
          <div className="flex justify-center mt-8">
            {[...Array(Math.ceil(news.length / newsPerPage)).keys()].map(
              (number) => (
                <button
                  key={number}
                  onClick={() => paginate(number + 1)}
                  className={`${
                    currentPage === number + 1
                      ? "bg-blue-500 text-white"
                      : "bg-gray-700 text-gray-300"
                  } px-4 py-2 mx-1 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500`}
                >
                  {number + 1}
                </button>
              )
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewsPage;
