import { Html, Head, Main, NextScript } from 'next/document'
import { ReactPortalDiv } from '../components/hooks/ReactPortal'
// import 'tw-elements';

export default function Document() {
  return (
    <Html lang="en">
      <Head />
      <body>
        <Main />
        <ReactPortalDiv />
        <NextScript />
      </body>
    </Html>
  )
}
