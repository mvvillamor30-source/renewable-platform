<template>
  <div class="min-h-screen bg-gray-100 p-6">
    <!-- Dashboard Header -->
    <div class="flex justify-between items-center mb-6">
      <h1 class="text-3xl font-bold text-green-800">Operations Dashboard</h1>
      <div class="text-gray-700">Hello, {{ userName }}</div>
    </div>

    <!-- Key Metrics Cards -->
    <div class="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
      <div class="bg-white rounded-lg shadow p-4">
        <h2 class="text-gray-500 font-semibold mb-2">Ongoing Installations</h2>
        <p class="text-2xl font-bold text-green-800">{{ metrics.ongoingInstallations }}</p>
      </div>

      <div class="bg-white rounded-lg shadow p-4">
        <h2 class="text-gray-500 font-semibold mb-2">Pending Service Requests</h2>
        <p class="text-2xl font-bold text-yellow-600">{{ metrics.pendingRequests }}</p>
      </div>

      <div class="bg-white rounded-lg shadow p-4">
        <h2 class="text-gray-500 font-semibold mb-2">Completed Projects</h2>
        <p class="text-2xl font-bold text-blue-600">{{ metrics.completedProjects }}</p>
      </div>

      <div class="bg-white rounded-lg shadow p-4">
        <h2 class="text-gray-500 font-semibold mb-2">Low Inventory Items</h2>
        <p class="text-2xl font-bold text-red-600">{{ metrics.lowStockItems }}</p>
      </div>
    </div>

    <!-- Installation Projects Table -->
    <div class="bg-white shadow rounded-lg p-6 mb-6">
      <h2 class="text-xl font-bold text-green-800 mb-4">Installation Projects</h2>
      <table class="w-full text-left border-collapse">
        <thead>
          <tr class="bg-gray-100">
            <th class="p-2 border-b">Project ID</th>
            <th class="p-2 border-b">Customer</th>
            <th class="p-2 border-b">Status</th>
            <th class="p-2 border-b">Assigned Installer</th>
            <th class="p-2 border-b">Start Date</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="project in projects" :key="project.id" class="hover:bg-gray-50">
            <td class="p-2 border-b">{{ project.id }}</td>
            <td class="p-2 border-b">{{ project.customer }}</td>
            <td class="p-2 border-b">
              <span 
                :class="{
                  'text-yellow-600': project.status === 'Pending',
                  'text-green-800': project.status === 'Ongoing',
                  'text-blue-600': project.status === 'Completed'
                }"
                class="font-semibold"
              >
                {{ project.status }}
              </span>
            </td>
            <td class="p-2 border-b">{{ project.installer }}</td>
            <td class="p-2 border-b">{{ project.startDate }}</td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Quality Reports Section -->
    <div class="bg-white shadow rounded-lg p-6">
      <h2 class="text-xl font-bold text-green-800 mb-4">Recent Quality Reports</h2>
      <ul class="space-y-2">
        <li v-for="report in qualityReports" :key="report.id" class="p-2 border rounded hover:bg-gray-50">
          <p class="font-semibold">{{ report.project }} - {{ report.installer }}</p>
          <p class="text-gray-600 text-sm">Status: {{ report.status }} | Submitted: {{ report.submitted }}</p>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const userName = 'Operations Manager'

// Example metrics
const metrics = ref({
  ongoingInstallations: 8,
  pendingRequests: 5,
  completedProjects: 12,
  lowStockItems: 3
})

// Example projects
const projects = ref([
  { id: 'P001', customer: 'John Doe', status: 'Ongoing', installer: 'Installer 1', startDate: '2025-12-20' },
  { id: 'P002', customer: 'Jane Smith', status: 'Pending', installer: 'Installer 2', startDate: '2025-12-22' },
  { id: 'P003', customer: 'Carlos Rivera', status: 'Completed', installer: 'Installer 3', startDate: '2025-12-18' }
])

// Example quality reports
const qualityReports = ref([
  { id: 1, project: 'P001', installer: 'Installer 1', status: 'Pass', submitted: '2025-12-23' },
  { id: 2, project: 'P003', installer: 'Installer 3', status: 'Pass', submitted: '2025-12-22' },
  { id: 3, project: 'P002', installer: 'Installer 2', status: 'Pending', submitted: '2025-12-24' }
])
</script>

<style scoped>
/* Optional: add small hover effects for table rows or cards */
</style>