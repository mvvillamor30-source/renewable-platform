<template>
  <div class="min-h-screen bg-gray-100 p-6">
    <!-- Header -->
    <div class="flex justify-between items-center mb-6">
      <h1 class="text-3xl font-bold text-green-800">Procurement Dashboard</h1>
      <span class="text-gray-700">Hello, Procurement Staff</span>
    </div>

    <!-- Summary Cards -->
    <div class="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
      <div class="bg-white p-4 rounded shadow">
        <h2 class="text-gray-500 font-semibold">Suppliers</h2>
        <p class="text-2xl font-bold text-green-800">{{ stats.suppliers }}</p>
      </div>

      <div class="bg-white p-4 rounded shadow">
        <h2 class="text-gray-500 font-semibold">Pending Requests</h2>
        <p class="text-2xl font-bold text-yellow-600">{{ stats.pending }}</p>
      </div>

      <div class="bg-white p-4 rounded shadow">
        <h2 class="text-gray-500 font-semibold">Active Orders</h2>
        <p class="text-2xl font-bold text-blue-600">{{ stats.orders }}</p>
      </div>

      <div class="bg-white p-4 rounded shadow">
        <h2 class="text-gray-500 font-semibold">Monthly Cost</h2>
        <p class="text-2xl font-bold text-red-600">₱{{ stats.cost }}</p>
      </div>
    </div>

    <!-- Purchase Requests -->
    <div class="bg-white p-6 rounded shadow mb-6">
      <h2 class="text-xl font-bold text-green-800 mb-4">Purchase Requests</h2>
      <table class="w-full text-left border-collapse">
        <thead>
          <tr class="bg-gray-100">
            <th class="p-2 border-b">Request ID</th>
            <th class="p-2 border-b">Item</th>
            <th class="p-2 border-b">Quantity</th>
            <th class="p-2 border-b">Status</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="req in requests" :key="req.id" class="hover:bg-gray-50">
            <td class="p-2 border-b">#{{ req.id }}</td>
            <td class="p-2 border-b">{{ req.item }}</td>
            <td class="p-2 border-b">{{ req.qty }}</td>
            <td class="p-2 border-b">
              <span
                :class="req.status === 'Pending' ? 'text-yellow-600' : 'text-green-600'"
                class="font-semibold"
              >
                {{ req.status }}
              </span>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Supplier Overview -->
    <div class="bg-white p-6 rounded shadow">
      <h2 class="text-xl font-bold text-green-800 mb-4">Supplier Overview</h2>
      <ul class="space-y-2">
        <li v-for="supplier in suppliers" :key="supplier.id" class="border p-3 rounded">
          <p class="font-semibold">{{ supplier.name }}</p>
          <p class="text-sm text-gray-600">Deliveries: {{ supplier.deliveries }}</p>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const stats = ref({
  suppliers: 8,
  pending: 5,
  orders: 3,
  cost: '350,000'
})

const requests = ref([
  { id: 101, item: 'Solar Panel 450W', qty: 20, status: 'Pending' },
  { id: 102, item: 'Inverter 5kW', qty: 10, status: 'Approved' }
])

const suppliers = ref([
  { id: 1, name: 'SolarTech PH', deliveries: 12 },
  { id: 2, name: 'GreenVolt Supplies', deliveries: 8 }
])
</script>