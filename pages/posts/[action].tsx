import React from "react";
import Post from "../../components/Post";
import { getSession } from 'next-auth/react';
import { GetServerSidePropsContext } from "next";
import dbConnect from "../../lib/dbConnect";
import PostColl from "../../models/post";
import UserColl from "../../models/user";
import { useRouter } from "next/router";
interface PostsProps {
  posts: any[];
  user: any;
  loginUserId?: string;
}

function Posts({ posts = [], user = {}, loginUserId }: PostsProps) {

  const { query: { action }, } = useRouter();

  console.log("Posts entry ", posts, user);
  return (
    <React.Fragment>
      <div className="flex flex-col items-center py-20 bg-gray-100  sm:justify-center sm:pt-0">
        <div className='mt-4' ></div>
        {posts.map((post) => <Post key={post._id} {...post} loginUserId={loginUserId} user={action === "self" ? user : post.user} />)}
      </div>
    </React.Fragment>
  )
}

// https://nextjs.org/docs/api-reference/data-fetching/get-server-side-props
export async function getServerSideProps(context: GetServerSidePropsContext) {
  const session = await getSession(context);
  const { action } = context.query;

  if (!session && action === 'self') {
    return {
      redirect: {
        destination: '/posts/list',
        permanent: false,
      },
    }
  }

  return dbConnect().then(async () => {

    if (!session) {
      const posts = await PostColl.find({}).sort("createdAt").populate("user").lean();
      return {
        props: {
          isLoggedIn: false,
          user: {},
          posts: JSON.parse(JSON.stringify(posts)),
        },
      };
    }


    const { user } = session as any;
    console.log('Posts session user ', { action, user, profileId: user.profileId });

    let userPromise = UserColl.findOne({ profileId: user.profileId });
    let postPromise = {};

    if (action === 'self') {
      userPromise = UserColl.findOne({ profileId: user.profileId }).sort("createdAt").populate('posts').lean();
    } else {
      postPromise = PostColl.find({}).sort("createdAt").populate("user").lean();
    }

    // const userPromise = UserColl.findOne({ profileId: user.profileId }).populate('posts');
    // const postPromise = action === 'self' ? {} : PostColl.find({}).lean();

    const [user_1, post] = await Promise.all([userPromise, postPromise]);
    console.log('session user resp ', { user, post });
    return {
      props: {
        isLoggedIn: true,
        loginUserId: user_1._id.toString(),
        user: JSON.parse(JSON.stringify(user_1)),
        posts: action === 'self' ? JSON.parse(JSON.stringify(user_1.posts)) : JSON.parse(JSON.stringify(post)),
      },
    };
  })
}

export default Posts;