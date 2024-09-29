const withMDX = require("@next/mdx")();

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Configure `pageExtensions` to include MDX files
  pageExtensions: ["js", "jsx", "mdx", "ts", "tsx"],
  // Optionally, add any other Next.js config below
  images: {
    remotePatterns: [
      { hostname: "jbt-images.s3.amazonaws.com" },
      { hostname: "cdn.sanity.io" },
      { hostname: "miro.medium.com" },
    ],
  },
  async redirects() {
    return [
      {
        source: "/slow-page-speeds",
        destination: "/blog/fix-slow-page-speeds",
        permanent: true,
      },
      {
        source: "/old-blog-post-2",
        destination: "/new-blog-post-2",
        permanent: true,
      },
    ];
  },
};

module.exports = withMDX(nextConfig);
