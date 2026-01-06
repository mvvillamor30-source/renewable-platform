<template>
  <div class="flex min-h-screen bg-gray-100">
    <!-- Sidebar -->
    <aside class="w-64 bg-green-800 text-white flex flex-col">
      <!-- Logo / Brand -->
      <div class="h-16 flex items-center justify-center text-2xl font-bold">
        <router-link to="/" class="text-yellow-400">Green</router-link>Energy
      </div>

      <!-- Marketplace Sub-Modules in Sidebar -->
      <nav class="flex-1 px-4 py-6 space-y-2">
        <button
          v-for="sub in subModules"
          :key="sub.name"
          @click="switchSubModule(sub)"
          class="w-full text-left px-4 py-2 rounded hover:bg-green-700 transition"
          :class="activeSubModule.name === sub.name ? 'bg-green-900 font-semibold' : ''"
        >
          {{ sub.name }}
        </button>
      </nav>

      <!-- Logout -->
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
        <h1 class="text-2xl font-bold text-green-800">{{ activeSubModule.name }}</h1>
        <div class="flex items-center space-x-4">
          <span class="text-gray-700">Hello, {{ userName }}</span>
          <img src="https://via.placeholder.com/32" alt="Profile" class="w-8 h-8 rounded-full"/>
        </div>
      </header>

      <!-- Content Area -->
      <main class="flex-1 p-6 overflow-auto">
        <!-- Sub-module content -->
        <div class="bg-white p-6 rounded shadow min-h-[400px]">
          <component :is="activeSubModule.component"></component>
        </div>
      </main>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import Products from  '@/views/authenticated/provider/marketplace/Products.vue'
import Services from '@/views/authenticated/provider/marketplace/Services.vue'
import Packages from '@/views/authenticated/provider/marketplace/Packages.vue'
import Orders from '@/views/authenticated/provider/marketplace/Orders.vue'
import Payments from '@/views/authenticated/provider/marketplace/Payments.vue'
import Reports from '@/views/authenticated/provider/marketplace/Reports.vue'
import Dashboard from '@/views/authenticated/provider/marketplace/SalesDashboard.vue'

// Placeholder component for demo
const Placeholder = {
  props: ['title'],
  template: '<div><h2 class="text-xl font-bold mb-2">{{ title }}</h2><p>This is a placeholder for the {{ title }} page.</p></div>'
}

const userName = ref('John Doe')

// Marketplace Sub-Modules (for Sales Staff visualization)
const subModules = ref([
  { name: 'Dashboard', component: Dashboard},
  { name: 'Products', component: Products },
  { name: 'Services', component: Services},
  { name: 'Packages', component: Packages},
  { name: 'Orders', component: Orders},
  { name: 'Payments', component: Payments },
  { name: 'Reports', component: Reports },
])

const activeSubModule = ref(subModules.value[0])

const switchSubModule = (sub) => {
  activeSubModule.value = sub
}

const logout = () => {
  alert('Logout clicked (frontend only)')
}
</script>

<style scoped>
/* Optional: smooth hover transitions for sidebar & buttons */
</style>