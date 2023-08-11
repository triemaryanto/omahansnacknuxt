<template>
  <div class="container-fluid py-4">     
    <div class="row">
      <div class="bg-success text-white py-2">
        <div class="container py-5">
          <h1 class="text-white">
            Best products & <br />
            brands in our store
          </h1>
          <p>
          Trendy Products, Factory Prices, Excellent Service
          </p>
          <button type="button" class="btn btn-outline-light">
          Learn more
          </button>
          <button type="button" class="btn bg-gradient-dark">
            <span class="pt-1">Purchase now</span>
          </button>
        </div>
      </div>
    </div>
    <div class="row">
      <div class="container my-5">
    <header class="mb-4">
      <h3>New products</h3>
    </header>
    <div class="row">
      <div v-for="items in product" :key="items.id" class="col-lg-3 col-md-6 col-sm-6 d-flex">
        <div class="card w-100 my-2 shadow-2-strong">
          <img :src="items.image" class="card-img-top" style="aspect-ratio: 1 / 1" />
          <div class="card-body d-flex flex-column">
            <h5 class="card-title">{{ items.name }}</h5>
            <p class="card-text">Rp. {{ items.price }}</p>
            <div class="card-footer d-flex align-items-end pt-3 px-0 pb-0 mt-auto">
              <a href="#!" class="btn bg-gradient-primary">Add to cart</a>
            </div>
          </div>
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
        title: 'Omahan Snack',
      }
    },
    data() {
      return {
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

    //fetching categories
    const product = await $axios.$get(
      `/api/mobile/product?q=${search}&page=${page}`
    );
   return {
    product:product.data.data,
   };
  },

  }
  </script>
  
  </script>
  
  <style>
  .icon-hover:hover {
  border-color: #3b71ca !important;
  background-color: white !important;
}

.icon-hover:hover i {
  color: #3b71ca !important;
}
  </style>
  