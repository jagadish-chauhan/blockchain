import 'react-toastify/dist/ReactToastify.css';
import '../styles/globals.css';
import React from 'react';
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
  React.useEffect(() => {
    const use = async () => {
      (await import('tw-elements'));
    };
    use();
  }, []);
  return (
    <WagmiConfig client={client}>
      <SessionProvider session={pageProps.session} refetchInterval={0}>
        <Header {...pageProps} />
        <main className='mt-16'>
          <Component {...pageProps} />
        </main>
        <ToastContainer />
      </SessionProvider>
    </WagmiConfig>
  );
}

export default MyApp;
