import Head from "next/head";
import Link from "next/link";
import React from "react";
import { DateTime } from "luxon";
import {
  Container,
  Section,
  SingleColumn,
  TwoUp,
  IntraNav,
  getAllPosts,
  generateRealtimeDate,
} from "@urbit/foundation-design-system";
import { getAllEvents } from "../lib/lib";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Contact from "../components/Contact";
import PostPreview from "../components/PostPreview";
import EventPreview from "../components/EventPreview";
import { eventKeys } from "../lib/constants";
import IndexCard from "../components/ecosystem/IndexCard";
import HighlightCard from "../components/HighlightCard";
import fs from "fs";
import path from "path";
import Meta from "../components/Meta";
import { matchEcosystemPost } from "../lib/lib";

export default function Home({
  posts,
  highlights,
  ecosystem,
  events,
  grantNumbers,
  search,
}) {
  const post = {
    title: "QEF",
    description: "Quantum Leap Financials.",
    image: "https://i.imgur.com/4DBDR9y.png"
  };
  return (
    <Container>
      <Head>
        <title>Quantum Leap Financials</title>
        {Meta(post, false, true)}
      </Head>
      <SingleColumn>
        <Header search={search} />
        {
          // Hero Statement
        }
        <Section className="pb-36">
          <div className="space-y-8">
            <h1>Quantum Leap: Crypto Investment Management.</h1>
            <Link href="/launch-app" passHref><a className="bg-green-400 text-white button-lg max-w-fit">Launch App</a></Link>
          </div>
        </Section>
        {
          // Hero
        }

        <Section narrow>
          <h2 className="pb-2">QEF Newsletter</h2>
          <p className="pb-8">Get monthly email updates on all things QLeap.</p>
          <Contact emphasize />
        </Section>


        <Section narrow>
          <h2 className="pb-8">Social Media</h2>
          <p className="pb-2">
            Follow us on <Link href="https://twitter.com/intent/user?screen_name=quantumleap2022">X</Link>
          </p>
          <p className="pb-2">
            Check out our posts on{" "}
            <Link href="http://instagram.com/">Instagram</Link>
          </p>
          <p className="pb-2">
            Watch livestreams on{" "}
            <Link href="https://www.youtube.com/">
              YouTube
            </Link>
          </p>
          <p className="pb-2">
            Dig into code on <Link href="http://github.com/">Github</Link>
          </p>
        </Section>
      </SingleColumn>
      <Footer />
    </Container>
  );
}
