export default function Meta(post, disableImage, large = false) {
  const author = post?.extra?.author || "qlfintech.com";
  const title = post?.title ? post.title : "Quantum Leap Financials";
  const description =
    post?.description || "Quamtum Leap is working to bring about a paradigm shift to the financial world.";
  const image =
    post?.extra?.image ||
    post?.image ||
    "https://i.imgur.com/4DBDR9y.png";
  return (
    <>
      <link rel="icon" type="image/png" href="/images/favicon.ico" />
      <link
        rel="apple-touch-icon"
        sizes="180x180"
        href="/images/apple-touch-icon.png"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="32x32"
        href="/images/favicon-32x32.png"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="16x16"
        href="/images/favicon-16x16.png"
      />
      <link rel="manifest" href="/images/site.webmanifest" />

      <meta
        name="twitter:card"
        content={large ? "summary_large_image" : "summary"}
        key="twitter-card"
      />
      <meta name="twitter:site" content="@qlfintech" key="twitter-site" />
      <meta name="twitter:creator" content="@qlfintech" key="twitter-creator" />
      <meta name="og:title" content={title} key="title" />
      <meta name="og:description" content={description} key="description" />
      <meta name="description" content={description} />
      <meta name="author" content={author} key="author" />
      <meta name="cf-2fa-verify" content="hj147kyae651DBG6j8fsg" />
      {!disableImage && (
        <meta name="twitter:image" content={image} key="image" />
      )}
      <link
        rel="alternative"
        type="application/rss+xml"
        title="RSS"
        href="/rss.xml"
      />
    </>
  );
}
