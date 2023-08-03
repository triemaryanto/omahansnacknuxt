<template>
    <div class="container-fluid py-4">
      <!-- Content Wrapper. Contains page content -->
      <div class="row">
        <div class="col-xl-3 col-sm-6 mb-xl-0 mb-4">
          <div class="card">
            <div class="card-body p-3">
              <div class="row">
                <div class="col-8">
                  <div class="numbers">
                    <p class="text-sm mb-0 text-capitalize font-weight-bold">Total User</p>
                    <h5 class="font-weight-bolder mb-0">
                      {{ users }}
                      <span class="text-danger text-sm font-weight-bolder">Users</span>
                    </h5>
                  </div>
                </div>
                <div class="col-4 text-end">
  
                  <i class="ni ni-single-02 text-lg opacity-10" aria-hidden="true"></i>
  
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="col-xl-3 col-sm-6 mb-xl-0 mb-4">
          <div class="card">
            <div class="card-body p-3">
              <div class="row">
                <div class="col-8">
                  <div class="numbers">
                    <p class="text-sm mb-0 text-capitalize font-weight-bold">Total Categories</p>
                    <h5 class="font-weight-bolder mb-0">
                      {{ categories }}
                      <span class="text-danger text-sm font-weight-bolder">Categories</span>
                    </h5>
                  </div>
                </div>
                <div class="col-4 text-end">
                  <i class="ni ni-single-copy-04 text-lg opacity-10" aria-hidden="true"></i>
  
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="col-xl-3 col-sm-6 mb-xl-0 mb-4">
          <div class="card">
            <div class="card-body p-3">
              <div class="row">
                <div class="col-8">
                  <div class="numbers">
                    <p class="text-sm mb-0 text-capitalize font-weight-bold">Total Posts</p>
                    <h5 class="font-weight-bolder mb-0">
                      {{ posts }}
                      <span class="text-danger text-sm font-weight-bolder">Posts</span>
                    </h5>
                  </div>
                </div>
                <div class="col-4 text-end">
                  <i class="ni ni-collection text-lg opacity-10" aria-hidden="true"></i>
  
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="col-xl-3 col-sm-6">
          <div class="card">
            <div class="card-body p-3">
              <div class="row">
                <div class="col-8">
                  <div class="numbers">
                    <p class="text-sm mb-0 text-capitalize font-weight-bold">Total Products</p>
                    <h5 class="font-weight-bolder mb-0">
                      {{ products }}
                      <span class="text-danger text-sm font-weight-bolder">Products</span>
                    </h5>
                  </div>
                </div>
                <div class="col-4 text-end">
  
                  <i class="ni ni-shop text-lg opacity-10" aria-hidden="true"></i>
  
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="row row mt-4">
        <div class="col-xl-3 col-sm-6 mb-xl-0 mb-4">
          <div class="card">
            <div class="card-body p-3">
              <div class="row">
                <div class="col-8">
                  <div class="numbers">
                    <p class="text-sm mb-0 text-capitalize font-weight-bold">Total Transactions</p>
                    <h5 class="font-weight-bolder mb-0">
                      {{ transactions }}
                      <span class="text-danger text-sm font-weight-bolder">Transactions</span>
                    </h5>
                  </div>
                </div>
                <div class="col-4 text-end">
  
                  <i class="ni ni-money-coins text-lg opacity-10" aria-hidden="true"></i>
  
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="col-xl-3 col-sm-6 mb-xl-0 mb-4">
          <div class="card">
            <div class="card-body p-3">
              <div class="row">
                <div class="col-8">
                  <div class="numbers">
                    <p class="text-sm mb-0 text-capitalize font-weight-bold">Total Comments</p>
                    <h5 class="font-weight-bolder mb-0">
                      {{ comments }}
                      <span class="text-danger text-sm font-weight-bolder">Comments</span>
                    </h5>
                  </div>
                </div>
                <div class="col-4 text-end">
  
                  <i class="ni ni-chat-round text-lg opacity-10" aria-hidden="true"></i>
  
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="row mt-4">
        <div class="col-lg-7 mb-lg-0 mb-4">
          <div class="card">
            <div class="card-body p-3">
              <div class="row">
                <div class="col-lg-6">
                  <div class="d-flex flex-column h-100">
                    <p class="mb-1 pt-2 text-bold">Recent Post</p>
                    <h5 class="font-weight-bolder">{{ title }}</h5>
                    <p class="mb-5">{{ shortText }}...</p>
                    <nuxt-link :to="{ name: 'dashboard-post' }"
                      class="text-body text-sm font-weight-bold mb-0 icon-move-right mt-auto">
                      View All Post
                      <i class="fas fa-arrow-right text-sm ms-1" aria-hidden="true"></i>
                    </nuxt-link>
                  </div>
                </div>
                <div class="col-lg-5 ms-auto text-center mt-5 mt-lg-0">
                  <div class="border-radius-lg h-100">
                    <template>
                      <img class="position-absolute h-100 w-90 top-0 d-lg-block d-none border-radius-lg h-100"
                        :src="avatar"  />
                    </template>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="col-lg-5">
          <div class="card h-100 p-3">
            <div class="overflow-hidden position-relative border-radius-lg bg-cover h-100"
              :style="{ backgroundImage: 'url(' + image + ')' }">
              <span class="mask bg-gradient-dark"></span>
              <div class="card-body position-relative z-index-1 d-flex flex-column h-100 p-3">
                <h5 class="text-white font-weight-bolder mb-4 pt-2">{{ name }}</h5>
                <p class="text-white"></p>
                <nuxt-link :to="{ name: 'dashboard-product' }"
                  class="text-white text-sm font-weight-bold mb-0 icon-move-right mt-auto">
                  View All Product
                  <i class="fas fa-arrow-right text-sm ms-1" aria-hidden="true"></i>
                </nuxt-link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    //layout
    layout: 'dashboard',
  
    //meta
    head() {
      return {
        title: 'Dashboard - Coffe Shop - Android Corners',
      }
    },
    computed: {
      shortText() {
        return this.description.substr(0, 50)
      }
    },
    async asyncData({ $axios }) {
  
      //fetching dashboard
      const post = await $axios.$get('/api/dashboard/post')
      const dashboard = await $axios.$get('/api/dashboard/count')
      const product = await $axios.$get('/api/dashboard/product')
  
      return {
        'title': post.data.title,
        'avatar': post.data.image,
        'description': post.data.description,
        'users': dashboard.data.users,
        'categories': dashboard.data.categories,
        'comments': dashboard.data.comments,
        'posts': dashboard.data.posts,
        'transactions': dashboard.data.transactions,
        'products': dashboard.data.products,
        'image': product.data.image,
        'name': product.data.name,
      }
    },
  }
  </script>
  
  }
  </script>
  
  <style>
  
  </style>
  