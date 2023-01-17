import 'react-toastify/dist/ReactToastify.css';
import '@/styles/globals.css'
import { createClient, configureChains, WagmiConfig, defaultChains } from 'wagmi';
import { ToastContainer, toast } from 'react-toastify';
import { publicProvider } from 'wagmi/providers/public';
import type { AppProps } from 'next/app'

import { SessionProvider } from 'next-auth/react';
import Header from '../components/Header';
import * as chains from 'wagmi/chains';

// const defaultChains = Object.values(chains);
console.log("defaultChains", { defaultChains, chains });
const { provider, webSocketProvider } = configureChains(defaultChains, [publicProvider()]);

const client = createClient({
  provider,
  webSocketProvider,
  autoConnect: true,
});

function MyApp({ Component, pageProps }: AppProps) {
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
