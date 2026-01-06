<template>
  <div class="p-6 bg-gray-100 min-h-screen">
    <!-- Page Header -->
    <div class="flex justify-between items-center mb-6">
      <h1 class="text-2xl font-bold text-green-800">Payments</h1>
    </div>

    <!-- Search & Filter -->
    <div class="flex flex-wrap gap-4 mb-4">
      <input
        type="text"
        placeholder="Search by customer or payment ID..."
        v-model="searchQuery"
        class="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-800 flex-1"
      />
      <select v-model="filterStatus" class="px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-800">
        <option value="">All Status</option>
        <option value="Pending">Pending</option>
        <option value="Completed">Completed</option>
        <option value="Failed">Failed</option>
      </select>
    </div>

    <!-- Payments Table -->
    <div class="overflow-auto bg-white rounded shadow">
      <table class="min-w-full divide-y divide-gray-200">
        <thead class="bg-green-100">
          <tr>
            <th class="px-4 py-2 text-left text-gray-700 font-semibold">Payment ID</th>
            <th class="px-4 py-2 text-left text-gray-700 font-semibold">Customer</th>
            <th class="px-4 py-2 text-left text-gray-700 font-semibold">Order ID</th>
            <th class="px-4 py-2 text-left text-gray-700 font-semibold">Amount</th>
            <th class="px-4 py-2 text-left text-gray-700 font-semibold">Status</th>
            <th class="px-4 py-2 text-center text-gray-700 font-semibold">Actions</th>
          </tr>
        </thead>
        <tbody class="divide-y divide-gray-200">
          <tr v-for="payment in filteredPayments" :key="payment.id" class="hover:bg-gray-50">
            <td class="px-4 py-2">{{ payment.id }}</td>
            <td class="px-4 py-2">{{ payment.customer }}</td>
            <td class="px-4 py-2">{{ payment.orderId }}</td>
            <td class="px-4 py-2">₱ {{ payment.amount.toLocaleString() }}</td>
            <td class="px-4 py-2">
              <span
                :class="{
                  'px-2 py-1 rounded-full text-white text-sm': true,
                  'bg-gray-500': payment.status === 'Pending',
                  'bg-green-600': payment.status === 'Completed',
                  'bg-red-500': payment.status === 'Failed'
                }"
              >
                {{ payment.status }}
              </span>
            </td>
            <td class="px-4 py-2 flex justify-center gap-2">
              <button @click="viewPayment(payment)" class="px-2 py-1 bg-blue-500 text-white rounded hover:bg-blue-400">View</button>
              <button v-if="payment.status === 'Pending'" @click="confirmPayment(payment)" class="px-2 py-1 bg-green-800 text-white rounded hover:bg-green-700">Confirm Payment</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- View Payment Modal -->
    <div v-if="viewingPayment" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div class="bg-white rounded-lg shadow-lg p-6 w-full max-w-lg relative">
        <h2 class="text-xl font-bold text-green-800 mb-4">Payment Details - {{ viewingPayment.id }}</h2>
        <p><strong>Customer:</strong> {{ viewingPayment.customer }}</p>
        <p><strong>Order ID:</strong> {{ viewingPayment.orderId }}</p>
        <p><strong>Status:</strong> {{ viewingPayment.status }}</p>
        <p><strong>Amount:</strong> ₱{{ viewingPayment.amount.toLocaleString() }}</p>
        <p class="mt-2 font-semibold">Payment Method:</p>
        <p>{{ viewingPayment.method }}</p>

        <div class="flex justify-end gap-2 mt-4">
          <button @click="closeModal" class="px-4 py-2 bg-gray-300 rounded hover:bg-gray-200">Close</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

// Sample payment data
const payments = ref([
  { id: 'PAY-001', customer: 'Juan Dela Cruz', orderId: 'ORD-001', amount: 12000, status: 'Pending', method: 'GCash' },
  { id: 'PAY-002', customer: 'Maria Santos', orderId: 'ORD-002', amount: 6200, status: 'Completed', method: 'Credit Card' },
  { id: 'PAY-003', customer: 'Jose Ramos', orderId: 'ORD-003', amount: 8000, status: 'Failed', method: 'Bank Transfer' },
])

const searchQuery = ref('')
const filterStatus = ref('')

// Filtered payments
const filteredPayments = computed(() => {
  return payments.value.filter(p => {
    return (
      (!searchQuery.value || p.customer.toLowerCase().includes(searchQuery.value.toLowerCase()) || p.id.toLowerCase().includes(searchQuery.value.toLowerCase())) &&
      (!filterStatus.value || p.status === filterStatus.value)
    )
  })
})

// Modal state
const viewingPayment = ref(null)
const viewPayment = (payment) => { viewingPayment.value = payment }
const closeModal = () => { viewingPayment.value = null }

// Simulate confirming payment
const confirmPayment = (payment) => {
  if (confirm('Confirm this payment?')) {
    payment.status = 'Completed'
    alert('Payment confirmed successfully!')
  }
}
</script>

<style scoped>
/* Optional: smooth table hover */
</style>