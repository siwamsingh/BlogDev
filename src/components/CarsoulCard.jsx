import React from 'react'
import { Link } from 'react-router-dom'

function CarsoulCard({ image, title, content, linkUrl }) {
  return (
    <div className='max-w-screen-xl w-screen '>
      <Link to={linkUrl}>
        <div className="card card-side bg-gray-100 dark:bg-gray-900 shadow-xl max-h-[29vh] sm:max-h-screen py-4 sm:py-8">
          <figure className='w-[40%]'>
            <img
              src={image}
              className='object-cover aspect-[9:16] sm:aspect-[8/5] h-[28vh] sm:h-[30vh] lg:h-[40vh]'
            />
          </figure>
          <div className="card-body w-[60%] overflow-hidden ">
            <h2 className="card-title text-xl sm:text-3xl text-gray-900 dark:text-white">
              {title}
            </h2>
            <p className="line-clamp-4 text-sm sm:text-lg text-gray-700 dark:text-gray-300">
              {content}
            </p>
          </div>
        </div>
      </Link>
    </div>
  )
}

export default CarsoulCard
