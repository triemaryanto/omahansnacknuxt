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
                  :to="{ name: 'dashboard-post' }"
                  class="opacity-5 text-dark"
                >
                  Posts
                </nuxt-link>
              </li>
              <li
                class="breadcrumb-item text-sm text-dark active"
                aria-current="page"
              >
                Edit Post
              </li>
            </ol>
          </nav>
        </div>
        <div class="card-body">
          <form @submit.prevent="updatePost">
            <div class="form-group">
              <label>GAMBAR POST</label>
              <input
                type="file"
                @change="handleFileChange"
                class="form-control"
              />
            </div>

            <div class="form-group">
              <label>JUDUL POST</label>
              <input
                type="text"
                v-model="post.title"
                placeholder="Masukkan Judul Post"
                class="form-control"
              />
              <div v-if="validation.title" class="mt-2">
                <b-alert show variant="danger">{{
                  validation.title[0]
                }}</b-alert>
              </div>
            </div>

            <div class="form-group">
              <label>CATEGORY</label>
              <multiselect
                v-model="post.category_id"
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
              <label>KONTEN POST</label>
              <client-only placeholder="loading...">
                <ckeditor-nuxt v-model="post.content" :config="editorConfig" />
              </client-only>
              <div v-if="validation.content" class="mt-2">
                <b-alert show variant="danger">{{
                  validation.content[0]
                }}</b-alert>
              </div>
            </div>

            <div class="form-group">
              <label>DESCRIPTION</label>
              <textarea
                v-model="post.description"
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
              <i class="fa fa-paper-plane"></i> UPDATE
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
      title: "Edit Post - Coffe Shop - Android Corners",
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
      //state post
      post: {
        image: "",
        title: "",
        category_id: "",
        content: "",
        description: "",
      },

      //state categories
      categories: [],

      //state validation
      validation: [],

      //config CKEDITOR
      editorConfig: {
        removePlugins: ["Title"],
        simpleUpload: {
          uploadUrl: "http://localhost:8080/api/web/posts/storeImage",
        },
      },
    };
  },

  mounted() {
    //fetching data post
    this.$axios
      .get(`/api/dashboard/posts/${this.$route.params.id}`)

      .then((response) => {
        //assing response data to state "post.title"
        this.post.title = response.data.data.title;

        //assing response data to state "post.category_id"
        this.post.category_id = response.data.data.category;

        //assing response data to state "post.content"
        this.post.content = response.data.data.content;

        //assing response data to state "post.description"
        this.post.description = response.data.data.description;
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
      let image = (this.post.image = e.target.files[0]);

      //check fileType
      if (!image.type.match("image.*")) {
        //if fileType not allowed, then clear value and set null
        e.target.value = "";

        this.post.image = null;

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

    async updatePost() {
      //define formData
      let formData = new FormData();

      formData.append("image", this.post.image);
      formData.append("title", this.post.title);
      formData.append(
        "category_id",
        this.post.category_id ? this.post.category_id.id : ""
      );
      formData.append("content", this.post.content);
      formData.append("description", this.post.description);
      formData.append("_method", "PATCH");

      //sending data to server
      await this.$axios
        .post(`/api/dashboard/posts/${this.$route.params.id}`, formData)
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
            name: "dashboard-post",
          });
        })
        .catch((error) => {
          //assign error to state "validation"
          s.validation = error.response.data;
        });
    },
  },
};
</script>

<style>
.ck-editor__editable {
  min-height: 200px;
}
</style>
