import React from "react";
import { useForm, useFormState } from 'react-hook-form';

interface IPost {
  title: string;
  description: string;
}

function NewPost() {

  const { register, setValue, handleSubmit, control } = useForm<IPost>();
  const { errors, dirtyFields } = useFormState({ control });

  const onSubmit = (data: any, e: any) => console.log(data, e);
  const onError = (errors: any, e: any) => {
    console.log(errors, e)
  };

  console.log("newpost state", { errors, dirtyFields });
  return (
    <React.Fragment>
      <div className="mt-6 flex flex-col items-center min-h-screen pt-6 bg-gray-100">
        <form onSubmit={handleSubmit(onSubmit, onError)}>
          <div className="overflow-hidden shadow sm:rounded-md w-[80vw] max-w-screen-sm">
            <h1 className="text-2xl text-left tracking-wide leading-10 mx-2 font-semibold">
              New Post
            </h1>
            <div className="bg-white px-4 py-5 sm:p-6">
              <div className="grid grid-cols-12 gap-6">
                <div className="col-span-12">
                  <label htmlFor="title" className="block text-sm font-medium text-gray-700">
                    Title
                  </label>
                  <input
                    type="text"
                    name="title"
                    id="title"
                    // autoComplete="description"
                    placeholder="Title"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    {...register("title", { required: true })}
                  />
                  {errors.title && <p className="text-xs text-red-600">Required</p>}
                </div>

                <div className="col-span-12">
                  <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                    Description
                  </label>
                  <textarea
                    id="description"
                    name="description"
                    rows={3}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    placeholder="Description"
                    defaultValue={''}
                    {...register("description", { required: true })}
                  />
                  {errors.description && <p className="text-xs text-red-600">Required</p>}
                </div>
              </div>
            </div>
            <div className="bg-gray-50 px-4 py-3 text-right sm:px-6">
              <button
                type="submit"
                className="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
              >
                Save
              </button>

              <button
                type="button"
                className="mx-1 text-blue-700 hover:text-white border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-md text-sm px-4 py-2 text-center mr-2 mb-2 dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:hover:bg-blue-600 dark:focus:ring-blue-800"
              >
                Cancel
              </button>
            </div>
          </div>
        </form>
      </div>
    </React.Fragment >
  )

}

export default NewPost;