import React from "react";
import Link from 'next/link';
import Head from 'next/head';
import Image from 'next/image';

function Page500() {
  return (
    <div className="d-flex align-items-center justify-content-center vh-100 text-center">
      <Head>
        <title>500 | Jagadish Chauhan</title>
      </Head>
      <div className="page-500">
        <div className="bg-primary bg-opacity-50 rounded-circle inner-circle">
          <div className="border border-primary border-opacity-50 border-5 rounded-circle icon-set">
            <Image src='/svgs/gears.svg' alt="gears" width={208} height={208} />
          </div>
          <p>500</p>
        </div>
        <span className="d-block text-primary mt-3 mb-1 fs-4">Opps! Internal Server Error!</span>
        <span className="d-block fs-6 mb-2">{"Unfortunately we're having trouble loading the page you are looking for. Please come back in a while."}</span>
        <Link href="/">
          <button type="button" className="btn btn-outline-primary">Visit Home</button>
        </Link>
      </div>
    </div>
  )
}

export default Page500;