<template>
  <div class="flex min-h-screen bg-gray-100">
    <!-- Sidebar -->
    <aside class="w-64 bg-green-800 text-white flex flex-col">
      <div class="h-16 flex items-center justify-center text-2xl font-bold">
        <router-link to="/" class="text-yellow-400">Green</router-link>Energy Admin
      </div>

      <!-- Navigation -->
      <nav class="flex-1 px-4 py-6 space-y-2">
        <!-- Dashboard -->
        <router-link
          to="/procurement"
          class="block px-4 py-2 rounded text-gray-200 hover:bg-green-700 transition"
          active-class="bg-green-900 text-white font-semibold"
        >
          Procurement Dashboard
        </router-link>

      </nav>

      <!-- Logout -->
      <div class="px-4 py-6 border-t border-green-700">
        <button
          @click="logout"
          class="w-full px-4 py-2 bg-yellow-400 text-green-800 font-semibold rounded-md hover:bg-yellow-300 transition"
        >
          Logout
        </button>
      </div>
    </aside>

    <!-- Main Content -->
    <div class="flex-1 flex flex-col">
      <!-- Topbar -->
      <header class="bg-white shadow px-6 py-4 flex justify-between items-center">
        <h1 class="text-2xl font-bold text-green-800">{{ pageTitle }}</h1>
        <div class="flex items-center space-x-4">
          <span class="text-gray-700">Hello, {{ userName }}</span>
          <img src="https://via.placeholder.com/32" alt="Profile" class="w-8 h-8 rounded-full" />
        </div>
      </header>

      <!-- Page content handled by router -->
      <main class="flex-1 p-6 overflow-auto">
        <router-view></router-view>
      </main>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const userName = 'Admin Developer'

// Automatically display page title from route meta
const pageTitle = computed(() => route.meta?.title || route.name || 'Admin Page')

const logout = () => {
  alert('Logout clicked (frontend only)')
}
</script>

<style scoped>
/* Optional: add smooth transitions or hover effects */
</style>