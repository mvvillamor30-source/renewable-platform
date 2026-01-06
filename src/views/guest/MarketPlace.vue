<script setup>
import { useRouter } from 'vue-router'
const router = useRouter()
</script>

<template>
  <div class="p-6">
    <h1 class="text-2xl font-bold mb-4">Marketplace</h1>

    <div class="flex gap-4 mb-6">
      <button @click="router.push('/marketplace/products')" class="btn">Products</button>
      <button @click="router.push('/marketplace/services')" class="btn">Services</button>
      <button @click="router.push('/marketplace/packages')" class="btn">Packages</button>
    </div>

    <router-view />
  </div>
</template>