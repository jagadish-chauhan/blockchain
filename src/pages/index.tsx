import React from 'react';
import { getSession, GetSessionParams } from 'next-auth/react';

function HomePage() {
  React.useEffect(() => {
  }, []);
  return (<></>);
}

// https://nextjs.org/docs/api-reference/data-fetching/get-server-side-props
export async function getServerSideProps(context: GetSessionParams) {
  const session = await getSession(context);
  if (!session) {
    return {
      redirect: {
        destination: '/posts/list',
        permanent: false,
      },
    };
  }
  return {
    redirect: {
      destination: '/posts/self',
      permanent: false,
    },
  };
}

export default HomePage;
