<template>
  <div class="content-wrapper">
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
              <li class="breadcrumb-item text-sm">
                <nuxt-link
                  :to="{ name: 'dashboard-transaction' }"
                  class="opacity-5 text-dark"
                >
                  Transactions
                </nuxt-link>
              </li>
              <li
                class="breadcrumb-item text-sm text-dark active"
                aria-current="page"
              >
                Edit Transaction
              </li>
            </ol>
          </nav>
        </div>
        <div class="card-body">
          <form @submit.prevent="updateProduct">
            <div class="form-group">
              <label>Current Status</label>
              <input
                type="text"
                v-model="status.name"
                placeholder=""
                class="form-control"
                readonly
              />
              <div v-if="validation.name" class="mt-2">
                <b-alert show variant="danger">{{
                  validation.name[0]
                }}</b-alert>
              </div>
            </div>
            <div class="form-group">
              <multiselect v-model="value" :options="options"></multiselect>
              <div v-if="validation.value" class="mt-2">
                <b-alert show variant="danger">{{
                  validation.value[0]
                }}</b-alert>
              </div>
            </div>

            <button class="btn bg-gradient-info" type="submit">
              <i class="fa fa-paper-plane"></i> SIMPAN
            </button>
            <button class="btn bg-gradient-primary" type="reset">
              <i class="fa fa-redo"></i> RESET
            </button>
          </form>
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
      title: "Edit Transactions - Coffe Shop - Android Corners",
    };
  },

  components: {
    "ckeditor-nuxt": () => {
      if (process.client) {
        return import("@blowstack/ckeditor-nuxt");
      }
    },
  },

  data() {
    return {
      //state product
      value: null,
      options: ["SUCCESS", "ON PROCCESS", "DELIVERY", "CANCEL"],
      status: {
        name: "",
      },

      //state validation
      validation: [],
    };
  },

  mounted() {
    //fetching data ststus
    this.$axios
      .get(`/api/dashboard/transactions/${this.$route.params.id}`)

      .then((response) => {
        //assing response data to state "status"
        this.status.name = response.data.data.status;
      });
  },

  methods: {
    async updateProduct() {
      //define formData
      let formData = new FormData();

      formData.append("status", this.value);
      formData.append("_method", "PATCH");

      //sending data to server
      await this.$axios
        .post(`/api/dashboard/transactions/${this.$route.params.id}`, formData)
        .then(() => {
          //sweet alert
          this.$swal.fire({
            title: "BERHASIL!",
            text: "Data Berhasil Diupdate!",
            icon: "success",
            showConfirmButton: false,
            timer: 2000,
          });

          //redirect, if success store data
          this.$router.push({
            name: "dashboard-transaction",
          });
        })
        .catch((error) => {
          //assign error to state "validation"
          this.validation = error.response.data;
        });
    },
  },
};
</script>

<style></style>
