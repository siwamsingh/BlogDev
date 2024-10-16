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
    // <div>
    //   
    //     <div className="max-w-sm mx-auto lg:max-w-2xl bg-white dark:bg-gray-900 hover:scale-105 transition-all ease-in-out duration-100 shadow-md rounded-lg  flex flex-col lg:flex-row">
    //       <img
    //         className="w-full lg:w-1/2 object-cover  rounded-md transition-all ease-in-out duration-100"
    //         src={service.getFilePreview(featuredImage)}
    //         alt={title}
    //       />

    //       <div className="p-6 flex flex-col justify-between">
    //         <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
    //           {title}
    //         </h2>
    //         <p className="text-gray-700 dark:text-gray-400 mb-6  break-words break-all">
    //           {processedContent}
    //         </p>
    //         <button className="btn btn-primary w-full lg:w-auto">
    //           Read Now
    //         </button>
    //       </div>
    //     </div>
    //   </Link>

    // </div>

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
        <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4 break-all">
          {title}
        </h2>
        <p className="text-gray-700 dark:text-gray-400 mb-6 break-all">
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
