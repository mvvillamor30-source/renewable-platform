<template>
  <div class="p-6 bg-gray-100 min-h-screen">
    <!-- Page Header -->
    <div class="flex justify-between items-center mb-6">
      <h1 class="text-2xl font-bold text-green-800">Orders</h1>
    </div>

    <!-- Search & Filter -->
    <div class="flex flex-wrap gap-4 mb-4">
      <input
        type="text"
        placeholder="Search by customer or order ID..."
        v-model="searchQuery"
        class="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-800 flex-1"
      />
      <select v-model="filterStatus" class="px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-800">
        <option value="">All Status</option>
        <option value="Pending">Pending</option>
        <option value="Processing">Processing</option>
        <option value="Completed">Completed</option>
        <option value="Cancelled">Cancelled</option>
      </select>
    </div>

    <!-- Orders Table -->
    <div class="overflow-auto bg-white rounded shadow">
      <table class="min-w-full divide-y divide-gray-200">
        <thead class="bg-green-100">
          <tr>
            <th class="px-4 py-2 text-left text-gray-700 font-semibold">Order ID</th>
            <th class="px-4 py-2 text-left text-gray-700 font-semibold">Customer</th>
            <th class="px-4 py-2 text-left text-gray-700 font-semibold">Items</th>
            <th class="px-4 py-2 text-left text-gray-700 font-semibold">Total</th>
            <th class="px-4 py-2 text-left text-gray-700 font-semibold">Status</th>
            <th class="px-4 py-2 text-center text-gray-700 font-semibold">Actions</th>
          </tr>
        </thead>
        <tbody class="divide-y divide-gray-200">
          <tr v-for="order in filteredOrders" :key="order.id" class="hover:bg-gray-50">
            <td class="px-4 py-2">{{ order.id }}</td>
            <td class="px-4 py-2">{{ order.customer }}</td>
            <td class="px-4 py-2">
              <ul class="list-disc list-inside">
                <li v-for="item in order.items" :key="item.id">{{ item.name }} ({{ item.type }})</li>
              </ul>
            </td>
            <td class="px-4 py-2">₱ {{ order.total.toLocaleString() }}</td>
            <td class="px-4 py-2">
              <span
                :class="{
                  'px-2 py-1 rounded-full text-white text-sm': true,
                  'bg-gray-500': order.status === 'Pending',
                  'bg-yellow-500': order.status === 'Processing',
                  'bg-green-600': order.status === 'Completed',
                  'bg-red-500': order.status === 'Cancelled'
                }"
              >
                {{ order.status }}
              </span>
            </td>
            <td class="px-4 py-2 flex justify-center gap-2">
              <button @click="viewOrder(order)" class="px-2 py-1 bg-blue-500 text-white rounded hover:bg-blue-400">View</button>
              <button v-if="order.status === 'Pending'" @click="confirmPayment(order)" class="px-2 py-1 bg-green-800 text-white rounded hover:bg-green-700">Confirm Payment</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- View Order Modal -->
    <div v-if="viewingOrder" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div class="bg-white rounded-lg shadow-lg p-6 w-full max-w-lg relative">
        <h2 class="text-xl font-bold text-green-800 mb-4">Order Details - {{ viewingOrder.id }}</h2>
        <p><strong>Customer:</strong> {{ viewingOrder.customer }}</p>
        <p><strong>Status:</strong> {{ viewingOrder.status }}</p>
        <p class="mt-2 font-semibold">Items:</p>
        <ul class="list-disc list-inside">
          <li v-for="item in viewingOrder.items" :key="item.id">{{ item.name }} ({{ item.type }}) - ₱{{ item.price.toLocaleString() }}</li>
        </ul>
        <p class="mt-2 font-bold">Total: ₱{{ viewingOrder.total.toLocaleString() }}</p>

        <div class="flex justify-end gap-2 mt-4">
          <button @click="closeModal" class="px-4 py-2 bg-gray-300 rounded hover:bg-gray-200">Close</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

// Sample data for demo
const orders = ref([
  {
    id: 'ORD-001',
    customer: 'Juan Dela Cruz',
    items: [
      { id: 1, name: 'Solar Panel 5kW', type: 'Product', price: 10000 },
      { id: 101, name: 'Installation', type: 'Service', price: 2000 },
    ],
    total: 12000,
    status: 'Pending',
  },
  {
    id: 'ORD-002',
    customer: 'Maria Santos',
    items: [
      { id: 2, name: 'Battery 3kWh', type: 'Product', price: 5000 },
      { id: 102, name: 'Battery Maintenance', type: 'Service', price: 1200 },
    ],
    total: 6200,
    status: 'Completed',
  },
])

const searchQuery = ref('')
const filterStatus = ref('')

// Filtered orders
const filteredOrders = computed(() => {
  return orders.value.filter(order => {
    return (
      (!searchQuery.value || order.customer.toLowerCase().includes(searchQuery.value.toLowerCase()) || order.id.toLowerCase().includes(searchQuery.value.toLowerCase())) &&
      (!filterStatus.value || order.status === filterStatus.value)
    )
  })
})

// Modal state
const viewingOrder = ref(null)
const viewOrder = (order) => { viewingOrder.value = order }
const closeModal = () => { viewingOrder.value = null }

// Simulate payment confirmation
const confirmPayment = (order) => {
  if (confirm('Confirm payment for this order?')) {
    order.status = 'Processing'
    alert('Payment confirmed! Order is now Processing.')
  }
}
</script>

<style scoped>
/* Optional: smooth table hover */
</style>