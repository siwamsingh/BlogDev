import React from 'react'

function CarsoulCard({imageUrl,title,content,link}) {
  return (
    <div className='max-w-screen-xl w-screen'>
      <div className="card card-side bg-base-100 shadow-xl">
  <figure>
    <img
      src={imageUrl || "https://img.freepik.com/free-vector/organic-flat-about-me-concept-illustrated_23-2148909309.jpg?t=st=1729153952~exp=1729157552~hmac=d79d721893744f1673fa6c14af4df5d85b4b2a00266c3c88c2a2fd6d5830b10d&w=740"}
      className=' object-cover aspect-[9:16] sm:aspect-[8/5] my-4 sm:my-8 h-[28vh] sm:h-[30vh] lg:h-[40vh]'
    />
  </figure>
  <div className="card-body my-4 sm:my-8">
    <h2 className="card-title ">{title}</h2>
    <p>{content}</p>
    <div className="card-actions justify-end">
      <button className="btn btn-primary">Read</button>
    </div>
  </div>
</div>
    </div>
  )
}

export default CarsoulCard
