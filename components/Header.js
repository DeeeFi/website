import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import classnames from "classnames";
import { capitalize } from "@urbit/foundation-design-system";

function ActiveLink({ children, href, className, currentPath }) {
  const firstCrumb = currentPath.split("/")[1];

  const activeClassName = classnames({
    "text-wall-900": "/" + firstCrumb === href,
    "text-wall-500": "/" + firstCrumb !== href,
  });

  return (
    <Link href={href} passHref>
      <a className={`${className} ${activeClassName}`}>{children}</a>
    </Link>
  );
}

export default function Header(props) {
  const [isOpen, setTray] = useState(false);

  const currentPath = useRouter().asPath;

  const routeDepth = currentPath.split("/").length;

  const firstCrumb = currentPath.split("/")[1];

  return (
    <header className="layout px-4 md:px-8 flex justify-between items-center pt-8 md:pt-10 lg:pt-12 pb-10 md:pb-12 lg:pb-24">
      <div>
        <Link href="/" passHref>
          <a className="font-semibold text-lg">[Redacted]</a>
        </Link>
        {routeDepth > 2 ? (
          <Link href={`/${firstCrumb}`} passHref>
            <a className="inline md:hidden type-ui text-wall-500 ml-2">
              {capitalize(firstCrumb)}
            </a>
          </Link>
        ) : null}
      </div>
      {
        // Large screen header
      }
      <nav className="items-center hidden md:flex">
        <ActiveLink
          currentPath={currentPath}
          className="mr-5 type-ui"
          href="/getting-started"
        >
          Get Started
        </ActiveLink>

        <ActiveLink
          currentPath={currentPath}
          className="mr-5 type-ui"
          href="/fund-overview"
        >
          Overview
        </ActiveLink>

        <ActiveLink
          currentPath={currentPath}
          className="mr-5 type-ui"
          href="/research"
        >
          Research
        </ActiveLink>

        <ActiveLink
          currentPath={currentPath}
          className="mr-5 type-ui"
          href="/fund-events"
        >
          Events
        </ActiveLink>

        <ActiveLink
          currentPath={currentPath}
          className="mr-5 type-ui"
          href="/fund-blog"
        >
          Blog
        </ActiveLink>
      </nav>

    </header>
  );
}
