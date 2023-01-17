import React from 'react';
import { getSession, GetSessionParams } from 'next-auth/react';

function UsersList() {
  return (
    <React.Fragment>
      Users List
    </React.Fragment>
  )

}

// https://nextjs.org/docs/api-reference/data-fetching/get-server-side-props
export async function getServerSideProps(context: GetSessionParams) {
  const session = await getSession(context);
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

export default UsersList;