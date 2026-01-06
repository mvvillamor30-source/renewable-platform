<template>
  <div class="p-6 bg-gray-100 min-h-screen">
    <!-- Page Header -->
    <div class="flex justify-between items-center mb-6">
      <h1 class="text-2xl font-bold text-green-800">Packages</h1>
      <button
        @click="openAddModal = true"
        class="bg-green-800 text-white px-4 py-2 rounded-md hover:bg-green-700 transition"
      >
        + Add Package
      </button>
    </div>

    <!-- Search -->
    <div class="flex mb-4">
      <input
        type="text"
        placeholder="Search by package name..."
        v-model="searchQuery"
        class="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-800 flex-1"
      />
    </div>

    <!-- Packages Table -->
    <div class="overflow-auto bg-white rounded shadow">
      <table class="min-w-full divide-y divide-gray-200">
        <thead class="bg-green-100">
          <tr>
            <th class="px-4 py-2 text-left text-gray-700 font-semibold">Name</th>
            <th class="px-4 py-2 text-left text-gray-700 font-semibold">Price</th>
            <th class="px-4 py-2 text-left text-gray-700 font-semibold">Status</th>
            <th class="px-4 py-2 text-left text-gray-700 font-semibold">Items Included</th>
            <th class="px-4 py-2 text-center text-gray-700 font-semibold">Actions</th>
          </tr>
        </thead>
        <tbody class="divide-y divide-gray-200">
          <tr v-for="pkg in filteredPackages" :key="pkg.id" class="hover:bg-gray-50">
            <td class="px-4 py-2">{{ pkg.name }}</td>
            <td class="px-4 py-2">₱ {{ pkg.price.toLocaleString() }}</td>
            <td class="px-4 py-2">
              <span
                :class="{
                  'px-2 py-1 rounded-full text-white text-sm': true,
                  'bg-green-600': pkg.status === 'Active',
                  'bg-gray-500': pkg.status === 'Inactive'
                }"
              >
                {{ pkg.status }}
              </span>
            </td>
            <td class="px-4 py-2">{{ pkg.items.map(i => i.name).join(', ') }}</td>
            <td class="px-4 py-2 flex justify-center gap-2">
              <button @click="editPackage(pkg)" class="px-2 py-1 bg-blue-500 text-white rounded hover:bg-blue-400">Edit</button>
              <button @click="deletePackage(pkg.id)" class="px-2 py-1 bg-red-500 text-white rounded hover:bg-red-400">Delete</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Add / Edit Package Modal -->
    <div v-if="openAddModal || editingPackage" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div class="bg-white rounded-lg shadow-lg p-6 w-full max-w-lg relative">
        <h2 class="text-xl font-bold text-green-800 mb-4">
          {{ editingPackage ? 'Edit Package' : 'Add Package' }}
        </h2>

        <form @submit.prevent="savePackage" class="space-y-4">
          <input v-model="packageForm.name" type="text" placeholder="Package Name" class="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-green-800" required />

          <input v-model.number="packageForm.price" type="number" placeholder="Price" class="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-green-800" />

          <select v-model="packageForm.status" class="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-green-800">
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
          </select>

          <!-- Multi-select for Products and Services -->
          <div>
            <label class="block mb-1 font-semibold">Select Items</label>
            <div class="flex flex-col gap-1 max-h-40 overflow-auto border rounded p-2">
              <label v-for="item in allItems" :key="item.id" class="flex items-center gap-2">
                <input type="checkbox" :value="item" v-model="packageForm.items" />
                <span>{{ item.name }} ({{ item.type }})</span>
              </label>
            </div>
          </div>

          <div class="flex justify-end gap-2 mt-4">
            <button type="button" @click="closeModal" class="px-4 py-2 bg-gray-300 rounded hover:bg-gray-200">Cancel</button>
            <button type="submit" class="px-4 py-2 bg-green-800 text-white rounded hover:bg-green-700">
              {{ editingPackage ? 'Update' : 'Save' }}
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, computed } from 'vue'

// Sample data
const products = [
  { id: 1, name: 'Solar Panel 5kW', type: 'Product' },
  { id: 2, name: 'Battery 3kWh', type: 'Product' },
]
const services = [
  { id: 101, name: 'Residential Installation', type: 'Service' },
  { id: 102, name: 'Battery Maintenance', type: 'Service' },
]
const allItems = [...products, ...services]

const packages = ref([
  { id: 1, name: 'Starter Solar Pack', price: 15000, status: 'Active', items: [products[0], services[0]] },
])

const searchQuery = ref('')

// Filtered packages by search
const filteredPackages = computed(() => {
  return packages.value.filter(pkg => !searchQuery.value || pkg.name.toLowerCase().includes(searchQuery.value.toLowerCase()))
})

// Modal state
const openAddModal = ref(false)
const editingPackage = ref(null)

const packageForm = reactive({
  id: null,
  name: '',
  price: null,
  status: 'Active',
  items: [],
})

const closeModal = () => {
  openAddModal.value = false
  editingPackage.value = null
  Object.assign(packageForm, { id: null, name: '', price: null, status: 'Active', items: [] })
}

const savePackage = () => {
  if (editingPackage.value) {
    Object.assign(editingPackage.value, packageForm)
  } else {
    packages.value.push({ id: Date.now(), ...packageForm })
  }
  closeModal()
}

const editPackage = (pkg) => {
  editingPackage.value = pkg
  Object.assign(packageForm, pkg)
  openAddModal.value = true
}

const deletePackage = (id) => {
  if (confirm('Are you sure you want to delete this package?')) {
    packages.value = packages.value.filter(p => p.id !== id)
  }
}
</script>

<style scoped>
/* Optional: smooth table hover */
</style>