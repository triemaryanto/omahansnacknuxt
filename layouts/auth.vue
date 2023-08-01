<template>
  <main class="main-content mt-0">
    <section>
      <div class="page-header min-vh-75">
        <div class="container">
          <nuxt />
        </div>
      </div>
    </section>
  </main>
</template>

<script>
export default {
  //middleware auth
  middleware: "auth",
};
</script>
<style></style>
