<template>
  <!-- HERO SECTION -->
  <section class="bg-[#F9FAF7] py-20">
    <div class="max-w-7xl mx-auto px-4 grid lg:grid-cols-2 gap-12 items-center">

      <!-- TEXT -->
      <div>
        <h1 class="text-4xl sm:text-5xl font-bold text-[#263238] mb-6">
          Powering Renewable Energy
          <span class="text-[#2E7D32]">Providers in Cavite</span>
        </h1>

        <p class="text-lg text-gray-600 mb-8">
          An integrated web-based management platform with decision support
          and mobile integration — designed to streamline operations,
          analytics, and e-commerce for renewable energy providers.
        </p>

        <div class="flex gap-4 flex-wrap">
          <router-link
            to="/register"
            class="px-6 py-3 bg-[#66BB6A] text-white font-semibold rounded-md
                   hover:bg-[#4CAF50] transition"
          >
            Apply Now
          </router-link>

          <router-link
            to="/platform"
            class="px-6 py-3 border border-[#2E7D32] text-[#2E7D32]
                   font-semibold rounded-md hover:bg-[#2E7D32] hover:text-white transition"
          >
            View Platform
          </router-link>

          <router-link
        to="/e-commerce"
        class="bg-green-800 text-white rounded-lg shadow p-6 hover:bg-green-700 transition"
      >
        <h3 class="text-xl font-bold mb-2">🛒 Browse Marketplace</h3>
        <p class="text-sm opacity-90">
          View solar products and service packages.
        </p>
      </router-link>
        </div>
      </div>

      <!-- IMAGE -->
      <div class="bg-white p-4 rounded-xl shadow-lg">
        <img
          src="#"
          alt="Solar Panels"
          class="rounded-lg"
        />
      </div>

    </div>
  </section>

  <!-- WHY CHOOSE US -->
  <section class="py-20 bg-white">
    <div class="max-w-7xl mx-auto px-4">

      <h2 class="text-3xl font-bold text-center text-[#263238] mb-12">
        Why Choose Our Platform?
      </h2>

      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">

        <div class="bg-white p-6 rounded-lg shadow-md border-t-4 border-[#66BB6A]">
          <h3 class="font-semibold text-[#2E7D32] mb-2">
            Integrated Management
          </h3>
          <p class="text-gray-600 text-sm">
            Manage installations, workforce, and daily operations in one dashboard.
          </p>
        </div>

        <div class="bg-white p-6 rounded-lg shadow-md border-t-4 border-[#66BB6A]">
          <h3 class="font-semibold text-[#2E7D32] mb-2">
            Decision Support System
          </h3>
          <p class="text-gray-600 text-sm">
            Data-driven insights to support strategic and operational decisions.
          </p>
        </div>

        <div class="bg-white p-6 rounded-lg shadow-md border-t-4 border-[#66BB6A]">
          <h3 class="font-semibold text-[#2E7D32] mb-2">
            Mobile-Ready Platform
          </h3>
          <p class="text-gray-600 text-sm">
            Seamless access through a mobile-friendly interface.
          </p>
        </div>

      </div>
    </div>
  </section>

  <!-- SUSTAINABILITY -->
  <section class="py-20 bg-[#F9FAF7]">
    <div class="max-w-5xl mx-auto px-4 text-center">

      <h2 class="text-3xl font-bold text-[#2E7D32] mb-6">
        Sustainability & Local Impact
      </h2>

      <p class="text-gray-700 mb-12">
        Supporting clean energy adoption and environmental responsibility in Cavite.
      </p>

      <div class="grid grid-cols-1 sm:grid-cols-3 gap-8">

        <div class="bg-white p-6 rounded-lg shadow-md">
          <h3 class="font-semibold text-[#2E7D32] mb-2">Clean Energy</h3>
          <p class="text-sm text-gray-600">
            Promoting renewable solutions for homes and businesses.
          </p>
        </div>

        <div class="bg-white p-6 rounded-lg shadow-md">
          <h3 class="font-semibold text-[#2E7D32] mb-2">Carbon Reduction</h3>
          <p class="text-sm text-gray-600">
            Monitoring CO₂ reduction and energy generation metrics.
          </p>
        </div>

        <div class="bg-white p-6 rounded-lg shadow-md">
          <h3 class="font-semibold text-[#2E7D32] mb-2">Community Impact</h3>
          <p class="text-sm text-gray-600">
            Empowering local renewable energy providers.
          </p>
        </div>

      </div>
    </div>
  </section>

  <!-- FINAL CTA -->
  <section class="py-20 bg-[#2E7D32] text-white text-center">
    <h2 class="text-3xl font-bold mb-6">
      Ready to Grow Your Renewable Energy Business?
    </h2>

    <router-link
      to="/register"
      class="inline-block px-8 py-3 bg-[#FBC02D] text-[#263238]
             font-semibold rounded-md hover:bg-yellow-400 transition"
    >
      Get Started
    </router-link>
  </section>
</template>

<script setup>
</script>