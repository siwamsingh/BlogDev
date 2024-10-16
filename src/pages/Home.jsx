import React, {useEffect, useState} from 'react'
import appwriteService from "../appwrite/config";
import {Container, PostCard} from '../components'


function Home() {
    const [posts, setPosts] = useState([])

    useEffect(() => {
        appwriteService.getPosts().then((posts) => {
            if (posts) {
                setPosts(posts.documents)            }
        })
    }, [])
  
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
        <div className='w-full min-h-screen'>
                <div className='flex flex-wrap max-w-screen-xl   mx-auto'>
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