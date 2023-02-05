import React from "react";
import Post from "../../components/Post";
import { getSession } from 'next-auth/react';
import { GetServerSidePropsContext } from "next";
import dbConnect from "../../lib/dbConnect";
import PostColl from "../../models/post";
import UserColl from "../../models/user";
import { useRouter } from "next/router";
import { Socket } from "socket.io-client";
// import customSocket from "../../socket/client";

interface PostsProps {
  posts: any[];
  user: any;
  loginUserId?: string;
  clientSocket: Socket;
  [x: string]: any;
}

function Posts({ posts: initialPosts = [], user = {}, loginUserId, clientSocket }: PostsProps) {
  const { query: { action }, } = useRouter();

  const [posts, setProps] = React.useState(initialPosts);

  React.useEffect(() => {
    setProps(initialPosts);
  }, [initialPosts])

  React.useEffect(() => {
    if (clientSocket) {
      clientSocket.on('post-watch', (postWatch) => {
        console.log("clientSocket post-watch", { postWatch });
        const { data: data_1 } = postWatch;
        setProps(prev => {
          console.log('setProps', { data_1 });
          const index = prev.findIndex((post) => post._id === data_1._id);
          console.log('setProps', { prev, index });
          if (index === -1) {
            return [data_1, ...posts]
          } else {
            return posts.map((post, iPost) => index === iPost ? data_1 : post);
          }
        });
      })
    }
  }, [clientSocket]);

  console.log("Posts :: ", { loginUserId, action, initialPosts, user });
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
      const posts = await PostColl.find({}).sort({ "createdAt": -1 }).populate("user").lean();
      return {
        props: {
          isLoggedIn: false,
          user: {},
          posts: JSON.parse(JSON.stringify(posts)),
        },
      };
    }

    const { user } = session as any;

    if (action === 'self') {
      let userPromise_1 = await UserColl.findOne({ profileId: user.profileId }).lean();
      let postPromise_1 = await PostColl.find({ user: userPromise_1._id }).sort({ "createdAt": -1 }).populate("user").lean();

      return {
        props: {
          isLoggedIn: true,
          loginUserId: userPromise_1._id.toString(),
          user: JSON.parse(JSON.stringify(userPromise_1)),
          posts: JSON.parse(JSON.stringify(postPromise_1)),
        },
      };

    } else {

      let userPromise = await UserColl.findOne({ profileId: user.profileId }).lean();
      let postPromise = await PostColl.find({}).sort({ "createdAt": -1 }).populate("user").lean();
      return {
        props: {
          isLoggedIn: true,
          loginUserId: userPromise._id.toString(),
          user: JSON.parse(JSON.stringify(userPromise)),
          posts: JSON.parse(JSON.stringify(postPromise)),
        },
      };

    }

  })
}

export default Posts;