import 'react-toastify/dist/ReactToastify.css';
import '../styles/globals.css';
import React, { useState } from 'react';
import SocketIOClient, { Socket } from "socket.io-client";
import { createClient, configureChains, defaultChains, WagmiConfig } from 'wagmi';
import { ToastContainer, toast } from 'react-toastify';
import { publicProvider } from 'wagmi/providers/public';
import { SessionProvider } from 'next-auth/react';
import Header from '../components/Header';

const { provider, webSocketProvider } = configureChains(defaultChains, [publicProvider()]);

const client = createClient({
  provider,
  webSocketProvider,
  autoConnect: true,
});

function MyApp({ Component, pageProps }) {

  const [clientSocket, setClientSocket] = useState<Socket>();

  React.useEffect(() => {
    const use = async () => {
      (await import('tw-elements'));
    };
    use();

    const socket = SocketIOClient(process.env.NEXT_PUBLIC_NEXTAUTH_URL_WS, {
      path: "/api/socketio",
      // transports: ["websocket"]
    })

    // log socket connection
    socket.on("connect", () => {
      console.log("SOCKET CONNECTED!", socket.id);
      setClientSocket(socket);
      // setConnected(true);
    });

    // component did unmount
    return () => {
      // socket disconnet onUnmount if exists
      // socket.disconnect();
    }
  }, []);

  return (
    <WagmiConfig client={client}>
      <SessionProvider session={pageProps.session} refetchInterval={0}>
        <Header {...pageProps} clientSocket={clientSocket} />
        <main className='mt-16'>
          <Component {...pageProps} clientSocket={clientSocket} />
        </main>
        <ToastContainer />
      </SessionProvider>
    </WagmiConfig>
  );
}

export default MyApp;
