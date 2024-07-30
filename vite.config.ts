import { defineConfig, loadEnv, ConfigEnv } from "vite";
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import vueDevTools from 'vite-plugin-vue-devtools'
import Components from 'unplugin-vue-components/vite'
import DynComponents, { unpluginDynVueComponentsResolver } from 'dyn-components'

import Icons from "unplugin-icons/vite"; // node14 support
import { FileSystemIconLoader } from "unplugin-icons/loaders";
import IconsResolver from "unplugin-icons/resolver";

// https://vitejs.dev/config/
export default defineConfig(async (params: ConfigEnv) => {
  const { command, mode } = params;
  const ENV = loadEnv(mode, process.cwd());
  console.log("node version", process.version);
  console.info(
    `running mode: ${mode}, command: ${command}, ENV: ${JSON.stringify(ENV)}`
  );
  return {
    plugins: [
      vue(),
      vueJsx(),
      DynComponents(),
      Components({
        resolvers: [
          unpluginDynVueComponentsResolver(),
          IconsResolver({
            enabledCollections: ["ep"], // elelemt-plus图标库， eg： <i-ep-refresh />
            alias: { svg2: "svg-inline" },
            customCollections: ["svg", "svg-inline"],
          })
        ],
      }),
      Icons({
        autoInstall: true,
        compiler: "vue3",
        customCollections: {
          // <i-svg-file-copy style="font-size: 50px; fill: red;" />
          svg: FileSystemIconLoader("src/assets/images/svg-icons"),
          "svg-inline": {
            // <i-svg-inline-foo />
            // <i-svg2-foo />
            foo: `<svg viewBox="0 0 100 100"><rect x="0" y="0" width="100%" height="100%"/><circle cx="50%" cy="50%" r="50" fill="white"/></svg>`,
          },
        },
      }),
      vueDevTools()
    ],
    define: {
      '__DEV__': mode === 'development', // 自定义开发模式标识
      '__PROD__': mode === 'production', // 自定义生产模式标识
    },
    resolve: {
      alias: {
        '@': '/src'
      }
    },
    base: "./",
    build: {
      outDir: "dist/example",
      emptyOutDir: true,
      sourcemap: mode === "development",
      minify: mode !== "development",
    },
    css: {
      preprocessorOptions: {
        scss: {
          charset: false,
          // additionalData: `$injectedColor: orange;`
          additionalData: `@import "dyn-components/theme.scss";@import "@/assets/styles/globalInjectedScss/index.scss";`
        }
        // less: {
        //   modifyVars: {
        //     '@primary-color': '#1990EB',
        //     hack: `true; @import "@import "@/assets/stylesheets/globalInjectedLess/index.less";`
        //   },
        //   javascriptEnabled: true,
        // }
      }
      // postcss: {}
    },
  }
})
