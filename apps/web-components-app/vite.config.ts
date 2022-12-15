import { resolve } from "path";
import { defineConfig } from "vite";
import createVuePlugin from "@vitejs/plugin-vue2";
import { VuetifyResolver } from "unplugin-vue-components/resolvers";
import Components from "unplugin-vue-components/vite";
import AutoImport from "unplugin-auto-import/vite";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    createVuePlugin(),
    AutoImport({
      imports: ["vue"],
      dts: "src/auto-imports.d.ts",
    }),
    Components({
      transformer: "vue2",
      resolvers: [VuetifyResolver()],
      dts: "src/components.d.ts",
    }),
  ],
  css: {
    preprocessorOptions: {
      sass: {
        additionalData: [
          '@import "vuetify/src/styles/settings/_index"',
          '@import "./src/styles/variables"',
          "", // end with newline
        ].join("\n"),
      },
    },
  },
  resolve: {
    alias: {
      "@": resolve(__dirname, "src"),
    },
  },
});
