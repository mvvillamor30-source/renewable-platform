<template>
  <div class="p-6 bg-gray-100 min-h-screen">
    <!-- Page Header -->
    <div class="flex justify-between items-center mb-6">
      <h1 class="text-2xl font-bold text-green-800">Products</h1>
      <button
        @click="openAddModal = true"
        class="bg-green-800 text-white px-4 py-2 rounded-md hover:bg-green-700 transition"
      >
        + Add Product
      </button>
    </div>

    <!-- Search & Filter -->
    <div class="flex flex-wrap gap-4 mb-4">
      <input
        type="text"
        placeholder="Search by name..."
        v-model="searchQuery"
        class="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-800 focus:border-green-800 flex-1"
      />
      <select v-model="filterCategory" class="px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-800">
        <option value="">All Categories</option>
        <option v-for="cat in categories" :key="cat" :value="cat">{{ cat }}</option>
      </select>
      <select v-model="filterStatus" class="px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-800">
        <option value="">All Status</option>
        <option value="Available">Available</option>
        <option value="Low Stock">Low Stock</option>
        <option value="Out of Stock">Out of Stock</option>
      </select>
    </div>

    <!-- Products Table -->
    <div class="overflow-auto bg-white rounded shadow">
      <table class="min-w-full divide-y divide-gray-200">
        <thead class="bg-green-100">
          <tr>
            <th class="px-4 py-2 text-left text-gray-700 font-semibold">Name</th>
            <th class="px-4 py-2 text-left text-gray-700 font-semibold">Category</th>
            <th class="px-4 py-2 text-left text-gray-700 font-semibold">Brand/Model</th>
            <th class="px-4 py-2 text-left text-gray-700 font-semibold">Capacity</th>
            <th class="px-4 py-2 text-left text-gray-700 font-semibold">Price</th>
            <th class="px-4 py-2 text-left text-gray-700 font-semibold">Stock</th>
            <th class="px-4 py-2 text-left text-gray-700 font-semibold">Status</th>
            <th class="px-4 py-2 text-center text-gray-700 font-semibold">Actions</th>
          </tr>
        </thead>
        <tbody class="divide-y divide-gray-200">
          <tr v-for="product in filteredProducts" :key="product.id" class="hover:bg-gray-50">
            <td class="px-4 py-2">{{ product.name }}</td>
            <td class="px-4 py-2">{{ product.category }}</td>
            <td class="px-4 py-2">{{ product.brand }} / {{ product.model }}</td>
            <td class="px-4 py-2">{{ product.capacity }}</td>
            <td class="px-4 py-2">₱ {{ product.price.toLocaleString() }}</td>
            <td class="px-4 py-2">{{ product.stock }}</td>
            <td class="px-4 py-2">
              <span
                :class="{
                  'px-2 py-1 rounded-full text-white text-sm': true,
                  'bg-green-600': product.status === 'Available',
                  'bg-yellow-500': product.status === 'Low Stock',
                  'bg-red-600': product.status === 'Out of Stock'
                }"
              >
                {{ product.status }}
              </span>
            </td>
            <td class="px-4 py-2 flex justify-center gap-2">
              <button @click="editProduct(product)" class="px-2 py-1 bg-blue-500 text-white rounded hover:bg-blue-400">Edit</button>
              <button @click="deleteProduct(product.id)" class="px-2 py-1 bg-red-500 text-white rounded hover:bg-red-400">Delete</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Add / Edit Product Modal -->
    <div v-if="openAddModal || editingProduct" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div class="bg-white rounded-lg shadow-lg p-6 w-full max-w-lg relative">
        <h2 class="text-xl font-bold text-green-800 mb-4">
          {{ editingProduct ? 'Edit Product' : 'Add Product' }}
        </h2>

        <form @submit.prevent="saveProduct" class="space-y-4">
          <input v-model="productForm.name" type="text" placeholder="Product Name" class="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-green-800" required />
          
          <select v-model="productForm.category" class="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-green-800" required>
            <option value="">Select Category</option>
            <option v-for="cat in categories" :key="cat" :value="cat">{{ cat }}</option>
          </select>

          <input v-model="productForm.brand" type="text" placeholder="Brand" class="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-green-800" />
          <input v-model="productForm.model" type="text" placeholder="Model" class="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-green-800" />
          <input v-model="productForm.capacity" type="text" placeholder="Capacity (e.g., 5kW)" class="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-green-800" />
          <input v-model.number="productForm.price" type="number" placeholder="Price" class="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-green-800" />
          <input v-model.number="productForm.stock" type="number" placeholder="Stock Quantity" class="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-green-800" />

          <select v-model="productForm.status" class="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-green-800">
            <option value="Available">Available</option>
            <option value="Low Stock">Low Stock</option>
            <option value="Out of Stock">Out of Stock</option>
          </select>

          <textarea v-model="productForm.description" placeholder="Description" class="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-green-800"></textarea>

          <div class="flex justify-end gap-2 mt-4">
            <button type="button" @click="closeModal" class="px-4 py-2 bg-gray-300 rounded hover:bg-gray-200">Cancel</button>
            <button type="submit" class="px-4 py-2 bg-green-800 text-white rounded hover:bg-green-700">
              {{ editingProduct ? 'Update' : 'Save' }}
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
const categories = ['Solar Panel', 'Inverter', 'Battery', 'Mounting Kit']

const products = ref([
  { id: 1, name: 'Solar Panel 550W', category: 'Solar Panel', brand: 'SunPower', model: 'SP550', capacity: '550W', price: 25000, stock: 50, status: 'Available', description: 'High-efficiency solar panel.' },
  { id: 2, name: 'Inverter 5kW', category: 'Inverter', brand: 'SolarMax', model: 'SM5000', capacity: '5kW', price: 15000, stock: 10, status: 'Low Stock', description: 'Stable inverter for residential use.' },
])

const searchQuery = ref('')
const filterCategory = ref('')
const filterStatus = ref('')

const filteredProducts = computed(() => {
  return products.value.filter(p => {
    return (
      (!searchQuery.value || p.name.toLowerCase().includes(searchQuery.value.toLowerCase())) &&
      (!filterCategory.value || p.category === filterCategory.value) &&
      (!filterStatus.value || p.status === filterStatus.value)
    )
  })
})

// Modal state
const openAddModal = ref(false)
const editingProduct = ref(null)

const productForm = reactive({
  id: null,
  name: '',
  category: '',
  brand: '',
  model: '',
  capacity: '',
  price: null,
  stock: null,
  status: 'Available',
  description: '',
})

const closeModal = () => {
  openAddModal.value = false
  editingProduct.value = null
  Object.assign(productForm, { id: null, name: '', category: '', brand: '', model: '', capacity: '', price: null, stock: null, status: 'Available', description: '' })
}

const saveProduct = () => {
  if (editingProduct.value) {
    Object.assign(editingProduct.value, productForm)
  } else {
    products.value.push({ id: Date.now(), ...productForm })
  }
  closeModal()
}

const editProduct = (product) => {
  editingProduct.value = product
  Object.assign(productForm, product)
  openAddModal.value = true
}

const deleteProduct = (id) => {
  if (confirm('Are you sure you want to delete this product?')) {
    products.value = products.value.filter(p => p.id !== id)
  }
}
</script>

<style scoped>
/* Optional: smooth table hover */
</style>