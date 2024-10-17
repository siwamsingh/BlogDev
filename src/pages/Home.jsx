import React, { useEffect, useState } from 'react'
import appwriteService from "../appwrite/config";
import { Container, PostCard } from '../components'
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import CarsoulCard from '../components/CarsoulCard';

function Home() {
  const [posts, setPosts] = useState([])

  useEffect(() => {
    appwriteService.getPosts().then((posts) => {
      if (posts) {
        setPosts(posts.documents)
      }
    })
  }, [])

  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 1,
      slidesToSlide: 1 // optional, default to 1.
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 1,
      slidesToSlide: 1 // optional, default to 1.
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
      slidesToSlide: 1 // optional, default to 1.
    }
  };

  const carsoulData = [
    {
      title: "About Me: Siwam Kumar Singh",
      image: `${import.meta.env.VITE_APPWRITE_URL}/storage/buckets/${import.meta.env.VITE_APPWRITE_BUCKET_ID}/files/6710fd8c0029a68a76a7/view?project=${import.meta.env.VITE_APPWRITE_PROJECT_ID}`,
      content: "My journey as a BTech student and developer. I started my BTech journey in 2022 at Netaji Subhas Engineering College, where I've been honing my skills in software development. Passionate about building scalable applications and continuously learning about new technologies, I'm eager to make a positive impact in the tech world.",
      linkUrl: "http://localhost:5173/post/my-portfolio"
    },
    {
      title: "Developers Spotify Playlist",
      image: `${import.meta.env.VITE_APPWRITE_URL}/storage/buckets/${import.meta.env.VITE_APPWRITE_BUCKET_ID}/files/6710fa8800261fc7d270/view?project=${import.meta.env.VITE_APPWRITE_PROJECT_ID}`,
      content: "A playlist that powers my coding sessions. Music is an essential part of my coding routine, and this playlist includes tracks that help me stay focused and productive. From chill beats to energetic tunes, it's perfect for different stages of development—from brainstorming ideas to solving complex problems.",
      linkUrl: "http://localhost:5173/post/coding-with-the-right-vibes"
    },
    {
      title: "My projects",
      image: `${import.meta.env.VITE_APPWRITE_URL}/storage/buckets/${import.meta.env.VITE_APPWRITE_BUCKET_ID}/files/6710fd35001579e17876/view?project=${import.meta.env.VITE_APPWRITE_PROJECT_ID}`,
      content: "As a developer, I’ve had the opportunity to work on diverse projects that have not only honed my technical skills but also ignited my passion for problem-solving and innovation. Here’s an overview of my key projects, each reflecting a different aspect of my journey in the tech world.",
      linkUrl: "http://localhost:5173/post/my-projects-and-acheivement"
    }
  ];
  
  

  if (posts.length === 0) {
    return (
      <div className="w-full py-8 mt-4 text-center">
        <Container>
          <div className="flex flex-wrap min-h-screen">
            <div className="p-2 w-full">
              <h1 className="text-2xl font-bold hover:text-gray-500">
                Login to read posts
              </h1>
            </div>
          </div>
        </Container>
      </div>
    )
  }
  return (
    <div className='w-full min-h-screen '>
      <div className=' sm:px-8 '>
      <Carousel
        className="w-full height-24 my-4 sm:my-8  "
        swipeable={true}
        draggable={false}
        responsive={responsive}
        infinite={true}
        autoPlay={true}
        pauseOnHover={false}
        autoPlaySpeed={2500}
        keyBoardControl={true}
        transitionDuration={3500}
        arrows={false}
        customTransition="transform 2000ms ease-in-out"
        containerClass="carousel-container"
      >
        {carsoulData.map((item, index) => (
          <div className='flex justify-center'>
          <CarsoulCard
            key={index + item.title}
            title={item.title}
            image={item.image}
            content={item.content}
            linkUrl={item.linkUrl}
          />
          </div>
        ))}
      </Carousel>
      </div>
      <div className='flex flex-wrap justify-center sm:justify-start max-w-screen-xl mx-auto'>
  {posts.map((post) => (
    <div
      key={post.$id}
      className='sm:max-w-[50%] lg:max-w-[33.3%] px-2 py-3 sm:p-3 relative'
    >
      <PostCard {...post} />
      <div className="absolute inset-0 pointer-events-none">
        {/* Light theme bottom inner shadow */}
        <div className="absolute inset-x-0 bottom-0 h-3 shadow-[inset_0_-10px_10px_0_rgba(0,0,0,0.1)] dark:shadow-[inset_0_-10px_10px_0_rgba(255,255,255,0.1)]"></div>
      </div>
    </div>
  ))}
</div>

    </div>
  )
}

export default Home