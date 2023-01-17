import React from "react";
import { useForm, useFormState } from 'react-hook-form';
import dbConnect from "../../utils/dbConnect";
import { getSession } from 'next-auth/react';
import User from "../../models/user";
import { toast } from 'react-toastify';
import { GetServerSidePropsContext } from "next";
import axiosInstance from "../../utils/axiosInstance";
import { useRouter } from "next/router";

interface TProfile {
  first_name: string;
  last_name: string;
  email_address: string;
  [x: string]: any;
}

function Profile({ user }: any) {

  const { back, push } = useRouter();

  const { register, setValue, handleSubmit, control } = useForm<TProfile>();
  const { errors } = useFormState({ control });

  function onCancel() {
    return back();
  }

  function onSubmit(data: any, e: any) {
    toast('User has been updated.');
    return axiosInstance.patch(`/api/users/${user.profileId}`, data).then(() => push("/"));
  };
  const onError = (errors: any, e: any) => {
    console.log(errors, e)
  };

  React.useEffect(() => {
    if (user) {
      setValue("first_name", user.first_name);
      setValue("last_name", user.last_name);
      setValue("email_address", user.email_address);
    }
  }, [user, setValue]);

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
                    name="first_name"
                    id="first_name"
                    disabled
                    readOnly
                    value={"0xd1a157da050db3c09ae9afd5c5e9dd3713b04179ebd5232e3d11d178a230d350"}
                    autoComplete="first_name"
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
                  <label htmlFor="first_name" className="block text-sm font-medium text-gray-700">
                    First name
                  </label>
                  <input
                    type="text"
                    id="first_name"
                    autoComplete="first_name"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    {...register("first_name", { required: true })}
                  />
                  {errors.first_name && <p className="text-xs text-red-600">Required</p>}
                </div>

                <div className="col-span-12 sm:col-span-6">
                  <label htmlFor="last_name" className="block text-sm font-medium text-gray-700">
                    Last name
                  </label>
                  <input
                    type="text"
                    id="last_name"
                    autoComplete="last_name"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    {...register("last_name", { required: true })}
                  />
                  {errors.last_name && <p className="text-xs text-red-600">Required</p>}
                </div>

                <div className="col-span-6 sm:col-span-8">
                  <label htmlFor="email_address" className="block text-sm font-medium text-gray-700">
                    Email address
                  </label>
                  <input
                    type="email"
                    id="email_address"
                    autoComplete="email"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    {...register("email_address", { required: true })}
                  />
                  {errors.email_address && <p className="text-xs text-red-600">Required</p>}
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
                onClick={onCancel}
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

// https://nextjs.org/docs/api-reference/data-fetching/get-server-side-props
export async function getServerSideProps(context: GetServerSidePropsContext): Promise<any> {
  const session = await getSession(context);
  if (!session) {
    return {
      redirect: {
        destination: '/posts/list',
        permanent: false,
      },
    }
  }

  return await dbConnect().then(() => {
    const { user } = session as any;
    return User
      .findOne({ profileId: user.profileId })
      .lean()
      .then((userResp) => {
        return {
          props: {
            isLoggedIn: true,
            user: JSON.parse(JSON.stringify(userResp)),
          },
        }
      });
  });
}


export default Profile;