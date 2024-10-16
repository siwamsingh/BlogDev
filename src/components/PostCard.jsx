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


    <div className="h-[100%] mx-auto bg-white dark:bg-gray-900 shadow-md rounded-lg transition-transform duration-300 ease-in-out hover:scale-[102%] hover:opacity-80">
      <Link to={`/post/${$id}`}>
      <figure className="relative">
        <img
          className="w-full h-44 sm:h-64 object-cover  rounded-t-lg"
          src={service.getFilePreview(featuredImage)}
          alt={title}
        />
        <div className="badge badge-secondary absolute top-2 right-2">NEW</div>
      </figure>
      <div className="p-6">
        <h2 className="text-lg sm:text-2xl font-semibold text-gray-900 dark:text-white mb-4 break-all">
          {title}
        </h2>
        <p className="text-sm sm:text-base text-gray-700 dark:text-gray-400 mb-6 break-all">
          {processedContent.slice(0, 70)}...
        </p>
        <div className="flex justify-end gap-2">
          <div className="badge badge-outline">tech</div>
        </div>
      </div>
      </Link>
    </div>
  );
}

export default PostCard;
