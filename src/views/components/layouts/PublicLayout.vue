<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()

// Hide auth buttons on login & register pages (reactive to route changes)
const hideAuthButtons = computed(() => ['/login', '/register'].includes(route.path))
</script>


<template>
  <div class="min-h-screen flex flex-col bg-gray-50">
    <!-- Header -->
    <header class="bg-green-800 text-white shadow-md">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center h-16">
        <!-- Logo -->
        <router-link to="/" class="text-xl font-bold">
           <span class="text-yellow-400">Green</span>Energy
         </router-link>

        <!-- Navigation Links -->
        <nav class="space-x-4 flex items-center" v-if="!hideAuthButtons">
  <router-link
    to="/login"
    class="px-4 py-2 rounded-md hover:bg-green-700 transition"
  >
    Login
  </router-link>

  <router-link
    to="/register"
    class="px-4 py-2 rounded-md border border-yellow-400 text-yellow-400 hover:bg-yellow-400 hover:text-green-800 transition"
  >
    Partner With Us
  </router-link>
</nav>
      </div>
    </header>

    <!-- Main Content -->
    <main class="flex-1">
      <router-view></router-view>
    </main>

    <!-- Footer -->
    <footer class="bg-green-900 text-gray-200 mt-8">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex flex-col md:flex-row justify-between items-center">
        <p class="text-sm">&copy; 2025 GreenEnergy Platform. All rights reserved.</p>
        <div class="flex space-x-4 mt-2 md:mt-0">
          <a href="#" class="hover:text-yellow-400 transition">Careers</a>
          <a href="#" class="hover:text-yellow-400 transition">Contact</a>
          <a href="#" class="hover:text-yellow-400 transition">Privacy Policy</a>
          <a href="#" class="hover:text-yellow-400 transition">Terms of Service</a>
        </div>
      </div>
    </footer>
  </div>
</template>

<style scoped>
/* Optional: add custom scrollbars or small animations if desired */
</style>
