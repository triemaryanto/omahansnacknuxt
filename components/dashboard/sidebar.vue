<template>
  <!-- Sidebar Menu -->

  <ul class="navbar-nav">
    <li class="nav-item">
      <nuxt-link :to="{ name: 'dashboard-home' }" class="nav-link">
        <i class="ni ni-tv-2"></i>
        <span class="nav-link-text ms-1">Home</span>
      </nuxt-link>
    </li>
    <li class="nav-item mt-3">
      <h6 class="ps-4 ms-2 text-uppercase text-xs font-weight-bolder opacity-6">
        Menu Admin
      </h6>
    </li>

    <li class="nav-item">
      <a
        data-bs-toggle="collapse"
        href="#applicationsExamples"
        class="nav-link"
        aria-controls="applicationsExamples"
        role="button"
        aria-expanded="false"
      >
        <div
          class="icon icon-shape icon-sm shadow border-radius-md bg-white text-center d-flex align-items-center justify-content-center me-2"
        >
       
        </div>
        <span class="nav-link-text ms-1">Master</span>
      </a>
      <div class="collapse" id="applicationsExamples">
        <ul class="nav ms-4 ps-3">
          <li class="nav-item">
            <nuxt-link :to="{ name: 'dashboard-category' }" class="nav-link">
              <span class="nav-link-text ms-1">Categories</span>
            </nuxt-link>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="../../pages/applications/wizard.html">
              <span class="sidenav-mini-icon"> W </span>
              <span class="sidenav-normal"> Wizard </span>
            </a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="../../pages/applications/datatables.html">
              <span class="sidenav-mini-icon"> D </span>
              <span class="sidenav-normal"> DataTables </span>
            </a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="../../pages/applications/calendar.html">
              <span class="sidenav-mini-icon"> C </span>
              <span class="sidenav-normal"> Calendar </span>
            </a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="../../pages/applications/analytics.html">
              <span class="sidenav-mini-icon"> A </span>
              <span class="sidenav-normal"> Analytics </span>
            </a>
          </li>
        </ul>
      </div>
    </li>

    <li class="nav-item">
      <nuxt-link :to="{ name: 'dashboard-main' }" class="nav-link">
        <i class="ni ni-tv-2"></i>
        <span class="nav-link-text ms-1">Dashboard</span>
      </nuxt-link>
    </li>

    <li class="nav-item">
      <nuxt-link :to="{ name: 'dashboard-product' }" class="nav-link">
        <i class="ni ni-shop"></i>
        <span class="nav-link-text ms-1">Products</span>
      </nuxt-link>
    </li>
    <li class="nav-item">
      <nuxt-link :to="{ name: 'dashboard-post' }" class="nav-link">
        <i class="ni ni-collection"></i>
        <span class="nav-link-text ms-1">Posts</span>
      </nuxt-link>
    </li>
    <li class="nav-item" v-if="hasPermission('master')">
      <nuxt-link :to="{ name: 'dashboard-transaction' }" class="nav-link">
        <i class="ni ni-chat-round"></i>
        <span class="nav-link-text ms-1">Transactions</span>
      </nuxt-link>
    </li>
    <li class="nav-item mt-3">
      <h6 class="ps-4 ms-2 text-uppercase text-xs font-weight-bolder opacity-6">
        SETTING
      </h6>
    </li>
    <li class="nav-item">
      <nuxt-link :to="{ name: 'dashboard-profile' }" class="nav-link">
        <i class="ni ni-ui-04"></i>
        <span class="nav-link-text ms-1">Profile</span>
      </nuxt-link>
    </li>
    <li class="nav-item">
      <nuxt-link :to="{ name: 'dashboard-user' }" class="nav-link">
        <i class="ni ni-ui-04"></i>
        <span class="nav-link-text ms-1">Users</span>
      </nuxt-link>
    </li>
    <li class="nav-item">
      <nuxt-link :to="{ name: 'dashboard-comment' }" class="nav-link">
        <i class="ni ni-chat-round"></i>
        <span class="nav-link-text ms-1">Comments</span>
      </nuxt-link>
    </li>
  </ul>
  <!-- /.sidebar-menu -->
</template>

<script>
export default {
  data() {
    return {
      userPermissions: [],
    };
  },
  async mounted() {
    try {
      const response = await this.$axios.get(
        "/api/dashboard/check-permissions"
      );
      console.log(
        response.data.permissions.map((permission) => permission.name)
      );
      this.userPermissions = response.data.permissions.map(
        (permission) => permission.name
      );
    } catch (error) {
      console.error("Error fetching user permissions", error);
    }
  },
  methods: {
    hasPermission(permission) {
      return this.userPermissions.includes(permission);
    },
  },
};
</script>

<style scoped>
a.nuxt-link-active {
  background-color: rgb(231, 241, 234);
  border-radius: 25px;
}
</style>
