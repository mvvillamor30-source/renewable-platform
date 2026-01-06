<template>
  <div class="p-6 bg-gray-100 min-h-screen">
    <!-- Page Header -->
    <div class="flex justify-between items-center mb-6">
      <h1 class="text-2xl font-bold text-green-800">Dashboard</h1>
      <span class="text-gray-700">Hello, {{ userName }}</span>
    </div>

    <!-- Stats Cards -->
    <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
      <div class="bg-white p-4 rounded shadow flex justify-between items-center">
        <div>
          <h2 class="text-gray-500 font-semibold">Total Orders</h2>
          <p class="text-2xl font-bold text-green-800">{{ totalOrders }}</p>
        </div>
        <span class="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm">Orders</span>
      </div>

      <div class="bg-white p-4 rounded shadow flex justify-between items-center">
        <div>
          <h2 class="text-gray-500 font-semibold">Total Revenue</h2>
          <p class="text-2xl font-bold text-green-800">₱ {{ totalRevenue.toLocaleString() }}</p>
        </div>
        <span class="bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-sm">Revenue</span>
      </div>

      <div class="bg-white p-4 rounded shadow flex justify-between items-center">
        <div>
          <h2 class="text-gray-500 font-semibold">Active Products</h2>
          <p class="text-2xl font-bold text-green-800">{{ totalProducts }}</p>
        </div>
        <span class="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">Products</span>
      </div>
    </div>

    <!-- Charts Section -->
    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
      <!-- Orders by Status -->
      <div class="bg-white p-4 rounded shadow">
        <h2 class="text-lg font-bold text-green-800 mb-4">Orders by Status</h2>
        <div class="flex justify-around">
          <div class="text-center">
            <p class="text-gray-500">Pending</p>
            <p class="text-xl font-bold text-gray-800">{{ ordersByStatus.Pending }}</p>
          </div>
          <div class="text-center">
            <p class="text-gray-500">Processing</p>
            <p class="text-xl font-bold text-yellow-600">{{ ordersByStatus.Processing }}</p>
          </div>
          <div class="text-center">
            <p class="text-gray-500">Completed</p>
            <p class="text-xl font-bold text-green-800">{{ ordersByStatus.Completed }}</p>
          </div>
          <div class="text-center">
            <p class="text-gray-500">Cancelled</p>
            <p class="text-xl font-bold text-red-600">{{ ordersByStatus.Cancelled }}</p>
          </div>
        </div>
      </div>

      <!-- Revenue by Product -->
      <div class="bg-white p-4 rounded shadow">
        <h2 class="text-lg font-bold text-green-800 mb-4">Top Selling Products</h2>
        <ul class="space-y-2">
          <li v-for="prod in topProducts" :key="prod.name" class="flex justify-between">
            <span>{{ prod.name }}</span>
            <span>₱ {{ prod.revenue.toLocaleString() }}</span>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

// User
const userName = ref('John Doe')

// Sample Stats
const totalOrders = ref(25)
const totalRevenue = ref(120000)
const totalProducts = ref(12)

// Orders by Status
const ordersByStatus = ref({
  Pending: 5,
  Processing: 7,
  Completed: 12,
  Cancelled: 1,
})

// Top Selling Products
const topProducts = ref([
  { name: 'Solar Panel 5kW', revenue: 50000 },
  { name: 'Battery 3kWh', revenue: 30000 },
  { name: 'Residential Installation', revenue: 25000 },
])
</script>

<style scoped>
/* Optional: add transitions or hover effects */
</style>