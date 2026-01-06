<template>
    <div class="space-y-6">
      <!-- Overview Cards -->
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div class="bg-white rounded-lg shadow p-6">
          <h3 class="text-gray-500 font-semibold">Total Orders</h3>
          <p class="text-2xl font-bold text-green-800 mt-2">120</p>
        </div>
        <div class="bg-white rounded-lg shadow p-6">
          <h3 class="text-gray-500 font-semibold">Active Installations</h3>
          <p class="text-2xl font-bold text-green-800 mt-2">35</p>
        </div>
        <div class="bg-white rounded-lg shadow p-6">
          <h3 class="text-gray-500 font-semibold">Inventory Items</h3>
          <p class="text-2xl font-bold text-green-800 mt-2">58</p>
        </div>
        <div class="bg-white rounded-lg shadow p-6">
          <h3 class="text-gray-500 font-semibold">Commission Earned</h3>
          <p class="text-2xl font-bold text-yellow-400 mt-2">$12,400</p>
        </div>
      </div>

      <!-- Upcoming Installations Table -->
      <div class="bg-white rounded-lg shadow p-6">
        <h2 class="text-xl font-bold text-green-800 mb-4">Upcoming Installations</h2>
        <div class="overflow-x-auto">
          <table class="w-full table-auto border-collapse border border-gray-200">
            <thead class="bg-green-50">
              <tr>
                <th class="border px-4 py-2 text-left">Customer</th>
                <th class="border px-4 py-2 text-left">Address</th>
                <th class="border px-4 py-2 text-left">Product</th>
                <th class="border px-4 py-2 text-left">Date</th>
                <th class="border px-4 py-2 text-left">Status</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="install in installations" :key="install.id" class="hover:bg-gray-50">
                <td class="border px-4 py-2">{{ install.customer }}</td>
                <td class="border px-4 py-2">{{ install.address }}</td>
                <td class="border px-4 py-2">{{ install.product }}</td>
                <td class="border px-4 py-2">{{ install.date }}</td>
                <td class="border px-4 py-2">{{ install.status }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <!-- Recent Orders Table -->
      <div class="bg-white rounded-lg shadow p-6">
        <h2 class="text-xl font-bold text-green-800 mb-4">Recent Orders</h2>
        <div class="overflow-x-auto">
          <table class="w-full table-auto border-collapse border border-gray-200">
            <thead class="bg-green-50">
              <tr>
                <th class="border px-4 py-2 text-left">Order ID</th>
                <th class="border px-4 py-2 text-left">Customer</th>
                <th class="border px-4 py-2 text-left">Product</th>
                <th class="border px-4 py-2 text-left">Amount</th>
                <th class="border px-4 py-2 text-left">Status</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="order in orders" :key="order.id" class="hover:bg-gray-50">
                <td class="border px-4 py-2">{{ order.id }}</td>
                <td class="border px-4 py-2">{{ order.customer }}</td>
                <td class="border px-4 py-2">{{ order.product }}</td>
                <td class="border px-4 py-2">${{ order.amount }}</td>
                <td class="border px-4 py-2">{{ order.status }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <!-- Placeholder Charts -->
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div class="bg-white rounded-lg shadow p-6">
          <h2 class="text-xl font-bold text-green-800 mb-4">Monthly Revenue</h2>
          <div class="h-64 flex items-center justify-center text-gray-400">[Chart Placeholder]</div>
        </div>
        <div class="bg-white rounded-lg shadow p-6">
          <h2 class="text-xl font-bold text-green-800 mb-4">Energy Impact</h2>
          <div class="h-64 flex items-center justify-center text-gray-400">[Chart Placeholder]</div>
        </div>
      </div>
    </div>
</template>

<script setup>
import { ref } from 'vue'

// Dummy data for tables
const installations = ref([
  { id: 1, customer: 'Alice', address: '123 Solar St.', product: 'Solar Panel 5kW', date: '2025-12-25', status: 'Scheduled' },
  { id: 2, customer: 'Bob', address: '456 Renewable Rd.', product: 'Wind Turbine 2kW', date: '2025-12-26', status: 'Pending' },
  { id: 3, customer: 'Charlie', address: '789 Eco Ave.', product: 'Solar Panel 10kW', date: '2025-12-27', status: 'Scheduled' },
])

const orders = ref([
  { id: 'ORD-001', customer: 'Alice', product: 'Solar Panel 5kW', amount: 5000, status: 'Completed' },
  { id: 'ORD-002', customer: 'Bob', product: 'Wind Turbine 2kW', amount: 3000, status: 'Processing' },
  { id: 'ORD-003', customer: 'Charlie', product: 'Solar Panel 10kW', amount: 9000, status: 'Pending' },
])
</script>

<style scoped>
/* Optional: chart placeholder styling or hover effects handled by Tailwind */
</style>