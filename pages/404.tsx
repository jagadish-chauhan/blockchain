import React from 'react';
import Link from 'next/link';
import Head from 'next/head';

function Page404() {
  return (
    <div className="d-flex align-items-center justify-content-center vh-100">
      <Head>
        <title>404 | Jagadish Chauhan</title>
      </Head>
      <div className="text-center">
        <h1 className="display-1 fw-bold">404</h1>
        <p className="fs-2"> <span className="text-danger">Opps!</span> Page not found.</p>
        <p className="lead">
          {"The page you're looking for doesn't exist."}
        </p>
        <Link href="/">
          <button type="button" className="btn btn-primary">Go Home</button>
        </Link>
      </div>
    </div>
  )
}

export default React.memo(Page404);