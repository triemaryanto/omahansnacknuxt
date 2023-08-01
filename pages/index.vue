<template>
  <div class="row">
    <div class="col-xl-4 col-lg-5 col-md-6 d-flex flex-column mx-auto">
      <div class="card card-plain mt-8">
        <div class="card-header pb-0 text-left bg-transparent">
          <h3 class="font-weight-bolder text-info text-gradient">
            Omahan Snack
          </h3>
          <p class="mb-0">Enter your email and password to sign in</p>
        </div>
        <div class="card-body">
          <div v-if="validation.message" class="mt-2">
            <b-alert show variant="danger">{{ validation.message }}</b-alert>
          </div>
          <form @submit.prevent="login">
            <label>Email</label>
            <div class="mb-3">
              <input
                type="email"
                v-model="user.email"
                :class="{ 'is-invalid': validation.email }"
                class="form-control"
                placeholder="Masukkan Alamat Email"
              />
            </div>
            <div v-if="validation.email" class="mt-2">
              <b-alert show variant="danger">{{ validation.email[0] }}</b-alert>
            </div>
            <label>Password</label>
            <div class="mb-3">
              <input
                type="password"
                v-model="user.password"
                :class="{ 'is-invalid': validation.password }"
                class="form-control"
                placeholder="Masukkan Password"
              />
            </div>
            <div v-if="validation.password" class="mt-2">
              <b-alert show variant="danger">{{
                validation.password[0]
              }}</b-alert>
            </div>
            <div class="text-center">
              <button
                type="submit"
                class="btn bg-gradient-info w-100 mt-4 mb-0"
              >
                Sign in
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  //layout
  layout: "auth",

  //meta
  head() {
    return {
      title: "Omahan Snack",
    };
  },

  data() {
    return {
      //state user
      user: {
        email: "",
        password: "",
      },
      //validation
      validation: [],
    };
  },

  methods: {
    async login() {
      await this.$auth
        .loginWith("local", {
          data: {
            email: this.user.email,
            password: this.user.password,
          },
        })

        .then(() => {
          //redirect
          this.$router.push({
            name: "dashboard-main",
          });
        })

        .catch((error) => {
          //assign validation
          this.validation = error.response.data;
        });
    },
  },
};
</script>

<style></style>
