import React from 'react';
import { getSession, GetSessionParams } from 'next-auth/react';
import { useEvmNativeBalance } from '@moralisweb3/next';
import Posts from '../components/Posts';
import posts from '../_mocks/posts';

function HomePage(props: any) {
  const address = '0xd8da6bf26964af9d7eed9e03e53415d37aa96045';
  const { data: nativeBalance } = useEvmNativeBalance({ address });

  React.useEffect(() => {
  }, []);

  return (
    <React.Fragment>
      {/* <h3> Wallet: {address} </h3>
      <h3> Native Balance: {nativeBalance?.balance.ether} ETH </h3> */}
      {/* <NewPost /> */}
      <Posts posts={posts} />
      {/* <Profile /> */}
    </React.Fragment>
  );
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
