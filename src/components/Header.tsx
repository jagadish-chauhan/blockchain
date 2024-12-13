import React, { useState } from 'react'
import Link from 'next/link';
import Logouts from './Signout';
import Logout from './Logged';
import { useRouter } from 'next/router';
import Image from 'next/image';

const protectedNavigation = [
  { name: 'Posts', href: '/posts/list', current: true },
  { name: 'My Posts', href: '/posts/self', current: false },
  { name: 'New Post', href: '/post/new', current: false },
  { name: 'Profile', href: '/profile', current: false }
]

interface NavigationState {
  name: string;
  href: string,
  current: boolean;
  [x: string]: any;
}

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ')
}

function Header({ isLoggedIn, user = {} }: any) {
  const router = useRouter();
  const [navigation, setNavigation] = useState<NavigationState[]>([]);

  React.useEffect(() => {
    let currNavigation: NavigationState[] = [];
    if (isLoggedIn) {
      const { pathname, query: { action } } = router;
      currNavigation = protectedNavigation.map((nv: any) => {
        nv.current = false;
        if (pathname.includes('profile') && nv.name === "Profile") {
          return { ...nv, current: true };
        } else if (pathname.includes('post/') && action === 'new' && nv.name === "New Post") {
          return { ...nv, current: true };
        } else if (pathname.includes('posts/') && action === 'list' && nv.name === "Posts") {
          return { ...nv, current: true };
        } else if (pathname.includes('posts/') && action === 'self' && nv.name === "My Posts") {
          return { ...nv, current: true };
        } else {
          return nv;
        }
      });
    }
    setNavigation(() => currNavigation);
  }, [router, isLoggedIn])

  let username = user.first_name + " " + user.last_name;

  return (
    <nav className="bg-white px-2 sm:px-4 py-2.5 dark:bg-gray-900 fixed w-full top-0 left-0 border-b border-gray-200 dark:border-gray-600">
      <div className="container flex flex-wrap items-center justify-between mx-auto">
        <a href="https://flowbite.com/" className="flex items-center">
          <Image loader={() => "https://flowbite.com/docs/images/logo.svg"} src="https://flowbite.com/docs/images/logo.svg" width={24} height={24} className="h-6 mr-3 sm:h-9" alt="Flowbite Logo" />
          <span className="self-center text-xl font-semibold whitespace-nowrap dark:text-white"> Jagadish </span>
        </a>
        <div className="flex md:order-2">
          {isLoggedIn ? <Logout username={username} /> : <Logouts />}
          <button data-collapse-toggle="navbar-sticky" type="button" className="inline-flex items-center p-2 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" aria-controls="navbar-sticky" aria-expanded="false">
            <span className="sr-only">Open main menu</span>
            <svg className="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd"></path></svg>
          </button>
        </div>
        <div className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1" id="navbar-sticky">
          <ul className="flex flex-col p-4 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 md:mt-0 md:text-sm md:font-medium md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
            {navigation.map((item) => (
              <li key={item.name}>
                <Link
                  key={item.name}
                  href={item.href}
                  className={classNames(
                    item.current ? 'text-white bg-blue-700 md:bg-transparent md:text-blue-700 md:p-0 dark:text-white' : 'text-gray-700 hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-white dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700',
                    'block py-2 pl-3 pr-4 rounded'
                  )}
                  aria-current={item.current ? 'page' : undefined}
                >
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </nav>
  )
}

export default Header