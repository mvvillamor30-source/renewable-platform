<template>
  <div class="min-h-screen bg-gray-100 p-4 space-y-4">
    <!-- Header -->
    <div class="bg-green-800 text-white rounded-lg p-4">
      <h1 class="text-xl font-bold">Installer Dashboard</h1>
      <p class="text-sm opacity-90">Today’s Assignments</p>
    </div>

    <!-- Summary Cards -->
    <div class="grid grid-cols-2 gap-4">
      <div class="bg-white rounded-lg shadow p-4 text-center">
        <p class="text-sm text-gray-500">Today</p>
        <h2 class="text-2xl font-bold text-green-800">2</h2>
      </div>

      <div class="bg-white rounded-lg shadow p-4 text-center">
        <p class="text-sm text-gray-500">Pending</p>
        <h2 class="text-2xl font-bold text-yellow-600">1</h2>
      </div>
    </div>

    <!-- Task List -->
    <div class="bg-white rounded-lg shadow p-4">
      <h3 class="font-bold text-green-800 mb-3">Assigned Installations</h3>

      <div class="space-y-3">
        <router-link
          to="/installer/installations/1"
          class="block border rounded-lg p-3 hover:bg-gray-50"
        >
          <p class="font-semibold">Solar Panel Installation</p>
          <p class="text-sm text-gray-600">Cavite City</p>
          <span class="text-xs text-yellow-600 font-semibold">ONGOING</span>
        </router-link>

        <router-link
          to="/installer/installations/2"
          class="block border rounded-lg p-3 hover:bg-gray-50"
        >
          <p class="font-semibold">Battery Setup</p>
          <p class="text-sm text-gray-600">Imus, Cavite</p>
          <span class="text-xs text-gray-500 font-semibold">PENDING</span>
        </router-link>
      </div>
    </div>

    <!-- Quick Actions -->
    <div class="grid grid-cols-2 gap-4">
      <router-link
        to="/installer/checklist"
        class="bg-white rounded-lg shadow p-4 text-center hover:bg-gray-50"
      >
        <p class="text-green-800 font-semibold">QMS Checklist</p>
      </router-link>

      <router-link
        to="/installer/upload"
        class="bg-white rounded-lg shadow p-4 text-center hover:bg-gray-50"
      >
        <p class="text-green-800 font-semibold">Upload Photos</p>
      </router-link>
    </div>

    <!-- Bottom Navigation (Mobile) -->
    <div class="fixed bottom-0 left-0 right-0 bg-white border-t flex justify-around py-2">
      <router-link to="/installer/dashboard" class="text-green-800 text-sm">
        Home
      </router-link>
      <router-link to="/installer/installations" class="text-gray-600 text-sm">
        Jobs
      </router-link>
      <router-link to="/installer/profile" class="text-gray-600 text-sm">
        Profile
      </router-link>
    </div>
  </div>
</template>

<script setup>
// Mobile-only static UI (API later)
</script>

<style scoped>
/* Optimized for mobile view */
</style>