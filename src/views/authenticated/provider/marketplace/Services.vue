<template>
  <div class="p-6 bg-gray-100 min-h-screen">
    <!-- Page Header -->
    <div class="flex justify-between items-center mb-6">
      <h1 class="text-2xl font-bold text-green-800">Services</h1>
      <button
        @click="openAddModal = true"
        class="bg-green-800 text-white px-4 py-2 rounded-md hover:bg-green-700 transition"
      >
        + Add Service
      </button>
    </div>

    <!-- Search & Filter -->
    <div class="flex flex-wrap gap-4 mb-4">
      <input
        type="text"
        placeholder="Search by service name..."
        v-model="searchQuery"
        class="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-800 focus:border-green-800 flex-1"
      />
      <select v-model="filterCategory" class="px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-800">
        <option value="">All Categories</option>
        <option v-for="cat in categories" :key="cat" :value="cat">{{ cat }}</option>
      </select>
      <select v-model="filterStatus" class="px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-800">
        <option value="">All Status</option>
        <option value="Active">Active</option>
        <option value="Inactive">Inactive</option>
      </select>
    </div>

    <!-- Services Table -->
    <div class="overflow-auto bg-white rounded shadow">
      <table class="min-w-full divide-y divide-gray-200">
        <thead class="bg-green-100">
          <tr>
            <th class="px-4 py-2 text-left text-gray-700 font-semibold">Name</th>
            <th class="px-4 py-2 text-left text-gray-700 font-semibold">Category</th>
            <th class="px-4 py-2 text-left text-gray-700 font-semibold">Duration</th>
            <th class="px-4 py-2 text-left text-gray-700 font-semibold">Price</th>
            <th class="px-4 py-2 text-left text-gray-700 font-semibold">Status</th>
            <th class="px-4 py-2 text-center text-gray-700 font-semibold">Actions</th>
          </tr>
        </thead>
        <tbody class="divide-y divide-gray-200">
          <tr v-for="service in filteredServices" :key="service.id" class="hover:bg-gray-50">
            <td class="px-4 py-2">{{ service.name }}</td>
            <td class="px-4 py-2">{{ service.category }}</td>
            <td class="px-4 py-2">{{ service.duration }}</td>
            <td class="px-4 py-2">₱ {{ service.price.toLocaleString() }}</td>
            <td class="px-4 py-2">
              <span
                :class="{
                  'px-2 py-1 rounded-full text-white text-sm': true,
                  'bg-green-600': service.status === 'Active',
                  'bg-gray-500': service.status === 'Inactive'
                }"
              >
                {{ service.status }}
              </span>
            </td>
            <td class="px-4 py-2 flex justify-center gap-2">
              <button @click="editService(service)" class="px-2 py-1 bg-blue-500 text-white rounded hover:bg-blue-400">Edit</button>
              <button @click="deleteService(service.id)" class="px-2 py-1 bg-red-500 text-white rounded hover:bg-red-400">Delete</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Add / Edit Service Modal -->
    <div v-if="openAddModal || editingService" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div class="bg-white rounded-lg shadow-lg p-6 w-full max-w-lg relative">
        <h2 class="text-xl font-bold text-green-800 mb-4">
          {{ editingService ? 'Edit Service' : 'Add Service' }}
        </h2>

        <form @submit.prevent="saveService" class="space-y-4">
          <input v-model="serviceForm.name" type="text" placeholder="Service Name" class="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-green-800" required />
          
          <select v-model="serviceForm.category" class="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-green-800" required>
            <option value="">Select Category</option>
            <option v-for="cat in categories" :key="cat" :value="cat">{{ cat }}</option>
          </select>

          <input v-model="serviceForm.duration" type="text" placeholder="Duration (e.g., 2 hours)" class="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-green-800" />
          <input v-model.number="serviceForm.price" type="number" placeholder="Price" class="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-green-800" />

          <select v-model="serviceForm.status" class="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-green-800">
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
          </select>

          <textarea v-model="serviceForm.description" placeholder="Description" class="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-green-800"></textarea>

          <div class="flex justify-end gap-2 mt-4">
            <button type="button" @click="closeModal" class="px-4 py-2 bg-gray-300 rounded hover:bg-gray-200">Cancel</button>
            <button type="submit" class="px-4 py-2 bg-green-800 text-white rounded hover:bg-green-700">
              {{ editingService ? 'Update' : 'Save' }}
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, computed } from 'vue'

// Sample categories
const categories = ['Installation', 'Maintenance', 'Inspection']

// Sample data
const services = ref([
  { id: 1, name: 'Residential Solar Installation', category: 'Installation', duration: '4 hours', price: 5000, status: 'Active', description: 'Installation of 5kW solar panel system.' },
  { id: 2, name: 'Battery Maintenance', category: 'Maintenance', duration: '2 hours', price: 1200, status: 'Active', description: 'Battery check and cleaning.' },
])

const searchQuery = ref('')
const filterCategory = ref('')
const filterStatus = ref('')

const filteredServices = computed(() => {
  return services.value.filter(s => {
    return (
      (!searchQuery.value || s.name.toLowerCase().includes(searchQuery.value.toLowerCase())) &&
      (!filterCategory.value || s.category === filterCategory.value) &&
      (!filterStatus.value || s.status === filterStatus.value)
    )
  })
})

// Modal state
const openAddModal = ref(false)
const editingService = ref(null)

const serviceForm = reactive({
  id: null,
  name: '',
  category: '',
  duration: '',
  price: null,
  status: 'Active',
  description: '',
})

const closeModal = () => {
  openAddModal.value = false
  editingService.value = null
  Object.assign(serviceForm, { id: null, name: '', category: '', duration: '', price: null, status: 'Active', description: '' })
}

const saveService = () => {
  if (editingService.value) {
    Object.assign(editingService.value, serviceForm)
  } else {
    services.value.push({ id: Date.now(), ...serviceForm })
  }
  closeModal()
}

const editService = (service) => {
  editingService.value = service
  Object.assign(serviceForm, service)
  openAddModal.value = true
}

const deleteService = (id) => {
  if (confirm('Are you sure you want to delete this service?')) {
    services.value = services.value.filter(s => s.id !== id)
  }
}
</script>

<style scoped>
/* Optional: smooth table hover */
</style>