import React from "react";
import Post from "../../components/Post";
import { getSession } from 'next-auth/react';
import { GetServerSidePropsContext } from "next";
import dbConnect from "../../lib/dbConnect";
import PostColl from "../../models/post";
import UserColl from "../../models/user";
import { useRouter } from "next/router";
import customSocket from "../../socket/client";

interface PostsProps {
  posts: any[];
  user: any;
  loginUserId?: string;
}

function Posts({ posts: initialPosts = [], user = {}, loginUserId }: PostsProps) {
  const { query: { action }, } = useRouter();

  const [posts, setProps] = React.useState(initialPosts);

  React.useEffect(() => {

    customSocket().then((socket) => {
      socket.on('post-watch', ({ data: [data_1] }) => {
        console.log('post-watch', { data_1 });
        setProps(prev => {
          const index = prev.findIndex((post) => post._id === data_1._id);
          if (index === -1) {
            return [data_1, ...posts]
          } else {
            return posts.map((post, iPost) => index === iPost ? data_1 : post);
          }
        });
      })
    })

    // Specify how to clean up after this effect:
    return function cleanup() {
      console.log('socket cleanup');
      customSocket().then((socket) => {
        socket.on('disconnect', () => {
          console.log('socket disconnect');
        })
      })
    };

  }, [action]);

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
    console.log('Posts session user ', { action, user, profileId: user.profileId });

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