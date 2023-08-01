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
                Comments
              </li>
            </ol>
          </nav>
        </div>
        <div class="card-body">
          <div class="form-group">
            <div class="input-group mb-3">
              <div class="ms-md-auto pe-md-3 d-flex align-items-center">
                <div class="input-group">
                  <span class="input-group-text text-body"
                    ><i class="fas fa-search" aria-hidden="true"></i
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
              :items="comments"
              :fields="fields"
              show-empty
            >
              <template v-slot:cell(actions)="row">
                <b-button
                  variant="btn bg-gradient-warning"
                  size="sm"
                  @click="deleteComment(row.item.id)"
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
      title: "Comment - Coffe Shop - Android Corners",
    };
  },

  //data function
  data() {
    return {
      //table header
      fields: [
        {
          label: "Comment",
          key: "comment",
          tdClass: "text-center",
          thClass:
            "text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7",
        },
        {
          label: "User",
          key: "name",
          tdClass: "text-center",
          thClass:
            "text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7",
        },
        {
          label: "Email",
          key: "email",
          tdClass: "text-center",
          thClass:
            "text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7",
        },
        {
          th: "Actions",
          key: "actions",
          tdClass: "text-center",
          thClass:
            "text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7",
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

    //fetching comments
    const comments = await $axios.$get(
      `/api/dashboard/comments?q=${search}&page=${page}`
    );

    return {
      comments: comments.data.data,
      pagination: comments.data,
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

    //deleteCategory method
    deleteComment(id) {
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
            //delete tag from server
            this.$axios.delete(`/api/dashboard/comments/${id}`).then(() => {
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
