'use client';

import { useState, useEffect } from 'react';

export default function News() {
  const [news, setNews] = useState([]);
  const [articleNum, setArticleNum] = useState(3);

  useEffect(() => {
    fetch(`https://saurav.tech/NewsAPI/top-headlines/category/business/us.json`)
      .then((res) => res.json())
      .then((data) => setNews(data.articles));
  }, []);

  return (
    <div className="text-gray-800 space-y-4 bg-[#f9f2ee] border border-[#e0dcd7] rounded-xl p-4 shadow-sm">
      <h4 className="font-semibold text-lg text-gray-800 border-b border-[#e5e5e5] pb-2">
        What's happening
      </h4>

      {news.slice(0, articleNum).map((article) => (
        <a href={article.url} target="_blank" rel="noopener noreferrer" key={article.url}>
          <div className="flex items-start justify-between gap-3 px-1 py-2 hover:bg-[#f0ece8] transition duration-200 rounded-md">
            <div className="space-y-1">
              <h6 className="text-sm font-medium leading-snug line-clamp-2">{article.title}</h6>
              <p className="text-xs text-gray-500">{article.source.name}</p>
            </div>
            {article.urlToImage && (
              <img
                src={article.urlToImage}
                alt="news"
                width={70}
                className="rounded-md object-cover max-h-[70px]"
              />
            )}
          </div>
        </a>
      ))}

      <button
        onClick={() => setArticleNum(articleNum + 3)}
        className="text-blue-500 hover:text-blue-600 text-sm font-medium"
      >
        Load more
      </button>
    </div>
  );
}
