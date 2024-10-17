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
      image: "https://example.com/about-me.jpg",
      content: "My journey as a BTech student and developer."
    },
    {
      title: "Developers Spotify Playlist",
      image: "https://example.com/spotify-playlist.jpg",
      content: "A playlist that powers my coding sessions."
    },
    {
      title: "Vite vs Babel: Bundlers Compared",
      image: "https://example.com/vite-babel.jpg",
      content: "Understanding how modern bundlers work."
    },
    {
      title: "JavaScript vs TypeScript",
      image: "https://example.com/js-ts.jpg",
      content: "Differences between JS and TS in development."
    },
    {
      title: "Mediasoup for Video Calls",
      image: "https://example.com/mediasoup.jpg",
      content: "Building scalable SFU video call apps."
      
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
          />
          </div>
        ))}
      </Carousel>
      </div>
      <div className='flex flex-wrap justify-center sm:justify-start  max-w-screen-xl   mx-auto'>
        {posts.map((post) => (
          <div key={post.$id} className='sm:max-w-[50%] lg:max-w-[33.3%] px-2 py-3 sm:p-3'>
            <PostCard {...post} />
          </div>
        ))}
      </div>
    </div>
  )
}

export default Home