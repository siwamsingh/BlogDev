import React from "react";
import service from "../appwrite/config";

function PostCard({ $id, title, featuredImage }) {
  return (
    <div>
      <Link to={`/post/${$id}`}>
        <div className="w-full bg-gray100 rounded-xl p-4 ">
          <div className="w-full justify-center mb-4">
            <img
              src={service.getFilePreview(featuredImage)}
              alt={title}
              className="rounded-xl "
            />
          </div>
          <h2>{title}</h2>
        </div>
      </Link>
    </div>
  );
}

export default PostCard;
