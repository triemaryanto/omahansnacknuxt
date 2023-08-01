export default {
  build: {
    babel: {
      plugins: [
        // Enable ES modules transpilation
        "@babel/plugin-transform-modules-commonjs",
      ],
    },
  },
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: "omahansnacknuxt",
    htmlAttrs: {
      lang: "en",
    },
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { hid: "description", name: "description", content: "" },
      { name: "format-detection", content: "telephone=no" },
    ],
    link: [
      { rel: "icon", type: "image/x-icon", href: "/favicon.ico" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css?family=Open+Sans:300,400,600,700",
      },
    ],
    script: [
      {
        src: "/js/core/popper.min.js",
      },
      {
        src: "/js/core/bootstrap.min.js",
      },
      {
        src: "/js/plugins/perfect-scrollbar.min.js",
      },
      {
        src: "/js/plugins/smooth-scrollbar.min.js",
      },
      {
        src: "/js/soft-ui-dashboard.min.js",
      },
      {
        src: "/js/button.js",
      },
      {
        src: "/js/font.js",
      },
    ],
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    "@/assets/css/nucleo-icons.css",
    "@/assets/css/soft-ui-dashboard.css",
    "@/assets/css/nucleo-svg.css",
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/bootstrap
    "bootstrap-vue/nuxt",
    // https://go.nuxtjs.dev/axios
    "@nuxtjs/auth",
    "@nuxtjs/axios",
    "nuxt-multiselect",
    //https://github.com/avil13/vue-sweetalert2
    "vue-sweetalert2/nuxt",
  ],
  axios: {
    baseURL: "http://127.0.0.1:8000",
  },
  auth: {
    strategies: {
      local: {
        token: {
          property: "token",
          required: true,
          type: "Bearer",
        },
        user: {
          property: "user",
          // autoFetch: true
        },
        endpoints: {
          login: {
            url: "/api/login",
            method: "post",
          },
          logout: {
            url: "/api/dashboard/logout",
            method: "post",
          },
          user: {
            url: "/api/dashboard/user",
            method: "get",
          },
        },
      },
    },
    redirect: {
      login: "/",
      logout: "/",
      callback: "/",
      home: "/dashboard/main",
    },
  },
  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {},
};
