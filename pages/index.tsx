import React from 'react';
import { getSession, GetSessionParams } from 'next-auth/react';
import { useEvmNativeBalance } from '@moralisweb3/next';

function HomePage(props: any) {
  const address = '0xd8da6bf26964af9d7eed9e03e53415d37aa96045';
  const { data: nativeBalance } = useEvmNativeBalance({ address });
  console.log("HomePage", { props, nativeBalance });

  React.useEffect(() => {
  }, [props.user]);

  return (
    <React.Fragment>
      <div className='text-3xl font-bold underline'>
        <h3>Wallet: {address}</h3>
        <h3>Native Balance: {nativeBalance?.balance.ether} ETH</h3>
      </div>
    </React.Fragment>
  );
}

// https://nextjs.org/docs/api-reference/data-fetching/get-server-side-props
export async function getServerSideProps(context: GetSessionParams) {
  const session = await getSession(context);
  console.log('Header ', { session });
  if (!session) {
    return {
      props: {}, // will be passed to the page component as props
    }
  }
  return {
    props: {
      isLoggedIn: true,
      user: session.user,
    }, // will be passed to the page component as props
  }
}

export default HomePage;
