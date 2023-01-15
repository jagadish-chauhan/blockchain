import React from "react";
import { useForm, useFormState } from 'react-hook-form';

interface IPost {
  title: string;
  description: string;
}

function Profile() {

  const { register, setValue, handleSubmit, control } = useForm<IPost>();
  const { errors, dirtyFields } = useFormState({ control });

  const onSubmit = (data: any, e: any) => console.log(data, e);
  const onError = (errors: any, e: any) => {
    console.log(errors, e)
  };

  console.log("newpost state", { errors, dirtyFields });
  return (
    <React.Fragment>
      <div className="flex flex-col items-center min-h-screen pt-9 bg-gray-100">
        <form onSubmit={handleSubmit(onSubmit, onError)}>
          <div className="overflow-hidden shadow sm:rounded-md min-w-[80vw] max-w-[768px]">
            <h1 className="text-2xl text-left tracking-wide leading-10 m-2 font-semibold">
              Update Profile
            </h1>
            <div className="bg-white px-4 py-5 sm:p-6">
              <div className="grid grid-cols-12 gap-6">

                <div className="col-span-9 sm:col-span-9">
                  <label htmlFor="first-name" className="block text-sm font-medium text-gray-700">
                    Profile ID
                  </label>
                  <input
                    type="text"
                    name="first-name"
                    id="first-name"
                    disabled
                    readOnly
                    value={"0xd1a157da050db3c09ae9afd5c5e9dd3713b04179ebd5232e3d11d178a230d350"}
                    autoComplete="given-name"
                    className="mt-1 bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 cursor-not-allowed dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  />
                </div>

                <div className="col-span-3 sm:col-span-3">
                  <label htmlFor="first-name" className="block text-sm font-medium text-gray-700">
                    ChainID
                  </label>
                  <input
                    type="text"
                    name="first-name"
                    id="first-name"
                    disabled
                    readOnly
                    aria-label="disabled input"
                    value={"1934"}
                    autoComplete="given-name"
                    className="mt-1 bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 cursor-not-allowed dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  />
                </div>


                <div className="col-span-12 sm:col-span-6">
                  <label htmlFor="first-name" className="block text-sm font-medium text-gray-700">
                    First name
                  </label>
                  <input
                    type="text"
                    name="first-name"
                    id="first-name"
                    autoComplete="given-name"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  />
                </div>

                <div className="col-span-12 sm:col-span-6">
                  <label htmlFor="last-name" className="block text-sm font-medium text-gray-700">
                    Last name
                  </label>
                  <input
                    type="text"
                    name="last-name"
                    id="last-name"
                    autoComplete="family-name"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  />
                </div>

                <div className="col-span-6 sm:col-span-8">
                  <label htmlFor="email-address" className="block text-sm font-medium text-gray-700">
                    Email address
                  </label>
                  <input
                    type="text"
                    name="email-address"
                    id="email-address"
                    autoComplete="email"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  />
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

export default Profile;