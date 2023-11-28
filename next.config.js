/** @type {import('next').NextConfig} */
export const reactStrictMode = true;
export const images = {
  domains: [
    "www.google.com",
    "avatar.vercel.sh",
    "faisalman.github.io",
    "avatars.dicebear.com",
    "res.cloudinary.com",
    "pbs.twimg.com",
  ],
};
export async function headers() {
  return [
    {
      source: "/:path*",
      headers: [
        {
          key: "Referrer-Policy",
          value: "no-referrer-when-downgrade",
        },
        {
          key: "X-DNS-Prefetch-Control",
          value: "on",
        },
      ],
    },
  ];
}
