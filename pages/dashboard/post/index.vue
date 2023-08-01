<template>
  <div class="content-wrapper mb-5">
    <section class="content-header">
      <div class="container-fluid"></div>
    </section>

    <section class="content">
      <div class="card card-outline card-info">
        <div class="card-header">
          <nav aria-label="breadcrumb">
            <ol
              class="breadcrumb bg-transparent mb-0 pb-0 pt-1 px-0 me-sm-6 me-5"
            >
              <li class="breadcrumb-item text-sm">
                <nuxt-link
                  :to="{ name: 'dashboard-main' }"
                  class="opacity-5 text-dark"
                >
                  Dashboard
                </nuxt-link>
              </li>
              <li
                class="breadcrumb-item text-sm text-dark active"
                aria-current="page"
              >
                Posts
              </li>
            </ol>
          </nav>
        </div>
        <div class="card-body">
          <div class="form-group">
            <div class="input-group mb-3">
              <div class="input-group">
                <nuxt-link
                  :to="{ name: 'dashboard-post-create' }"
                  class="btn bg-gradient-dark"
                >
                  <i class="fa fa-plus-circle"></i> TAMBAH
                </nuxt-link>
              </div>
              <div class="ms-md-auto pe-md-3 d-flex align-items-center">
                <div class="input-group">
                  <span class="input-group-text text-body"
                    ><i
                      @click="searchData"
                      class="fas fa-search"
                      aria-hidden="true"
                    ></i
                  ></span>
                  <input
                    type="text"
                    class="form-control"
                    v-model="search"
                    @keypress.enter="searchData"
                    placeholder="Type here..."
                  />
                </div>
              </div>
            </div>
          </div>
          <!-- table -->
          <div class="table-responsive">
            <b-table
              table
              align-items-center
              mb-0
              :items="posts"
              :fields="fields"
              show-empty
            >
              <template v-slot:cell(category.name)="data">
                <div class="align-middle text-center text-sm">
                  <span class="badge badge-sm bg-gradient-primary">{{
                    data.item.category.name
                  }}</span>
                </div>
              </template>
              <template v-slot:cell(comments)="row">
                <i class="fa fa-comments"></i> {{ row.item.comments.length }}
              </template>
              <template v-slot:cell(actions)="row">
                <b-button
                  :to="{
                    name: 'dashboard-post-edit-id',
                    params: { id: row.item.id },
                  }"
                  variant="btn bg-gradient-primary"
                  size="sm"
                >
                  EDIT
                </b-button>
                <b-button
                  variant="btn bg-gradient-warning"
                  size="sm"
                  @click="deletePost(row.item.id)"
                  >HAPUS</b-button
                >
              </template>
            </b-table>
          </div>
          <!-- pagination -->
          <b-pagination
            v-model="pagination.current_page"
            :total-rows="pagination.total"
            :per-page="pagination.per_page"
            @change="changePage"
            align="right"
            class="mt-3"
          ></b-pagination>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  //layout
  layout: "dashboard",

  //meta
  head() {
    return {
      title: "Posts - Coffe Shop - Android Corners",
    };
  },

  //data function
  data() {
    return {
      //table header
      fields: [
        {
          label: "Judul Post",
          key: "title",
          thClass:
            "text-uppercase text-secondary text-xxs font-weight-bolder opacity-7",
        },
        {
          label: "Category",
          key: "category.name",
          tdClass: "text-center",
          thClass:
            "text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7",
        },
        {
          label: "Author",
          key: "user.name",
          thClass:
            "text-uppercase text-secondary text-xxs font-weight-bolder opacity-7",
        },
        {
          label: "Komentar",
          key: "comments",
          thClass:
            "text-uppercase text-secondary text-xxs font-weight-bolder opacity-7",
        },
        {
          label: "Actions",
          key: "actions",
          tdClass: "text-center",
          thClass:
            "text-center text-secondary text-xxs font-weight-bolder opacity-7",
        },
      ],

      //state search
      search: "",
    };
  },

  //watch query URL
  watchQuery: ["q", "page"],

  async asyncData({ $axios, query }) {
    //page
    let page = query.page ? parseInt(query.page) : "";

    //search
    let search = query.q ? query.q : "";

    //fetching posts
    const posts = await $axios.$get(
      `/api/dashboard/posts?q=${search}&page=${page}`
    );

    return {
      posts: posts.data.data,
      pagination: posts.data,
    };
  },

  methods: {
    //change page pagination
    changePage(page) {
      this.$router.push({
        path: this.$route.path,
        query: {
          q: this.$route.query.q,
          page: page,
        },
      });
    },

    //searchData
    searchData() {
      this.$router.push({
        path: this.$route.path,
        query: {
          q: this.search,
        },
      });
    },

    //deletePost method
    deletePost(id) {
      this.$swal
        .fire({
          title: "APAKAH ANDA YAKIN ?",
          text: "INGIN MENGHAPUS DATA INI !",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#82d616",
          cancelButtonColor: "#8392AB",
          confirmButtonText: "YA, HAPUS!",
          cancelButtonText: "TIDAK",
        })
        .then((result) => {
          if (result.isConfirmed) {
            //delete post from server
            this.$axios.delete(`/api/dashboard/posts/${id}`).then(() => {
              //feresh data
              this.$nuxt.refresh();

              //alert
              this.$swal.fire({
                title: "BERHASIL!",
                text: "Data Berhasil Dihapus!",
                icon: "success",
                showConfirmButton: false,
                timer: 2000,
              });
            });
          }
        });
    },
  },
};
</script>

<style></style>
