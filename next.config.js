/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    DATABASE_URL: process.env.DATABASE_URL,
    NEXTAUTH_URL: process.env.NEXTAUTH_URL,
  },
};
const withPWA = require("next-pwa");

(module.exports = nextConfig),
  withPWA({
    pwa: {
      dest: "public",
      register: true,
      skipWaiting: true,
    },
  });
