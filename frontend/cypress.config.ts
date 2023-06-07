import { defineConfig } from "cypress";

export default defineConfig({
  component: {
    devServer: {
      framework: "next",
      bundler: "webpack",
    },
  },
  env: {
    API: "http://localhost:3001",
    HOME: "http://localhost:3000",
    LOGIN: "http://localhost:3000/login",
    REGISTER: "http://localhost:3000/register",
    SINGLE_VIDEO:
      "http://localhost:3000/vids/7d632aa1-7c3a-4c65-96cf-543983053b82",
    SINGLE_VIDEO_ERROR: "http://localhost:3000/vids/error-video",
  },

  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
