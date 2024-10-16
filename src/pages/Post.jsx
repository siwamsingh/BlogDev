import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import appwriteService from "../appwrite/config";
import { Button, Container } from "../components";
import parse from "html-react-parser";
import { useSelector } from "react-redux";

export default function Post() {
    const [post, setPost] = useState(null);
    const { slug } = useParams();
    const navigate = useNavigate();

    const userData = useSelector((state) => state.auth.userData);

    const isAuthor = post && userData ? post.userId === userData.$id : false;

    useEffect(() => {
        if (slug) {
            appwriteService.getPost(slug).then((post) => {
                if (post) setPost(post);
                else navigate("/");
            });
        } else navigate("/");
    }, [slug, navigate]);

    const deletePost = () => {
        appwriteService.deletePost(post.$id).then((status) => {
            if (status) {
                appwriteService.deleteFile(post.featuredImage);
                navigate("/");
            }
        });
    };

    return post ? (
        <div className="max-w-screen-lg mx-auto py-8 sm:py-16">
            <Container>
                <div className=" flex justify-center  relative border-b border-black dark:border-white pb-2 mb-8">
                    <img
                        src={appwriteService.getFilePreview(post.featuredImage)}
                        alt={post.title}
                        className="rounded-xl w-full  object-cover aspect-[21/9]"
                    />

                    {isAuthor && (
                        <div className="absolute right-1 top-1 sm:right-6 sm:top-6">
                            <Link to={`/edit-post/${post.$id}`}>
                                <Button bgColor="bg-green-500" className="mr-3 px-2 py-1 sm:px-4 sm:py-2">
                                    Edit
                                </Button>
                            </Link>
                            <Button bgColor="bg-red-500" onClick={deletePost} className="px-2 py-1 sm:px-4 sm:py-2">
                                Delete
                            </Button>
                        </div>
                    )}
                </div>
                <div className="w-full mb-10">
                    <h1 className="text-lg sm:text-2xl font-bold">{post.title}</h1>
                </div>
                <div className="browser-css prose text-sm sm:text-xl sm:leading-9 mx-auto">
                    {parse(post.content)}
                    </div>
            </Container>
        </div>
    ) : null;
}