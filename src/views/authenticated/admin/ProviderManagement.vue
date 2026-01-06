<template>
    <div class="space-y-6">
      <!-- Page Title -->
      <h1 class="text-2xl font-bold text-green-800">Provider Management</h1>
      <p class="text-gray-600">Approve or reject providers and monitor their platform activities.</p>

      <!-- Providers Table -->
      <div class="bg-white rounded-lg shadow p-6">
        <div v-if="loading" class="p-4 text-gray-600">Loading providers...</div>
        <div v-else class="overflow-x-auto">
          <table class="w-full table-auto border-collapse border border-gray-200">
            <thead class="bg-green-50">
              <tr>
                <th class="border px-4 py-2 text-left">Company Name</th>
                <th class="border px-4 py-2 text-left">Contact Person</th>
                <th class="border px-4 py-2 text-left">Email</th>
                <th class="border px-4 py-2 text-left">Status</th>
                <th class="border px-4 py-2 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="provider in providers" :key="provider.id" class="hover:bg-gray-50">
                <td class="border px-4 py-2">{{ provider.company }}</td>
                <td class="border px-4 py-2">{{ provider.contact }}</td>
                <td class="border px-4 py-2">{{ provider.email }}</td>
                <td class="border px-4 py-2">
                  <span
                    :class="provider.status === 'Pending' ? 'text-yellow-400' : provider.status === 'Approved' ? 'text-green-800' : 'text-red-600'"
                    class="font-semibold"
                  >
                    {{ provider.status }}
                  </span>
                </td>
                <td class="border px-4 py-2 space-x-2">
                  <button
                    v-if="provider.status === 'Pending'"
                    @click="approveProvider(provider.id)"
                    class="px-3 py-1 bg-green-800 text-white rounded hover:bg-green-700 transition"
                  >
                    Approve
                  </button>
                  <button
                    v-if="provider.status === 'Pending'"
                    @click="rejectProvider(provider.id)"
                    class="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-500 transition"
                  >
                    Reject
                  </button>
                  <button
                    @click="viewProvider(provider.id)"
                    class="px-3 py-1 bg-gray-300 text-gray-700 rounded hover:bg-gray-200 transition"
                  >
                    View
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <!-- Provider Details Modal -->
      <Modal :show="showModal" title="Provider Details" size="full" @close="closeModal" @submit="closeModal">
        <template #body>
          <div class="space-y-3">
            <div><strong>Company:</strong> {{ selectedProvider.company?.company_name || '—' }}</div>
            <div><strong>Company Address:</strong> {{ selectedProvider.company?.address || '—' }}</div>
            <div><strong>Contact Person:</strong> {{ selectedProvider.first_name }} {{ selectedProvider.middle_name ?? '' }} {{ selectedProvider.last_name }}</div>
            <div><strong>Email:</strong> {{ selectedProvider.email }}</div>
            <div><strong>Contact Number:</strong> {{ selectedProvider.contact_number || '—' }}</div>
            <div>
              <strong>Status:</strong>
              <span :class="selectedProvider.application_status === 'Pending' ? 'text-yellow-400' : selectedProvider.application_status === 'Approved' ? 'text-green-800' : 'text-red-600'" class="font-semibold">
                {{ selectedProvider.application_status }}
              </span>
            </div>
            <div><strong>Registered:</strong> {{ selectedProvider.created_at }}</div>

            <div>
              <strong>Documents</strong>
              <ul class="list-disc ml-5">
                <li v-for="doc in selectedProvider.documents || []" :key="doc.id" class="flex items-center space-x-3">
                  <span class="flex-1">{{ doc.document_type || 'Document' }}</span>
                  <span v-if="doc.file_path || doc.file_url" class="text-sm text-gray-600 truncate max-w-xs">{{ doc.file_url || doc.file_path }}</span>
                  <button v-if="doc.file_path" @click="openDocumentModal(doc)" class="px-2 py-1 text-sm bg-gray-200 rounded hover:bg-gray-300">View</button>
                  <span v-else class="text-gray-500">No file</span>
                </li>
              </ul>
            </div>

            <div class="flex space-x-2">
              <button v-if="selectedProvider.application_status === 'Pending'" @click="approveProvider(selectedProvider.id)" class="px-3 py-1 bg-green-800 text-white rounded hover:bg-green-700 transition">Approve</button>
              <button v-if="selectedProvider.application_status === 'Pending'" @click="rejectProvider(selectedProvider.id)" class="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-500 transition">Reject</button>
            </div>
          </div>
        </template>
      </Modal>

      <!-- Document Preview Modal -->
      <Modal :show="showDocModal" title="Document Preview" size="full" @close="closeDocumentModal" @submit="closeDocumentModal">
        <template #body>
          <div class="p-2">
            <div class="flex justify-between items-center mb-2">
              <strong>{{ docPreview?.document_type || 'Document' }}</strong>
              <a v-if="docPreview?.file_url || docPreview?.file_path" :href="docPreview.file_url || docPreview.file_path" target="_blank" class="text-sm text-blue-600 underline">Open in new tab</a>
            </div>
            <div class="flex justify-center items-center">
              <img v-if="isImage(docPreview?.file_url || docPreview?.file_path)" :src="docPreview.file_url || docPreview.file_path" alt="Doc" class="max-h-[80vh] max-w-full object-contain" />
              <iframe v-else-if="isPDF(docPreview?.file_url || docPreview?.file_path)" :src="docPreview.file_url || docPreview.file_path" class="w-full h-[80vh]" />
              <a v-else :href="docPreview?.file_url || docPreview?.file_path" target="_blank" class="text-blue-600 underline">Open file</a>
            </div>
          </div>
        </template>
      </Modal>

    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import Modal from '@/views/components/modals/Modal.vue'
import { getProviders, getProvider, updateProviderStatus } from '@/services/adminService'

const providers = ref([])
const loading = ref(false)

// Modal state
const showModal = ref(false)
const selectedProvider = ref({})

const showDocModal = ref(false)
const docPreview = ref(null)

const openDocumentModal = (doc) => {
  docPreview.value = doc
  showDocModal.value = true
}

const closeDocumentModal = () => {
  showDocModal.value = false
  docPreview.value = null
}

const isImage = (url) => /\.(jpe?g|png|gif|webp|svg)(\?.*)?$/i.test(url || '')
const isPDF = (url) => /\.pdf(\?.*)?$/i.test(url || '')

const fetchProviders = async () => {
  loading.value = true
  try {
    const res = await getProviders()
    providers.value = res.data.providers
  } catch (err) {
    alert('Failed to fetch providers')
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  fetchProviders()
})

const approveProvider = async (id) => {
  try {
    await updateProviderStatus(id, { status: 'Approved' })
    const p = providers.value.find(p => p.id === id)
    if (p) p.status = 'Approved'
    // If modal showing this provider, update it too
    if (selectedProvider.value?.id === id) selectedProvider.value.application_status = 'Approved'
    alert('Provider approved')
  } catch (err) {
    alert('Failed to approve provider')
  }
}

const rejectProvider = async (id) => {
  try {
    await updateProviderStatus(id, { status: 'Rejected' })
    const p = providers.value.find(p => p.id === id)
    if (p) p.status = 'Rejected'
    if (selectedProvider.value?.id === id) selectedProvider.value.application_status = 'Rejected'
    alert('Provider rejected')
  } catch (err) {
    alert('Failed to reject provider')
  }
}

const closeModal = () => {
  showModal.value = false
  selectedProvider.value = {}
  closeDocumentModal()
}

const viewProvider = async (id) => {
  try {
    const res = await getProvider(id)
    selectedProvider.value = res.data.provider
    showModal.value = true
  } catch (err) {
    alert('Failed to load provider details')
  }
}
</script>

<style scoped>
/* Tailwind handles hover, focus, and responsiveness */
</style>
