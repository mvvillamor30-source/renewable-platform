<template>
  <div class="min-h-screen bg-gray-100 p-6">
    <!-- Header -->
    <div class="flex justify-between items-center mb-6">
      <h1 class="text-3xl font-bold text-green-800">Inventory Dashboard</h1>
      <span class="text-gray-700">Hello, Inventory Staff</span>
    </div>

    <!-- Summary Cards -->
    <div class="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
      <div class="bg-white p-4 rounded shadow">
        <h2 class="text-gray-500 font-semibold">Total Products</h2>
        <p class="text-2xl font-bold text-green-800">{{ stats.products }}</p>
      </div>

      <div class="bg-white p-4 rounded shadow">
        <h2 class="text-gray-500 font-semibold">Tools & Equipment</h2>
        <p class="text-2xl font-bold text-blue-600">{{ stats.tools }}</p>
      </div>

      <div class="bg-white p-4 rounded shadow">
        <h2 class="text-gray-500 font-semibold">Low Stock Items</h2>
        <p class="text-2xl font-bold text-red-600">{{ stats.lowStock }}</p>
      </div>

      <div class="bg-white p-4 rounded shadow">
        <h2 class="text-gray-500 font-semibold">Stock Movements Today</h2>
        <p class="text-2xl font-bold text-yellow-600">{{ stats.movements }}</p>
      </div>
    </div>

    <!-- Inventory Table -->
    <div class="bg-white p-6 rounded shadow mb-6">
      <h2 class="text-xl font-bold text-green-800 mb-4">Product Inventory</h2>
      <table class="w-full text-left border-collapse">
        <thead>
          <tr class="bg-gray-100">
            <th class="p-2 border-b">Item</th>
            <th class="p-2 border-b">Category</th>
            <th class="p-2 border-b">Stock</th>
            <th class="p-2 border-b">Status</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in inventory" :key="item.id" class="hover:bg-gray-50">
            <td class="p-2 border-b">{{ item.name }}</td>
            <td class="p-2 border-b">{{ item.category }}</td>
            <td class="p-2 border-b">{{ item.stock }}</td>
            <td class="p-2 border-b">
              <span
                :class="item.stock <= 5 ? 'text-red-600' : 'text-green-600'"
                class="font-semibold"
              >
                {{ item.stock <= 5 ? 'Low Stock' : 'Available' }}
              </span>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Recent Stock Movements -->
    <div class="bg-white p-6 rounded shadow">
      <h2 class="text-xl font-bold text-green-800 mb-4">Recent Stock Movements</h2>
      <ul class="space-y-2">
        <li v-for="log in movements" :key="log.id" class="border p-3 rounded">
          <p class="font-semibold">{{ log.item }}</p>
          <p class="text-sm text-gray-600">{{ log.type }} – {{ log.date }}</p>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const stats = ref({
  products: 42,
  tools: 18,
  lowStock: 6,
  movements: 9
})

const inventory = ref([
  { id: 1, name: 'Solar Panel 450W', category: 'Panels', stock: 12 },
  { id: 2, name: 'Inverter 5kW', category: 'Inverters', stock: 4 },
  { id: 3, name: 'Mounting Rails', category: 'Accessories', stock: 20 }
])

const movements = ref([
  { id: 1, item: 'Inverter 5kW', type: 'Stock Out', date: '2025-01-26' },
  { id: 2, item: 'Solar Panel 450W', type: 'Stock In', date: '2025-01-25' }
])
</script>