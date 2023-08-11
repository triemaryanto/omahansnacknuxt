<template>
  <div
    class="g-sidenav-show bg-white-100"
    :class="{ 'g-sidenav-pinned': isClassVisible }"
  >
    <aside
      class="sidenav navbar navbar-vertical navbar-expand-xs border-0 border-radius-xl my-3 fixed-start ms-3"
      id="sidenav-main"
    >
      <div class="sidenav-header">
        <i
          class="fas fa-times p-3 cursor-pointer text-secondary opacity-5 position-absolute end-0 top-0 d-none d-xl-none"
          aria-hidden="true"
          id="iconSidenav"
        ></i>
        <a
          class="navbar-brand m-0"
          href=" https://demos.creative-tim.com/soft-ui-dashboard/pages/dashboard.html "
          target="_blank"
        >
          <img
            src="~/assets/img/logo.png"
            class="navbar-brand-img h-100"
            alt="main_logo"
          />
          <span class="ms-1 font-weight-bold">Omahan Snack {{ kata }} </span>
        </a>
      </div>
      <a @click="toggleClass" class="nav-link text-body p-0"> ok</a>
      <hr class="horizontal dark mt-0" />
      <Sidebar />
    </aside>
    <main
      class="main-content position-relative max-height-vh-100 h-100 border-radius-lg"
    >
      <nav
        class="navbar navbar-main navbar-expand-lg px-0 mx-4 shadow-none border-radius-xl"
        id="navbarBlur"
        navbar-scroll="true"
      >
        <Navbar />
      </nav>

      <Nuxt />
      <br />
      <footer class="footer pt-3">
        <div class="container-fluid">
          <div class="row align-items-center justify-content-lg-between">
            <div class="col-lg-6 mb-lg-0 mb-4">
              <div
                class="copyright text-center text-sm text-muted text-lg-start"
              >
                Made with <i class="fa fa-heart"></i>

                <strong>Copyright &copy; 2023.</strong>Tri Maryanto All rights
                reserved.
              </div>
            </div>
          </div>
        </div>
      </footer>
    </main>
  </div>
</template>
<script>
import Sidebar from "@/components/dashboard/sidebar.vue";
import Navbar from "@/components/dashboard/navbar.vue";

export default {
  //middleware auth
  middleware: "auth",
  data() {
    return {
      isClassVisible: false,
      kata: "ok",
    };
  },
  methods: {
    toggleClass() {
      this.isClassVisible = !this.isClassVisible;
      this.kata = "noted";
    },
  },
  components: {
    Navbar,
    Sidebar,
  },

  mounted() {
    this.$on("toggle-class", this.toggleClass); // Listening for the event from Component1
  },
  beforeDestroy() {
    this.$off("toggle-class", this.toggleClass); // Removing the event listener
  },
};
</script>
