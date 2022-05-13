import { resolve } from "path";
import { defineConfig } from "vite";
import { createVuePlugin } from "vite-plugin-vue2";
import { VuetifyResolver } from "unplugin-vue-components/resolvers";
import Components from "unplugin-vue-components/vite";
import ScriptSetup from "unplugin-vue2-script-setup/vite";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    createVuePlugin(),
    ScriptSetup(),
    Components({
      transformer: "vue2",
      resolvers: [VuetifyResolver()],
    }),
  ],
  resolve: {
    alias: {
      "@": resolve(__dirname, "./src"),
    },
  },
});
