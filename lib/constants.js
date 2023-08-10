export const contact = {
  name: "Quantum Leap Financials",
  email: "contact@quantum.leap",
  twitter: "https://twitter.com/",
  github: "https://github.com/",
  newsletter:
    "",
};

export const footerData = [
  [
    {
      title: "Quantum Leap Financials",
      links: [
        {
          title: "Home",
          href: "/",
        },
        { title: "Get Started", href: "/getting-started" },
        {
          title: "Overview",
          href: "/overview",
        },
        {
          title: "Research",
          href: "/research",
        },
        {
          title: "Events",
          href: "/events",
        },
        {
          title: "Blog",
          href: "/blog",
        }
      ],
    },
    {
      title: " ",
      links: [
        { title: "GitHub", href: "https://github.com/" },
        {
          title: "Investor Relations",
          href: "",
        },
        {
          title: "Join Our Mailing List",
          href: "",
        },
        { title: "Whitepaper", href: "" },
      ],
    },
  ],
  [
    { title: "Privacy Policy", href: "/privacy" },
    { title: "Terms of Service", href: "/terms-of-service" },
    { title: `${contact.email}`, href: `mailto:${contact.email}` },
  ],
];
