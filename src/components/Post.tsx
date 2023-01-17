import React from 'react';
import momentTimezone from 'moment-timezone';
import { useRouter } from 'next/router';
import { IPost } from '@/types/type';

function Post({ title, description, createdAt, user = {}, loginUserId, _id }: IPost & { loginUserId?: string }) {

  const { push } = useRouter();

  function onUpdatePost() {
    return push(`/post/${_id}`);
  }

  return (
    <React.Fragment>
      <div className="w-full my-2 overflow-hidden bg-white rounded-lg lg:max-w-4xl">
        <div className="w-full px-6 py-4 bg-white rounded shadow-md ring-1 ring-gray-900/10">
          <div>
            <div className="flex justify-between">
              <h3 className="text-2xl font-semibold"> {title} </h3>
              {loginUserId === user?._id &&
                <button onClick={onUpdatePost} type="button" className="px-3 py-2 text-xs font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                  Edit
                </button>
              }
            </div>
            <div className="flex items-center mb-4 space-x-2">
              <span className="text-xs text-gray-500"> {momentTimezone(createdAt).format('MMMM Do YYYY, h:mm:ss A')} </span>
              <span className="text-xs text-gray-500">Created by {user.first_name} {user.last_name} </span>
            </div>
            <p className="text-base text-gray-700">{description}</p>
          </div>
        </div>
      </div>
    </React.Fragment>
  )
}

export default Post;