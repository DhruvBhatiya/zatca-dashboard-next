import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  eslint: {
    ignoreDuringBuilds: true, // Disable Strict Linting in Production
  },
  devIndicators: {
    buildActivity: false, // Disables the toast indicator
  },
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: ["@svgr/webpack"],
    });
    return config;
  },
};

export default nextConfig;




// import type { NextConfig } from "next";

// const nextConfig: NextConfig = {
//   /* config options here */
//   webpack(config) {
//     config.module.rules.push({
//       test: /\.svg$/,
//       use: ["@svgr/webpack"],
//     });
//     return config;
//   },
// };

// export default nextConfig;
