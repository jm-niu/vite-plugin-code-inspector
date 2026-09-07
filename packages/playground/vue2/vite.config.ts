import { defineConfig } from "vite";
import Vue2 from "@vitejs/plugin-vue2";
import Vue2Jsx from "@vitejs/plugin-vue2-jsx";
import inspector from "vite-plugin-code-inspector";

export default defineConfig({
  plugins: [
    Vue2(),
    Vue2Jsx({
      compositionAPI: true,
    }),
    inspector({
      toggleButtonVisibility: "always", // always：一直展示, never：隐藏, active
    }) as any,
  ],
});
