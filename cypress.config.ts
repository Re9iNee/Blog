import { defineConfig } from "cypress";
require("dotenv").config();

export default defineConfig({
  component: {
    devServer: {
      framework: "next",
      bundler: "webpack",
    },
  },
  fixturesFolder: false,
  e2e: {
    baseUrl: "http://localhost:3000",
    supportFile: false,
    setupNodeEvents(on, config) {
      config.env = config.env || {};
      config.env.email = process.env.ADMIN_EMAIL;
      config.env.password = process.env.ADMIN_PASSWORD;

      console.log("extended config.env with email AND password");

      return config;
    },
  },
});
