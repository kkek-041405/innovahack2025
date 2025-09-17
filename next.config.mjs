/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'storage.googleapis.com' },
      { protocol: 'https', hostname: 'reskilll.com' },
      { protocol: 'https', hostname: 'www.reskilll.com' },
      { protocol: 'https', hostname: 'i.pravatar.cc' }
    ]
  }
}

export default nextConfig
