<template>
  <div class="p-6 bg-gray-100 min-h-screen">
    <!-- Page Header -->
    <div class="flex justify-between items-center mb-6">
      <h1 class="text-2xl font-bold text-green-800">Reports</h1>
    </div>

    <!-- Filters -->
    <div class="flex flex-wrap gap-4 mb-6">
      <input
        type="date"
        v-model="startDate"
        class="px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-green-800"
      />
      <input
        type="date"
        v-model="endDate"
        class="px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-green-800"
      />
      <select v-model="reportType" class="px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-green-800">
        <option value="sales">Sales Summary</option>
        <option value="products">Products Performance</option>
        <option value="packages">Packages Performance</option>
      </select>
      <button @click="generateReport" class="px-4 py-2 bg-green-800 text-white rounded hover:bg-green-700 transition">
        Generate
      </button>
    </div>

    <!-- Reports Table -->
    <div class="overflow-auto bg-white rounded shadow">
      <table class="min-w-full divide-y divide-gray-200">
        <thead class="bg-green-100">
          <tr>
            <th v-for="col in tableColumns" :key="col" class="px-4 py-2 text-left text-gray-700 font-semibold">
              {{ col }}
            </th>
          </tr>
        </thead>
        <tbody class="divide-y divide-gray-200">
          <tr v-for="row in tableData" :key="row.id" class="hover:bg-gray-50">
            <td v-for="col in tableColumns" :key="col" class="px-4 py-2">{{ row[col] }}</td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Summary -->
    <div class="mt-6 bg-white p-4 rounded shadow">
      <h2 class="text-lg font-bold text-green-800 mb-2">Summary</h2>
      <p>Total Orders: <span class="font-semibold">{{ summary.totalOrders }}</span></p>
      <p>Total Revenue: <span class="font-semibold">₱ {{ summary.totalRevenue.toLocaleString() }}</span></p>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, computed } from 'vue'

// Sample data
const allOrders = ref([
  { id: 'ORD-001', customer: 'Juan Dela Cruz', items: [{ name: 'Solar Panel 5kW', type: 'Product', price: 10000 }], total: 12000, date: '2025-12-25' },
  { id: 'ORD-002', customer: 'Maria Santos', items: [{ name: 'Battery 3kWh', type: 'Product', price: 5000 }], total: 6200, date: '2025-12-26' },
  { id: 'ORD-003', customer: 'Jose Ramos', items: [{ name: 'Residential Installation', type: 'Service', price: 2000 }], total: 2000, date: '2025-12-27' },
])

const startDate = ref('')
const endDate = ref('')
const reportType = ref('sales')

// Table data
const tableColumns = ref([])
const tableData = ref([])
const summary = reactive({ totalOrders: 0, totalRevenue: 0 })

const generateReport = () => {
  // Filter by date
  const filteredOrders = allOrders.value.filter(o => {
    if (!startDate.value && !endDate.value) return true
    const orderDate = new Date(o.date)
    const start = startDate.value ? new Date(startDate.value) : null
    const end = endDate.value ? new Date(endDate.value) : null
    if (start && end) return orderDate >= start && orderDate <= end
    if (start) return orderDate >= start
    if (end) return orderDate <= end
    return true
  })

  // Reset table & summary
  tableColumns.value = []
  tableData.value = []
  summary.totalOrders = filteredOrders.length
  summary.totalRevenue = filteredOrders.reduce((sum, o) => sum + o.total, 0)

  if (reportType.value === 'sales') {
    tableColumns.value = ['id', 'customer', 'total', 'date']
    tableData.value = filteredOrders.map(o => ({ id: o.id, customer: o.customer, total: o.total, date: o.date }))
  } else if (reportType.value === 'products') {
    tableColumns.value = ['name', 'type', 'sold', 'revenue']
    const productMap = {}
    filteredOrders.forEach(o => {
      o.items.forEach(item => {
        if (item.type === 'Product') {
          if (!productMap[item.name]) productMap[item.name] = { name: item.name, type: item.type, sold: 0, revenue: 0 }
          productMap[item.name].sold += 1
          productMap[item.name].revenue += item.price
        }
      })
    })
    tableData.value = Object.values(productMap)
  } else if (reportType.value === 'packages') {
    tableColumns.value = ['name', 'sold', 'revenue']
    const packageMap = {}
    filteredOrders.forEach(o => {
      o.items.forEach(item => {
        if (item.type === 'Service') { // assuming services are part of packages
          if (!packageMap[item.name]) packageMap[item.name] = { name: item.name, sold: 0, revenue: 0 }
          packageMap[item.name].sold += 1
          packageMap[item.name].revenue += item.price
        }
      })
    })
    tableData.value = Object.values(packageMap)
  }
}
</script>

<style scoped>
/* Optional: smooth table hover */
</style>