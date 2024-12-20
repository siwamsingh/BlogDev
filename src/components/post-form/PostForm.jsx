import React, { useCallback, useState } from "react";
import { useForm } from "react-hook-form";
import { Button, Input, RTE, Select } from "..";
import appwriteService from "../../appwrite/config";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

export default function PostForm({ post }) {
  const { register, handleSubmit, watch, setValue, control, getValues } = useForm({
    defaultValues: {
      title: post?.title || "",
      slug: post?.$id || "",
      content: post?.content || "",
      status: post?.status || "active",
    },
  });

  const navigate = useNavigate();
  const userData = useSelector((state) => state.auth.userData);

  const submit = async (data) => {
    if (post) {
      const file = data.image[0] ? await appwriteService.uploadFile(data.image[0]) : null;

      if (file) {
        appwriteService.deleteFile(post.featuredImage);
      }

      const dbPost = await appwriteService.updatePost(post.$id, {
        ...data,
        featuredImage: file ? file.$id : undefined,
      });

      if (dbPost) {
        navigate(`/post/${dbPost.$id}`);
      }
    } else {
      const file = await appwriteService.uploadFile(data.image[0]);

      if (file) {
        const fileId = file.$id;
        data.featuredImage = fileId;
        const dbPost = await appwriteService.createPost({ ...data, userId: userData.$id });

        if (dbPost) {
          navigate(`/post/${dbPost.$id}`);
        }
      }
    }
  };

  const slugTransform = useCallback((value) => {
    if (value && typeof value === "string")
      return value
        .trim()
        .toLowerCase()
        .replace(/[^a-zA-Z\d\s]+/g, "-")
        .replace(/\s/g, "-");

    return "";
  }, []);

  const [titleLength, setTitleLength] = useState(0)
  const [contentLength, setContentLength] = useState(0)
  
 
  React.useEffect(() => {
    const subscription = watch((value, { name }) => {
      if (name === "title") {
        setValue("slug", slugTransform(value.title), { shouldValidate: true });
        setTitleLength(value.title.length);
      }
    });

    return () => subscription.unsubscribe();
  }, [watch, slugTransform, setValue]);

  React.useEffect(() => {
    const subscription = watch((value, { name }) => {
      if (name === "content") {
        console.log(value.content.length);
        
        setContentLength(value.content.length);
      }
    });
    
    return () => subscription.unsubscribe();
  }, [getValues("content")]);

  return (
    <form onSubmit={handleSubmit(submit)} className="flex flex-wrap">
      <div className="w-full lg:w-2/3 gap-y-4 lg:gap-0 px-2 mb-6">

        <Input
          label="Title :"
          placeholder="Title"
          className="mb-4"
          curLimit={titleLength}
          limit={36}
          {...register("title", { required: true })}
        />

        <Input
          label="Slug :"
          placeholder="Slug"
          className="mb-4"
          {...register("slug", { required: true })}
          onInput={(e) => {
            setValue("slug", slugTransform(e.currentTarget.value), { shouldValidate: true });
          }}
        />
        <RTE label="Content :" name="content" control={control} value={getValues("content")} curLimit={contentLength} limit={10000} />
      </div>
      <div className="w-full  lg:w-1/3 px-2">
        <Input
          label="Featured Image :"
          type="file"
          className="mb-6"
          accept="image/png, image/jpg, image/jpeg, image/gif"
          {...register("image", { required: !post })}
          maxSize={"2mb"}
        />
        {post && (
          <div className="w-full mb-4">
            <img
              src={appwriteService.getFilePreview(post.featuredImage)}
              alt={post.title}
              className="rounded-lg"
            />
          </div>
        )}
        <Select
          options={["active", "inactive"]}
          label="Status"
          className="mb-6"
          {...register("status", { required: true })}
        />
        <Button disabled={true} type="submit" bgColor={post ? "bg-green-500" : undefined} className="  w-fit md:w-full mx-auto px-4 md:px-0 ">
          <div className=" mx-auto w-fit md:w-full py-2">
            {post ? "Update" : "Submit"}
          </div>
        </Button>
        
      </div>
    </form>
  );
}