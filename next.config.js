/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['fastly.picsum.photos', 'images.oyoroomscdn.com','t3.ftcdn.net', 'cdn5.vectorstock.com','www.shutterstock.com','thumbs.dreamstime.com'],
  },
}

module.exports = nextConfig
