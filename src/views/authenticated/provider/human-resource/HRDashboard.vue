<template>
  <div class="min-h-screen bg-gray-100 p-6">
    <!-- Header -->
    <div class="flex justify-between items-center mb-6">
      <h1 class="text-3xl font-bold text-green-800">HR Dashboard</h1>
      <span class="text-gray-700">Hello, HR Staff</span>
    </div>

    <!-- Summary Cards -->
    <div class="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
      <div class="bg-white p-4 rounded-lg shadow">
        <h2 class="text-gray-500 font-semibold">Total Employees</h2>
        <p class="text-2xl font-bold text-green-800">{{ stats.totalEmployees }}</p>
      </div>

      <div class="bg-white p-4 rounded-lg shadow">
        <h2 class="text-gray-500 font-semibold">Active Installers</h2>
        <p class="text-2xl font-bold text-blue-600">{{ stats.installers }}</p>
      </div>

      <div class="bg-white p-4 rounded-lg shadow">
        <h2 class="text-gray-500 font-semibold">Present Today</h2>
        <p class="text-2xl font-bold text-green-600">{{ stats.present }}</p>
      </div>

      <div class="bg-white p-4 rounded-lg shadow">
        <h2 class="text-gray-500 font-semibold">Pending Evaluations</h2>
        <p class="text-2xl font-bold text-yellow-600">{{ stats.pendingEvaluations }}</p>
      </div>
    </div>

    <!-- Employee Overview -->
    <div class="bg-white p-6 rounded-lg shadow mb-6">
      <h2 class="text-xl font-bold text-green-800 mb-4">Employee Overview</h2>
      <table class="w-full text-left border-collapse">
        <thead>
          <tr class="bg-gray-100">
            <th class="p-2 border-b">Name</th>
            <th class="p-2 border-b">Role</th>
            <th class="p-2 border-b">Status</th>
            <th class="p-2 border-b">Last Attendance</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="employee in employees" :key="employee.id" class="hover:bg-gray-50">
            <td class="p-2 border-b">{{ employee.name }}</td>
            <td class="p-2 border-b">{{ employee.role }}</td>
            <td class="p-2 border-b">
              <span
                :class="employee.status === 'Active' ? 'text-green-600' : 'text-gray-500'"
                class="font-semibold"
              >
                {{ employee.status }}
              </span>
            </td>
            <td class="p-2 border-b">{{ employee.lastAttendance }}</td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Performance & Commission Summary -->
    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
      <!-- Performance -->
      <div class="bg-white p-6 rounded-lg shadow">
        <h2 class="text-xl font-bold text-green-800 mb-4">Performance Summary</h2>
        <ul class="space-y-2">
          <li v-for="perf in performance" :key="perf.id" class="border p-3 rounded">
            <p class="font-semibold">{{ perf.name }} ({{ perf.role }})</p>
            <p class="text-sm text-gray-600">Rating: {{ perf.rating }} / 5</p>
          </li>
        </ul>
      </div>

      <!-- Commission (Read-only) -->
      <div class="bg-white p-6 rounded-lg shadow">
        <h2 class="text-xl font-bold text-green-800 mb-4">Commission Overview</h2>
        <ul class="space-y-2">
          <li v-for="commission in commissions" :key="commission.id" class="border p-3 rounded">
            <p class="font-semibold">{{ commission.name }}</p>
            <p class="text-sm text-gray-600">Total Commission: ₱{{ commission.amount }}</p>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const stats = ref({
  totalEmployees: 24,
  installers: 10,
  present: 18,
  pendingEvaluations: 4
})

const employees = ref([
  { id: 1, name: 'Juan Dela Cruz', role: 'Installer', status: 'Active', lastAttendance: '2025-01-26' },
  { id: 2, name: 'Maria Santos', role: 'Sales Staff', status: 'Active', lastAttendance: '2025-01-26' },
  { id: 3, name: 'Pedro Reyes', role: 'Technician', status: 'Inactive', lastAttendance: '2025-01-24' }
])

const performance = ref([
  { id: 1, name: 'Juan Dela Cruz', role: 'Installer', rating: 4.5 },
  { id: 2, name: 'Maria Santos', role: 'Sales Staff', rating: 4.2 }
])

const commissions = ref([
  { id: 1, name: 'Juan Dela Cruz', amount: 12500 },
  { id: 2, name: 'Maria Santos', amount: 9800 }
])
</script>