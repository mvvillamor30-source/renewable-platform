<template>
  <div class="space-y-6">
    <!-- Welcome -->
    <div class="bg-white rounded-lg shadow p-6">
      <h2 class="text-2xl font-bold text-green-800">
        Welcome to GreenEnergy 👋
      </h2>
      <p class="text-gray-600 mt-1">
        Manage your orders, installations, and renewable energy services.
      </p>
    </div>

    <!-- Stats Cards -->
    <div class="grid grid-cols-1 md:grid-cols-4 gap-6">
      <div class="bg-white rounded-lg shadow p-5">
        <p class="text-sm text-gray-500">Total Orders</p>
        <h3 class="text-3xl font-bold text-green-800">5</h3>
      </div>

      <div class="bg-white rounded-lg shadow p-5">
        <p class="text-sm text-gray-500">Active Installations</p>
        <h3 class="text-3xl font-bold text-yellow-500">2</h3>
      </div>

      <div class="bg-white rounded-lg shadow p-5">
        <p class="text-sm text-gray-500">Pending Payments</p>
        <h3 class="text-3xl font-bold text-red-500">₱12,000</h3>
      </div>

      <div class="bg-white rounded-lg shadow p-5">
        <p class="text-sm text-gray-500">Warranties</p>
        <h3 class="text-3xl font-bold text-green-700">3</h3>
      </div>
    </div>

    <!-- Quick Actions -->
    <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
      <router-link
        to="/customer/marketplace"
        class="bg-green-800 text-white rounded-lg shadow p-6 hover:bg-green-700 transition"
      >
        <h3 class="text-xl font-bold mb-2">🛒 Browse Marketplace</h3>
        <p class="text-sm opacity-90">
          View solar products and service packages.
        </p>
      </router-link>

      <router-link
        to="/customer/orders"
        class="bg-white rounded-lg shadow p-6 hover:bg-gray-50 transition"
      >
        <h3 class="text-xl font-bold text-green-800 mb-2">
          📦 View My Orders
        </h3>
        <p class="text-sm text-gray-600">
          Track order and installation status.
        </p>
      </router-link>

      <router-link
        to="/customer/cart"
        class="bg-white rounded-lg shadow p-6 hover:bg-gray-50 transition"
      >
        <h3 class="text-xl font-bold text-green-800 mb-2">
          🧾 Shopping Cart
        </h3>
        <p class="text-sm text-gray-600">
          Review items before checkout.
        </p>
      </router-link>
    </div>

    <!-- Recent Orders -->
    <div class="bg-white rounded-lg shadow p-6">
      <h3 class="text-xl font-bold text-green-800 mb-4">
        Recent Orders
      </h3>

      <div class="overflow-x-auto">
        <table class="w-full text-sm">
          <thead>
            <tr class="text-left border-b">
              <th class="py-2">Order ID</th>
              <th>Status</th>
              <th>Total</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            <tr class="border-b">
              <td class="py-2">ORD-00123</td>
              <td class="text-yellow-600 font-semibold">Ongoing</td>
              <td>₱85,000</td>
              <td>Jan 10, 2025</td>
            </tr>
            <tr class="border-b">
              <td class="py-2">ORD-00118</td>
              <td class="text-green-700 font-semibold">Completed</td>
              <td>₱120,000</td>
              <td>Dec 18, 2024</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- Sustainability Summary -->
    <div class="bg-green-50 border border-green-200 rounded-lg p-6">
      <h3 class="text-xl font-bold text-green-800 mb-2">
        🌱 Sustainability Impact
      </h3>
      <p class="text-gray-700">
        You have reduced approximately <strong>1.2 tons of CO₂</strong>
        using renewable energy solutions.
      </p>
    </div>
  </div>
</template>

<script setup>
// Static UI dashboard (backend integration later)
</script>

<style scoped>
/* Dashboard styling handled by Tailwind */
</style>