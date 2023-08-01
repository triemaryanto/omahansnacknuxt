<template>
  <div class="container-fluid py-1 px-3">
    <div
      class="collapse navbar-collapse mt-sm-0 mt-2 me-md-0 me-sm-4"
      id="navbar"
    >
      <div class="ms-md-auto pe-md-3 d-flex align-items-center">
        <div class="input-group"></div>
      </div>
      <ul class="navbar-nav justify-content-end">
        <li class="nav-item d-flex align-items-center">
          <a
            href="javascript:;"
            class="nav-link text-body font-weight-bold px-0"
          >
            <i class="fa fa-coffee me-sm-1"></i>
            <span class="d-sm-inline d-none">{{ user.name }}</span>
          </a>
        </li>
        <li class="nav-item d-xl-none ps-3 d-flex align-items-center">
          <a
            href="javascript:;"
            class="nav-link text-body p-0"
            id="iconNavbarSidenav"
          >
            <div class="sidenav-toggler-inner">
              <i class="sidenav-toggler-line"></i>
              <i class="sidenav-toggler-line"></i>
              <i class="sidenav-toggler-line"></i>
            </div>
          </a>
        </li>
        <li class="nav-item px-3 d-flex align-items-center"></li>
        <li class="nav-item dropdown pe-2 d-flex align-items-center">
          <a
            href="javascript:;"
            class="nav-link text-body p-0"
            id="dropdownMenuButton"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            <i class="fa fa-cog fixed-plugin-button-nav cursor-pointer"></i>
          </a>
          <ul
            class="dropdown-menu dropdown-menu-end px-2 py-3 me-sm-n4"
            aria-labelledby="dropdownMenuButton"
          >
            <li class="mb-2">
              <a @click="logout" class="dropdown-item border-radius-md">
                <i class="fa fa-circle-o-notch"> Log Out</i>
              </a>
            </li>
          </ul>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
export default {
  computed: {
    user() {
      return this.$auth.user;
    },
  },

  methods: {
    async logout() {
      //logout auth
      await this.$auth.logout();

      //redirect route login
      this.$router.push({
        name: "index",
      });
    },
  },
};
</script>

<style></style>
