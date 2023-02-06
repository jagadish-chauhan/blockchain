import React from "react";
import Post from "./Post";

interface PostsProps {
  posts: any[];
}

function Posts({ posts = [] }: PostsProps) {

  return (
    <React.Fragment>
      <div className="flex flex-col items-center py-20 bg-gray-100  sm:justify-center sm:pt-0">
        <div className='mt-4' ></div>
        {posts.map((post) => <Post key={post.title}  {...post} />)}
      </div>
    </React.Fragment>
  )

}

export default Posts;