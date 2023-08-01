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
                  :to="{ name: 'dashboard-product' }"
                  class="opacity-5 text-dark"
                >
                  products
                </nuxt-link>
              </li>
              <li
                class="breadcrumb-item text-sm text-dark active"
                aria-current="page"
              >
                Edit product
              </li>
            </ol>
          </nav>
        </div>
        <div class="card-body">
          <form @submit.prevent="updateProduct">
            <div class="form-group">
              <label>GAMBAR PRODUCT</label>
              <input
                type="file"
                @change="handleFileChange"
                class="form-control"
              />
            </div>

            <div class="form-group">
              <label>NAMA PRODUCT</label>
              <input
                type="text"
                v-model="product.name"
                placeholder="Masukkan Judul product"
                class="form-control"
              />
              <div v-if="validation.name" class="mt-2">
                <b-alert show variant="danger">{{
                  validation.name[0]
                }}</b-alert>
              </div>
            </div>

            <div class="form-group">
              <label>HARGA PRODUCT</label>
              <input
                type="text"
                v-model="product.price"
                placeholder="Masukkan Judul product"
                class="form-control"
              />
              <div v-if="validation.price" class="mt-2">
                <b-alert show variant="danger">{{
                  validation.price[0]
                }}</b-alert>
              </div>
            </div>

            <div class="form-group">
              <label>TYPE PRODUCT</label>
              <input
                type="text"
                v-model="product.types"
                placeholder="Masukkan Judul product"
                class="form-control"
              />
              <div v-if="validation.types" class="mt-2">
                <b-alert show variant="danger">{{
                  validation.types[0]
                }}</b-alert>
              </div>
            </div>

            <div class="form-group">
              <label>CATEGORY PRODUCT</label>
              <multiselect
                v-model="product.category_id"
                :options="categories"
                label="name"
                track-by="id"
                :searchable="true"
              ></multiselect>
              <div v-if="validation.category_id" class="mt-2">
                <b-alert show variant="danger">{{
                  validation.category_id[0]
                }}</b-alert>
              </div>
            </div>

            <div class="form-group">
              <label>DESCRIPTION</label>
              <textarea
                v-model="product.description"
                class="form-control"
                rows="3"
                placeholder="Masukkan Deskripsi Singkat"
              ></textarea>
              <div v-if="validation.description" class="mt-2">
                <b-alert show variant="danger">{{
                  validation.description[0]
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
      title: "Edit Product - Coffe Shop - Android Corners",
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
      product: {
        image: "",
        name: "",
        category_id: "",
        price: "",
        types: "",
        description: "",
      },

      //state categories
      categories: [],

      //state validation
      validation: [],
    };
  },

  mounted() {
    //fetching data product
    this.$axios
      .get(`/api/dashboard/products/${this.$route.params.id}`)

      .then((response) => {
        //assing response data to state "product.title"
        this.product.name = response.data.data.name;

        //assing response data to state "product.category_id"
        this.product.category_id = response.data.data.category;
        this.product.price = response.data.data.price;
        this.product.types = response.data.data.types;

        //assing response data to state "product.description"
        this.product.description = response.data.data.description;
      });

    //fetching data categories
    this.$axios
      .get("/api/dashboard/categories")

      .then((response) => {
        //assing response data to state "categories"
        this.categories = response.data.data.data;
      });
  },

  methods: {
    handleFileChange(e) {
      //get image
      let image = (this.product.image = e.target.files[0]);

      //check fileType
      if (!image.type.match("image.*")) {
        //if fileType not allowed, then clear value and set null
        e.target.value = "";

        this.product.image = null;

        //show sweet alert
        this.$swal.fire({
          title: "OOPS!",
          text: "Format File Tidak Didukung!",
          icon: "error",
          showConfirmButton: false,
          timer: 2000,
        });
      }
    },

    async updateProduct() {
      //define formData
      let formData = new FormData();

      formData.append("image", this.product.image);
      formData.append("name", this.product.name);
      formData.append(
        "category_id",
        this.product.category_id ? this.product.category_id.id : ""
      );
      formData.append("price", this.product.price);
      formData.append("types", this.product.types);
      formData.append("description", this.product.description);
      formData.append("_method", "PATCH");

      //sending data to server
      await this.$axios
        .post(`/api/dashboard/products/${this.$route.params.id}`, formData)
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
            name: "dashboard-product",
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
