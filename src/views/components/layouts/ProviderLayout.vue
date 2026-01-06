<template>
  <div class="flex min-h-screen bg-gray-100">
    <!-- Sidebar -->
    <aside class="w-64 bg-green-800 text-white flex flex-col">
      <div class="h-16 flex items-center justify-center text-2xl font-bold">
        <router-link to="/" class="text-yellow-400">Green</router-link>Energy
      </div>
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
          Operations
        </router-link>

        <!-- Provider Management -->
        <router-link
          to="/admin/provider-management"
          class="block px-4 py-2 rounded text-gray-200 hover:bg-green-700 transition"
          active-class="bg-green-900 text-white font-semibold"
        >
          Human Resource
        </router-link>

        <!-- User Management -->
        <router-link
          to="/admin/user-management"
          class="block px-4 py-2 rounded text-gray-200 hover:bg-green-700 transition"
          active-class="bg-green-900 text-white font-semibold"
        >
          Customer Management
        </router-link>

        <!-- Transparency & Dispute Handling -->
        <router-link
          to="/admin/disputes"
          class="block px-4 py-2 rounded text-gray-200 hover:bg-green-700 transition"
          active-class="bg-green-900 text-white font-semibold"
        >
          Inventory
        </router-link>

        <!-- Commission & Revenue Management -->
        <router-link
          to="/admin/commission"
          class="block px-4 py-2 rounded text-gray-200 hover:bg-green-700 transition"
          active-class="bg-green-900 text-white font-semibold"
        >
          Procurement
        </router-link>

        <!-- Reports & Decision Support -->
        <router-link
          to="/admin/reports"
          class="block px-4 py-2 rounded text-gray-200 hover:bg-green-700 transition"
          active-class="bg-green-900 text-white font-semibold"
        >
          Marketplace
        </router-link>

        <!-- System Settings & Configuration -->
        <router-link
          to="/admin/settings"
          class="block px-4 py-2 rounded text-gray-200 hover:bg-green-700 transition"
          active-class="bg-green-900 text-white font-semibold"
        >
          Quality & Compliance
        </router-link>
        <router-link
          to="/admin/settings"
          class="block px-4 py-2 rounded text-gray-200 hover:bg-green-700 transition"
          active-class="bg-green-900 text-white font-semibold"
        >
          Sustainability and DSS
        </router-link>
      </nav>
      <div class="px-4 py-6 border-t border-green-700">
        <button @click="logout" class="w-full px-4 py-2 bg-yellow-400 text-green-800 font-semibold rounded-md hover:bg-yellow-300 transition">
          Logout
        </button>
      </div>
    </aside>

    <!-- Main Content -->
    <div class="flex-1 flex flex-col">
      <!-- Topbar -->
      <header class="bg-white shadow px-6 py-4 flex justify-between items-center">
        <h1 class="text-2xl font-bold text-green-800"></h1>
        <div class="flex items-center space-x-4">
          <span class="text-gray-700">Hello, </span>
          <img src="https://via.placeholder.com/32" alt="Profile" class="w-8 h-8 rounded-full"/>
        </div>
      </header>

      <!-- Content Area -->
      <main class="flex-1 p-6 overflow-auto">
        <router-view></router-view>
        <!-- Sub-modules as tabs/cards -->
        <div class="mb-6 flex flex-wrap gap-2">
          <button
            class="px-4 py-2 rounded-md font-semibold"
          >
          </button>
        </div>

        <!-- Sub-module content -->
        <div class="bg-white p-6 rounded shadow min-h-[300px]">
         
        </div>
      </main>
    </div>
  </div>
</template>

<script setup>

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