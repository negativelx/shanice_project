import type { App } from "vue";
import { createPinia } from "pinia";

const store = createPinia(), setupStore = {
  install: (app: App) => {
    app.use(store);
  }
};

export { store, setupStore };
