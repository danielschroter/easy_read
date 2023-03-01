import Document, { Head, Html, Main, NextScript } from "next/document";

class MyDocument extends Document {
  render() {
    return (
      <Html lang="en">
        <Head>
          <link rel="icon" href="/favicon.ico" />
          <meta
            name="description"
            content="Translate your Text into Easy Read"
          />

          {/* TODO */}
          <meta property="og:site_name" content="example.com" />
          <meta
            property="og:description"
            content="Translate your Text into Easy Read"
          />
          <meta property="og:title" content="Easy Speech Translator" />
          <meta name="twitter:card" content="summary_large_image" />
          <meta name="twitter:title" content="Easy Speech Translator" />
          <meta
            name="twitter:description"
            content="Translate your Text into Easy Read"
          />
          <meta
            property="og:image"
            // TODO
            content="https://example.com/og-image.png"
          />
          <meta
            name="twitter:image"
            // TODO
            content="https://example.com/og-image.png"
          />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
