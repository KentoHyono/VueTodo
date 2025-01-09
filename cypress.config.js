import { defineConfig } from "cypress";

export default defineConfig({
  e2e: {
    baseUrl : 'https://kento-vue-todo.netlify.app/',
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
