import { useRouter } from "next/router";
import Head from "next/head";
import Meta from "../components/Meta";
import ErrorPage from "../pages/404";
import {
  Container,
  SingleColumn,
  Section,
  Markdown,
  IntraNav,
  TableOfContents,
} from "@urbit/foundation-design-system";
import Header from "./Header";
import Footer from "./Footer";
import classNames from "classnames";

export default function BasicPage({ post, markdown, search, index = false }) {
  const router = useRouter();
  if (!router.isFallback && !post?.slug) {
    return <ErrorPage />;
  }
  return (
    <Container>
      <Head>
        <title>{post.title}</title>
        {Meta(post)}
      </Head>
      <IntraNav ourSite="quantum.leap" search={search} />
      <SingleColumn>
        <Header search={search} />
        <Section>
          <h1>{post.title}</h1>
        </Section>
        <Section>
          <div className={classNames("flex", { sidebar: index })}>
            <div className={classNames("markdown", { "max-w-prose": index })}>
              <Markdown.render content={JSON.parse(markdown)} />
            </div>
            {index && <TableOfContents />}
          </div>
        </Section>
      </SingleColumn>
      <Footer />
    </Container>
  );
}
