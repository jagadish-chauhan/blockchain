import React from 'react';

function Post({ }: any) {

  return (
    <React.Fragment>
      <div>
        <div className="flex flex-col items-center min-h-screen pt-6 bg-gray-100 sm:justify-center sm:pt-0">
          <div className="w-full px-16 py-20 mt-6 overflow-hidden bg-white rounded-lg lg:max-w-4xl">
            <div className="mb-4">
              <h1 className="font-serif text-3xl font-bold underline decoration-gray-400"> Post Show</h1>
            </div>
            <div className="w-full px-6 py-4 bg-white rounded shadow-md ring-1 ring-gray-900/10">
              <form method="POST" action="#">
                <div>
                  <h3 className="text-2xl font-semibold">Tailwind CSS 3 Post Show Title</h3>
                  <div className="flex items-center mb-4 space-x-2">
                    <span className="text-xs text-gray-500"> 20/12/22</span><span className="text-xs text-gray-500">Created by
                      Admin</span>
                  </div>
                  <p className="text-base text-gray-700">Lorem ipsum dolor sit amet consectetur adipisicing elit. Adipisci
                    aliquid numquam sequi! Commodi enim laborum illo quaerat illum quidem quam ea itaque in, nulla quis
                    vero qui cupiditate debitis. Ut. Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsam quia
                    rerum qui autem vel? Veniam laborum omnis, delectus ab repellat labore tempora, id sit ipsum suscipit,
                    consectetur neque tenetur quam?</p>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>

    </React.Fragment>
  )
}

export default Post;