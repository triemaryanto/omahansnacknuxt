<template>
    <div class="content-wrapper">
      <section class="content-header">
        <div class="container-fluid"></div>
      </section>
  
      <section class="content">
        <div class="card card-outline card-info">
          <div class="card-header">
            <nav aria-label="breadcrumb">
              <ol class="breadcrumb bg-transparent mb-0 pb-0 pt-1 px-0 me-sm-6 me-5">
                <li class="breadcrumb-item text-sm">
                  <nuxt-link :to="{ name: 'dashboard-main' }" class="opacity-5 text-dark">
                    Dashboard
                  </nuxt-link>
                </li>
                <li class="breadcrumb-item text-sm">
                  <nuxt-link :to="{ name: 'dashboard-user' }" class="opacity-5 text-dark">
                    users
                  </nuxt-link>
                </li>
                <li class="breadcrumb-item text-sm text-dark active" aria-current="page">
                  Tambah user
                </li>
              </ol>
            </nav>
          </div>
          <div class="card-body">
            <form @submit.prevent="storeUser">
              <div class="form-group">
                <label>GAMBAR USER</label>
                <input type="file" @change="handleFileChange" class="form-control" />
                <div v-if="validation.image" class="mt-2">
                  <b-alert show variant="danger">{{ validation.image[0] }}</b-alert>
                </div>
              </div>
  
              <div class="form-group">
                <label>NAMA USER</label>
                <input type="text" v-model="user.name" placeholder="Masukkan nama user" class="form-control" />
                <div v-if="validation.name" class="mt-2">
                  <b-alert show variant="danger">{{ validation.name[0] }}</b-alert>
                </div>
              </div>
  
              <div class="form-group">
                <label>EMAIL USER</label>
                <input type="text" v-model="user.email" placeholder="Masukkan Email user" class="form-control" />
                <div v-if="validation.email" class="mt-2">
                  <b-alert show variant="danger">{{ validation.email[0] }}</b-alert>
                </div>
              </div>
  
              <div class="form-group">
                <label>CITY</label>
                <input type="text" v-model="user.city" placeholder="Masukkan kota user" class="form-control" />
                <div v-if="validation.city" class="mt-2">
                  <b-alert show variant="danger">{{ validation.city[0] }}</b-alert>
                </div>
              </div>
              <div class="form-group">
                <label>HOUSE NUMBER</label>
                <input type="text" v-model="user.houseNumber" placeholder="Masukkan nomor rumah user"
                  class="form-control" />
                <div v-if="validation.houseNumber" class="mt-2">
                  <b-alert show variant="danger">{{ validation.houseNumber[0] }}</b-alert>
                </div>
              </div>
              <div class="form-group">
                <label>PHONE NUMBER</label>
                <input type="text" v-model="user.phoneNumber" placeholder="Masukkan nomor telp user"
                  class="form-control" />
                <div v-if="validation.phoneNumber" class="mt-2">
                  <b-alert show variant="danger">{{ validation.phoneNumber[0] }}</b-alert>
                </div>
              </div>
              <div class="form-group">
                <label>ROLES</label>
                <multiselect v-model="value" :options="options"></multiselect>
                <div v-if="validation.value" class="mt-2">
                  <b-alert show variant="danger">{{ validation.value[0] }}</b-alert>
                </div>
              </div>
  
              <div class="form-group">
                <label>ADDRESS</label>
                <textarea v-model="user.address" class="form-control" rows="3"
                  placeholder="Masukkan alamat user"></textarea>
                <div v-if="validation.address" class="mt-2">
                  <b-alert show variant="danger">{{ validation.address[0] }}</b-alert>
                </div>
              </div>
              <div class="form-group">
                <label>PASSWORD</label>
                <input type="password" v-model="user.password" placeholder="Masukkan Password" class="form-control">
                <div v-if="validation.password" class="mt-2">
                  <b-alert show variant="danger">{{ validation.password[0] }}</b-alert>
                </div>
              </div>
  
              <button class="btn bg-gradient-info" type="submit"><i class="fa fa-paper-plane"></i>
                SIMPAN</button>
              <button class="btn bg-gradient-primary" type="reset"><i class="fa fa-redo"></i>
                RESET</button>
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
        title: "Tambah user Coffe Shop - Android Corners",
      };
    },
  
    data() {
      return {
        value: null,
        options: ['USER', 'ADMIN'],
        user: {
          image: "",
          name: "",
          roles: "",
          address: "",
          houseNumber: "",
          phoneNumber: "",
          city: "",
          email: "",
          password: "",
        },
  
        //state tags
  
        //state validation
        validation: [],
      };
    },
  
    methods: {
      handleFileChange(e) {
        //get image
        let image = (this.user.image = e.target.files[0]);
  
        //check fileType
        if (!image.type.match("image.*")) {
          //if fileType not allowed, then clear value and set null
          e.target.value = "";
  
          this.user.image = null;
  
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
  
      async storeUser() {
        //define formData
        let formData = new FormData();
  
        formData.append("image", this.user.image);
        formData.append("name", this.user.name);
        formData.append("email", this.user.email);
        formData.append("password", this.user.password);
        formData.append('roles', this.value)
        formData.append("address", this.user.address);
        formData.append("phoneNumber", this.user.phoneNumber);
        formData.append("houseNumber", this.user.houseNumber);
        formData.append("city", this.user.city);
  
        //sending data to server
        await this.$axios
          .post("/api/dashboard/users", formData)
          .then(() => {
            //sweet alert
            this.$swal.fire({
              title: "BERHASIL!",
              text: "Data Berhasil Disimpan!",
              icon: "success",
              showConfirmButton: false,
              timer: 2000,
            });
  
            //redirect, if success store data
            this.$router.push({
              name: "dashboard-user",
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
  
  <style>
  
  </style>