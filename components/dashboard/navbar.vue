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
            <i class="fa fa-shopping-cart me-sm-1"
              ><i class="fa badge fa-sm" value="5">&#xf290;</i></i
            >
          </a>
        </li>

        <li class="nav-item d-flex align-items-center">
          <a
            href="javascript:;"
            class="nav-link text-body font-weight-bold px-0"
          >
            <span class="d-sm-inline d-none">{{ user.name }}</span>
          </a>
        </li>
        <li class="nav-item d-xl-none ps-3 d-flex align-items-center">
          <a @click="toggleClass" class="nav-link text-body p-0">
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
    toggleClass() {
      this.$root.$on("dashboard", () => {
        // your code goes here
        this.toggleClass();
      });
    },
  },
};
</script>

<style>
.badge:after {
  content: attr(value);
  font-size: 12px;
  color: #fff;
  background: rgb(85, 80, 80);
  border-radius: 50%;
  padding: 0 5px;
  position: relative;
  left: -8px;
  top: -10px;
  opacity: 0.9;
}
</style>
