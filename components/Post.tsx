import React from 'react';

function Post({ title, description, createdAt, user = {} }: any) {

  return (
    <React.Fragment>

      <div className="w-full my-2 overflow-hidden bg-white rounded-lg lg:max-w-4xl">

        <div className="w-full px-6 py-4 bg-white rounded shadow-md ring-1 ring-gray-900/10">
          <div>
            <h3 className="text-2xl font-semibold"> {title} </h3>
            <div className="flex items-center mb-4 space-x-2">
              <span className="text-xs text-gray-500"> {createdAt} </span>
              <span className="text-xs text-gray-500">Created by {user.name} </span>
            </div>
            <p className="text-base text-gray-700">{description}</p>
          </div>
        </div>

      </div>

    </React.Fragment>
  )
}

export default Post;