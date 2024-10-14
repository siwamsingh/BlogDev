import React, { useEffect, useState } from "react";
import service from "../appwrite/config";
import { Link } from "react-router-dom";
import parse from "html-react-parser";

function PostCard({ $id, title, featuredImage, content }) {

  const [processedContent, setProcessedContent] = useState('');

  function removeHtmlTags(str) {
    // Regex to match all HTML tags
    const tagPattern = /<\/?[^>]+(>|$)/g;

    // Replace all tags with an empty string
    return str.replace(tagPattern, '');
  }

  useEffect(() => {
    const cleanString = removeHtmlTags(content);
    setProcessedContent(cleanString)
  }, [])


  return (
    <div>
      <Link to={`/post/${$id}`}>
        <div className="max-w-sm mx-auto lg:max-w-2xl bg-white dark:bg-gray-900 hover:scale-105 transition-all ease-in-out duration-100 shadow-md rounded-lg  flex flex-col lg:flex-row">
          <img
            className="w-full lg:w-1/2 object-cover hover:opacity-60 rounded-md transition-all ease-in-out duration-100"
            src={service.getFilePreview(featuredImage)}
            alt={title}
          />

          <div className="p-6 flex flex-col justify-between">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              {title}
            </h2>
            <p className="text-gray-700 dark:text-gray-400 mb-6  break-words break-all">
              {processedContent}
            </p>
            <button className="btn btn-primary w-full lg:w-auto">
              Read Now
            </button>
          </div>
        </div>
      </Link>

    </div>
  );
}

export default PostCard;
