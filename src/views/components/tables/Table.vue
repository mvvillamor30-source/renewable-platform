<script setup>
import { ref, computed } from 'vue'

const props = defineProps({
  title: { type: String, required: true },
  columns: { type: Array, required: true }, // [{ key: 'name', label: 'Name' }, ...]
  users: { type: Array, required: true },   // Data array
  showActions: { type: Boolean, default: true },
  addButton: { type: Object, default: null } // { label: '+ Add Admin', action: Function }
})

const emit = defineEmits(['view', 'edit', 'delete'])

// SEARCH
const searchQuery = ref('')

// SORTING
const sortKey = ref('')
const sortAsc = ref(true)
const sortBy = (key) => {
  if (sortKey.value === key) sortAsc.value = !sortAsc.value
  else { sortKey.value = key; sortAsc.value = true }
}

// PAGINATION
const currentPage = ref(1)
const itemsPerPage = ref(5)
const totalPages = computed(() => Math.ceil(filteredUsers.value.length / itemsPerPage.value))
const goToPage = (page) => {
  if (page >= 1 && page <= totalPages.value) currentPage.value = page
}

// FILTER + SORT
const filteredUsers = computed(() => {
  let result = props.users

  // SEARCH
  if (searchQuery.value.trim()) {
    const q = searchQuery.value.toLowerCase()
    result = result.filter(u =>
      Object.values(u).some(val => String(val).toLowerCase().includes(q))
    )
  }

  // SORT
  if (sortKey.value) {
    result = result.slice().sort((a, b) => {
      if (a[sortKey.value] < b[sortKey.value]) return sortAsc.value ? -1 : 1
      if (a[sortKey.value] > b[sortKey.value]) return sortAsc.value ? 1 : -1
      return 0
    })
  }

  return result
})

const paginatedUsers = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage.value
  return filteredUsers.value.slice(start, start + itemsPerPage.value)
})
</script>

<template>
  <section>
    <h2 class="text-xl font-semibold text-blue-900 mb-3">{{ title }}</h2>

    <!-- SEARCH -->
    <div class="mb-2 flex justify-between items-center">
      <input
        type="text"
        v-model="searchQuery"
        placeholder="Search..."
        class="px-3 py-2 border rounded focus:outline-none focus:ring focus:ring-blue-300 w-full md:w-1/3"
      />
      <span class="text-gray-600 ml-4 text-sm">Total: {{ filteredUsers.length }}</span>
    </div>

    <!-- TABLE -->
    <div class="overflow-x-auto bg-white shadow rounded-lg">
      <table class="min-w-full text-sm text-left">
        <thead class="bg-blue-900 text-white">
          <tr>
            <th
              v-for="col in columns"
              :key="col.key"
              class="px-4 py-3 cursor-pointer select-none"
              @click="sortBy(col.key)"
            >
              <div class="flex items-center space-x-1">
                <span>{{ col.label }}</span>
                <svg v-if="sortKey === col.key" class="w-3 h-3" viewBox="0 0 20 20" fill="currentColor">
                  <path v-if="sortAsc" fill-rule="evenodd" d="M5 7l5-5 5 5H5z" clip-rule="evenodd" />
                  <path v-else fill-rule="evenodd" d="M5 13l5 5 5-5H5z" clip-rule="evenodd" />
                </svg>
              </div>
            </th>
            <th v-if="showActions" class="px-4 py-3">Actions</th>
          </tr>
        </thead>

        <tbody class="text-gray-900">
          <tr
            v-for="user in paginatedUsers"
            :key="user.id || user.provider_id || user.admin_id || user.customer_id"
            class="border-t hover:bg-blue-50"
          >
            <td v-for="col in columns" :key="col.key" class="px-4 py-3">
              <span v-if="col.key !== 'status'">{{ user[col.key] }}</span>
              <span
                v-else
                class="px-2 py-1 rounded text-xs font-medium"
                :class="{
                  'bg-green-100 text-green-700': user.status === 'Active' || user.status === 'Approved',
                  'bg-yellow-100 text-yellow-700': user.status === 'Pending',
                  'bg-gray-200 text-gray-600': user.status === 'Inactive'
                }"
              >
                {{ user.status }}
              </span>
            </td>

            <!-- ACTIONS -->
            <td v-if="showActions" class="px-4 py-3 space-x-3">
              <button v-if="$slots.view" @click="$emit('view', user)" class="text-blue-500 hover:underline font-medium">
                <slot name="view">View</slot>
              </button>
              <button v-if="$slots.edit" @click="$emit('edit', user)" class="text-blue-500 hover:underline font-medium">
                <slot name="edit">Edit</slot>
              </button>
              <button v-if="$slots.delete" @click="$emit('delete', user)" class="text-red-600 hover:underline font-medium">
                <slot name="delete">Delete</slot>
              </button>
            </td>
          </tr>
        </tbody>
      </table>

      <!-- ADD BUTTON -->
      <div v-if="addButton" class="p-4 border-t bg-gray-50 text-right">
        <button
          @click="addButton.action"
          class="px-4 py-2 bg-blue-900 text-white rounded hover:bg-blue-800"
        >
          {{ addButton.label }}
        </button>
      </div>
    </div>

    <!-- PAGINATION -->
    <div class="flex justify-end items-center space-x-2 mt-3 text-gray-700">
      <button
        @click="goToPage(currentPage - 1)"
        :disabled="currentPage === 1"
        class="px-3 py-1 border rounded hover:bg-blue-50 disabled:opacity-50"
      >
        Prev
      </button>
      <span>Page {{ currentPage }} of {{ totalPages }}</span>
      <button
        @click="goToPage(currentPage + 1)"
        :disabled="currentPage === totalPages || totalPages === 0"
        class="px-3 py-1 border rounded hover:bg-blue-50 disabled:opacity-50"
      >
        Next
      </button>
    </div>
  </section>
</template>