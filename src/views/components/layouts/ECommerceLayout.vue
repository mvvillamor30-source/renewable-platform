<script setup>
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()

// Simple auth check (same pattern you already use)
const isLoggedIn = computed(() => !!localStorage.getItem('token'))

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

<template>
  <div class="min-h-screen bg-gray-100 flex flex-col">
    <!-- TOP BAR -->
    <header class="bg-green-800 text-white">
      <div class="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        <!-- Logo -->
        <router-link to="/marketplace" class="text-2xl font-bold">
          <span class="text-yellow-400">Green</span>Energy
        </router-link>

        <!-- Navigation -->
        <nav class="flex items-center space-x-6">
          <router-link
            to="/marketplace"
            class="hover:text-yellow-300"
            :class="route.path.startsWith('/marketplace') ? 'font-semibold' : ''"
          >
            Marketplace
          </router-link>

          <!-- GUEST -->
          <template v-if="!isLoggedIn">
            <router-link
              to="/login"
              class="px-4 py-2 rounded bg-white text-green-800 font-medium hover:bg-gray-100"
            >
              Login
            </router-link>

            <router-link
              to="/customer-register"
              class="px-4 py-2 rounded bg-yellow-400 text-green-900 font-semibold hover:bg-yellow-300"
            >
              Sign Up
            </router-link>
          </template>

          <!-- LOGGED IN -->
          <template v-else>
            <button
              @click="logout"
              class="px-4 py-2 rounded bg-yellow-400 text-green-900 font-semibold hover:bg-yellow-300"
            >
              Logout
            </button>
            <router-link
              to="/customer-profile"
              class="px-4 py-2 rounded bg-yellow-400 text-green-900 font-semibold hover:bg-yellow-300"
            >
              Profile
            </router-link>
          </template>
        </nav>
      </div>
    </header>

    <!-- PAGE CONTENT -->
    <main class="flex-1 max-w-7xl mx-auto w-full p-6">
      <router-view />
    </main>
  </div>
</template>