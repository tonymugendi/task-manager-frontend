import "@/styles/globals.css";
import  Layout  from "@/components/layout";
import type { AppProps } from "next/app";

type ExtendedAppProps = AppProps & {
  Component: AppProps['Component'] & { noLayout?: boolean };
};

export default function App({ Component, pageProps }: ExtendedAppProps) {
  return (
    <div>
      {Component.noLayout ? (
        <Component {...pageProps} />
      ) : (
        <Layout>
          <Component {...pageProps} />
        </Layout>
      )}
    </div>
  )
}
