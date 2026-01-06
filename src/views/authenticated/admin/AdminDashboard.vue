<template>
    <div class="space-y-6">
      <!-- Overview Cards -->
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div class="bg-white rounded-lg shadow p-6">
          <h3 class="text-gray-500 font-semibold">Total Providers</h3>
          <p class="text-2xl font-bold text-green-800 mt-2">25</p>
        </div>
        <div class="bg-white rounded-lg shadow p-6">
          <h3 class="text-gray-500 font-semibold">Pending Approvals</h3>
          <p class="text-2xl font-bold text-yellow-400 mt-2">5</p>
        </div>
        <div class="bg-white rounded-lg shadow p-6">
          <h3 class="text-gray-500 font-semibold">Total Orders</h3>
          <p class="text-2xl font-bold text-green-800 mt-2">320</p>
        </div>
        <div class="bg-white rounded-lg shadow p-6">
          <h3 class="text-gray-500 font-semibold">Total Commission</h3>
          <p class="text-2xl font-bold text-yellow-400 mt-2">$45,200</p>
        </div>
      </div>

      <!-- Provider Management Table -->
      <div class="bg-white rounded-lg shadow p-6">
        <h2 class="text-xl font-bold text-green-800 mb-4">Provider Management</h2>
        <div class="overflow-x-auto">
          <table class="w-full table-auto border-collapse border border-gray-200">
            <thead class="bg-green-50">
              <tr>
                <th class="border px-4 py-2 text-left">Company</th>
                <th class="border px-4 py-2 text-left">Contact Person</th>
                <th class="border px-4 py-2 text-left">Email</th>
                <th class="border px-4 py-2 text-left">Status</th>
                <th class="border px-4 py-2 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="provider in providers" :key="provider.id" class="hover:bg-gray-50">
                <td class="border px-4 py-2">{{ provider.company }}</td>
                <td class="border px-4 py-2">{{ provider.contact }}</td>
                <td class="border px-4 py-2">{{ provider.email }}</td>
                <td class="border px-4 py-2">{{ provider.status }}</td>
                <td class="border px-4 py-2 space-x-2">
                  <button class="px-3 py-1 bg-green-800 text-white rounded hover:bg-green-700 transition">Approve</button>
                  <button class="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-500 transition">Reject</button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <!-- Commission Overview Table -->
      <div class="bg-white rounded-lg shadow p-6">
        <h2 class="text-xl font-bold text-green-800 mb-4">Commission Overview</h2>
        <div class="overflow-x-auto">
          <table class="w-full table-auto border-collapse border border-gray-200">
            <thead class="bg-green-50">
              <tr>
                <th class="border px-4 py-2 text-left">Provider</th>
                <th class="border px-4 py-2 text-left">Total Orders</th>
                <th class="border px-4 py-2 text-left">Commission Earned</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="commission in commissions" :key="commission.id" class="hover:bg-gray-50">
                <td class="border px-4 py-2">{{ commission.provider }}</td>
                <td class="border px-4 py-2">{{ commission.orders }}</td>
                <td class="border px-4 py-2">${{ commission.amount }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <!-- Placeholder Charts -->
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div class="bg-white rounded-lg shadow p-6">
          <h2 class="text-xl font-bold text-green-800 mb-4">Monthly Orders</h2>
          <div class="h-64 flex items-center justify-center text-gray-400">[Chart Placeholder]</div>
        </div>
        <div class="bg-white rounded-lg shadow p-6">
          <h2 class="text-xl font-bold text-green-800 mb-4">Commission Trend</h2>
          <div class="h-64 flex items-center justify-center text-gray-400">[Chart Placeholder]</div>
        </div>
      </div>
    </div>
</template>

<script setup>
import { ref } from 'vue'

// Dummy data
const providers = ref([
  { id: 1, company: 'Solar Solutions Inc.', contact: 'John Doe', email: 'contact@solar.com', status: 'Pending' },
  { id: 2, company: 'Eco Energy Corp.', contact: 'Alice Smith', email: 'alice@eco.com', status: 'Approved' },
  { id: 3, company: 'Renewable Tech', contact: 'Bob Johnson', email: 'bob@renewable.com', status: 'Pending' },
])

const commissions = ref([
  { id: 1, provider: 'Solar Solutions Inc.', orders: 20, amount: 5000 },
  { id: 2, provider: 'Eco Energy Corp.', orders: 15, amount: 4200 },
  { id: 3, provider: 'Renewable Tech', orders: 10, amount: 3000 },
])
</script>

<style scoped>
/* Optional: hover and table styles handled by Tailwind */
</style>
