<template>
  <div class="flex min-h-screen bg-gray-100">
    <!-- Sidebar -->
    <aside class="w-64 bg-green-800 text-white flex flex-col">
      <div class="h-16 flex items-center justify-center text-2xl font-bold">
        <router-link to="/" class="text-yellow-400">Green</router-link>Energy
      </div>

      <!-- Navigation -->
      <nav class="flex-1 px-4 py-6 space-y-2">

        <router-link
          to="/admin/profile"
          class="block px-4 py-2 rounded text-gray-200 hover:bg-green-700 transition"
          active-class="bg-green-900 text-white font-semibold"
        >
          Profile
        </router-link>

        <!-- Dashboard -->
        <router-link
          to="/admin"
          class="block px-4 py-2 rounded text-gray-200 hover:bg-green-700 transition"
          active-class="bg-green-900 text-white font-semibold"
        >
          Dashboard
        </router-link>

        <!-- Provider Management -->
        <router-link
          to="/admin/provider-management"
          class="block px-4 py-2 rounded text-gray-200 hover:bg-green-700 transition"
          active-class="bg-green-900 text-white font-semibold"
        >
          Provider Management
        </router-link>

        <!-- User Management -->
        <router-link
          to="/admin/user-management"
          class="block px-4 py-2 rounded text-gray-200 hover:bg-green-700 transition"
          active-class="bg-green-900 text-white font-semibold"
        >
          User Management
        </router-link>

        <!-- Transparency & Dispute Handling -->
        <router-link
          to="/admin/disputes"
          class="block px-4 py-2 rounded text-gray-200 hover:bg-green-700 transition"
          active-class="bg-green-900 text-white font-semibold"
        >
          Transparency & Dispute Handling
        </router-link>

        <!-- Commission & Revenue Management -->
        <router-link
          to="/admin/commission"
          class="block px-4 py-2 rounded text-gray-200 hover:bg-green-700 transition"
          active-class="bg-green-900 text-white font-semibold"
        >
          Commission & Revenue Management
        </router-link>

        <!-- Reports & Decision Support -->
        <router-link
          to="/admin/reports"
          class="block px-4 py-2 rounded text-gray-200 hover:bg-green-700 transition"
          active-class="bg-green-900 text-white font-semibold"
        >
          Reports & Decision Support
        </router-link>

        <!-- System Settings & Configuration -->
        <router-link
          to="/admin/settings"
          class="block px-4 py-2 rounded text-gray-200 hover:bg-green-700 transition"
          active-class="bg-green-900 text-white font-semibold"
        >
          System Settings & Configuration
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
      <main class="flex-1 p-6 overflow-auto">
        <router-view></router-view>
      </main>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { logout as logoutAPI } from '@/services/authService'

const route = useRoute()
const router = useRouter()

const userName = 'Admin Developer'

// Automatically display page title from route meta
const pageTitle = computed(() => route.meta?.title || route.name || 'Admin Page')

const logout = async () => {
  try {
    await logoutAPI() // ✅ call backend logout

    // Optional: clear frontend auth state
    localStorage.removeItem('token') // if using token auth
    localStorage.removeItem('user')
    alert('Logged out successfully.')

    // Redirect to login
    router.push('/login')
  } catch (err) {
    console.error(err)
    alert('Failed to logout. Please try again.')
  }
}
</script>


<style scoped>
/* Optional: add smooth transitions or hover effects */
</style>