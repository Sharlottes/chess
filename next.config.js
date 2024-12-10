// @ts-check

const { createVanillaExtractPlugin } = require("@vanilla-extract/next-plugin");
const withVanillaExtract = createVanillaExtractPlugin();

/** @type {import('next').NextConfig} */
const nextConfig = { reactStrictMode: false };

module.exports = withVanillaExtract(nextConfig);
