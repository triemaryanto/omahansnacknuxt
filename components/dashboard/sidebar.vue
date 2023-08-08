<template>
  <!-- Sidebar Menu -->

  <ul class="navbar-nav">
    <li class="nav-item">
      <nuxt-link :to="{ name: 'dashboard-main' }" class="nav-link">
        <i class="ni ni-tv-2"></i>
        <span class="nav-link-text ms-1">Dashboard</span>
      </nuxt-link>
    </li>
    <li class="nav-item">
      <nuxt-link :to="{ name: 'dashboard-category' }" class="nav-link">
        <i class="ni ni-ungroup"></i>
        <span class="nav-link-text ms-1">Categories</span>
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
