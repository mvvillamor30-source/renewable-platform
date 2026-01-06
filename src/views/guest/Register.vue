<template>
  <section class="flex justify-center items-center min-h-screen bg-gray-50">
    <div class="bg-white rounded-lg shadow-lg p-8 w-full max-w-2xl">
      <h2 class="text-3xl font-bold text-green-800 mb-6 text-center">
        Provider Registration
      </h2>
      <p class="text-gray-600 mb-6 text-center">
        Register to become a renewable energy provider. Complete all steps for admin approval.
      </p>

      <!-- Step Progress -->
      <div class="flex justify-between mb-6">
        <div v-for="(stepLabel, index) in steps" :key="index" class="flex-1 text-center">
          <div
            class="w-8 h-8 mx-auto rounded-full flex items-center justify-center mb-1"
            :class="currentStep === index + 1 ? 'bg-green-800 text-white' : 'bg-gray-300 text-gray-700'"
          >
            {{ index + 1 }}
          </div>
          <span class="text-sm">{{ stepLabel }}</span>
        </div>
      </div>

      <!-- Step 1: Personal Info -->
      <form v-if="currentStep === 1" class="space-y-4" @submit.prevent="handleStepSubmit">
        <div>
          <label class="block text-gray-700 mb-1">First Name</label>
          <input v-model="provider.personalInfo.first_name" type="text" placeholder="John" class="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-800 focus:border-green-800" required />
        </div>
        <div>
          <label class="block text-gray-700 mb-1">Middle Name</label>
          <input v-model="provider.personalInfo.middle_name" type="text" placeholder="M." class="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-800 focus:border-green-800" />
        </div>
        <div>
          <label class="block text-gray-700 mb-1">Last Name</label>
          <input v-model="provider.personalInfo.last_name" type="text" placeholder="Doe" class="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-800 focus:border-green-800" required />
        </div>
        <div>
          <label class="block text-gray-700 mb-1">Email</label>
          <input v-model="provider.personalInfo.email" type="email" placeholder="you@example.com" class="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-800 focus:border-green-800" required />
        </div>
        <div>
          <label class="block text-gray-700 mb-1">Birthdate</label>
          <input v-model="provider.personalInfo.birthdate" type="date" class="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-800 focus:border-green-800" required />
        </div>
        <div>
          <label class="block text-gray-700 mb-1">Contact Number</label>
          <input v-model="provider.personalInfo.contact_number" type="text" placeholder="0912-345-6789" class="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-800 focus:border-green-800" required />
        </div>

        <div class="flex justify-between mt-4">
          <div></div>
          <button type="submit" class="bg-yellow-400 text-green-800 font-semibold px-4 py-2 rounded-md hover:bg-yellow-300 transition">
            {{ isEditing ? 'Save' : 'Next' }}
          </button>
        </div>
      </form>

      <!-- Step 2: Company Info -->
      <form v-if="currentStep === 2" class="space-y-4" @submit.prevent="handleStepSubmit">
        <div>
          <label class="block text-gray-700 mb-1">Company Name</label>
          <input v-model="provider.companyInfo.company_name" type="text" placeholder="Solar Solutions Inc." class="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-800 focus:border-green-800" required />
        </div>
        <div>
          <label class="block text-gray-700 mb-1">Business Address</label>
          <input v-model="provider.companyInfo.address" type="text" placeholder="123 Renewable St., Cavite" class="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-800 focus:border-green-800" required />
        </div>

        <div class="flex justify-between mt-4">
          <button type="button" @click="prevStep" class="bg-gray-300 text-gray-700 font-semibold px-4 py-2 rounded-md hover:bg-gray-200 transition">Back</button>
          <button type="submit" class="bg-yellow-400 text-green-800 font-semibold px-4 py-2 rounded-md hover:bg-yellow-300 transition">
            {{ isEditing ? 'Save' : 'Next' }}
          </button>
        </div>
      </form>

      <!-- Step 3: Document Uploads -->
      <form v-if="currentStep === 3" class="space-y-4" @submit.prevent="handleStepSubmit">
        <div v-for="(doc, index) in requiredDocuments" :key="index">
          <label class="block text-gray-700 mb-1">{{ doc.label }}</label>
          <!-- Make required conditional so existing uploads don't force re-selection when editing -->
          <input type="file" @change="handleFileUpload($event, doc.key)" class="w-full" :required="!provider.documents[doc.key]" />
          <div v-if="provider.documents[doc.key]" class="mt-1 text-gray-700">
            <span class="font-semibold">{{ provider.documents[doc.key].name }}</span>
            <!-- Image preview if it's an image -->
            <img v-if="isImage(provider.documents[doc.key])" :src="provider.documents[doc.key].preview" alt="Preview" class="mt-2 w-32 h-32 object-contain border" />
          </div>
        </div>

        <div class="flex justify-between mt-4">
          <button type="button" @click="prevStep" class="bg-gray-300 text-gray-700 font-semibold px-4 py-2 rounded-md hover:bg-gray-200 transition">Back</button>
          <button type="submit" class="bg-yellow-400 text-green-800 font-semibold px-4 py-2 rounded-md hover:bg-yellow-300 transition">
            {{ isEditing ? 'Save' : 'Next' }}
          </button>
        </div>
      </form>

      <!-- Step 4: Details Review -->
      <div v-if="currentStep === 4" class="space-y-6">
        <!-- Personal Info Review -->
        <div class="border p-4 rounded-md">
          <div class="flex justify-between items-center mb-2">
            <h4 class="font-semibold text-green-800">Personal Info</h4>
            <button @click="editStep(1)" class="text-yellow-400 hover:underline text-sm">Edit</button>
          </div>
          <p>First Name: {{ provider.personalInfo.first_name }}</p>
          <p>Middle Name: {{ provider.personalInfo.middle_name }}</p>
          <p>Last Name: {{ provider.personalInfo.last_name }}</p>
          <p>Email: {{ provider.personalInfo.email }}</p>
          <p>Birthdate: {{ provider.personalInfo.birthdate }}</p>
          <p>Contact Number: {{ provider.personalInfo.contact_number }}</p>
        </div>

        <!-- Company Info Review -->
        <div class="border p-4 rounded-md">
          <div class="flex justify-between items-center mb-2">
            <h4 class="font-semibold text-green-800">Company Info</h4>
            <button @click="editStep(2)" class="text-yellow-400 hover:underline text-sm">Edit</button>
          </div>
          <p>Company Name: {{ provider.companyInfo.company_name }}</p>
          <p>Address: {{ provider.companyInfo.address }}</p>
        </div>

        <!-- Documents Review -->
        <div class="border p-4 rounded-md">
          <div class="flex justify-between items-center mb-2">
            <h4 class="font-semibold text-green-800">Uploaded Documents</h4>
            <button @click="editStep(3)" class="text-yellow-400 hover:underline text-sm">Edit</button>
          </div>
          <ul>
            <li v-for="(doc, key) in provider.documents" :key="key">
              {{ key }}: {{ doc.name }}
              <img v-if="isImage(doc)" :src="doc.preview" class="mt-1 w-24 h-24 object-contain border" />
            </li>
          </ul>
        </div>

        <div class="flex justify-between mt-4">
          <button type="button" @click="prevStep" class="bg-gray-300 text-gray-700 font-semibold px-4 py-2 rounded-md hover:bg-gray-200 transition">Back</button>
          <button
            type="button"
            @click="submitForm"
            :disabled="isSubmitting"
            class="bg-green-800 text-white font-semibold px-4 py-2 rounded-md hover:bg-green-700 transition disabled:opacity-50"
          >
            {{ isSubmitting ? 'Submitting...' : 'Submit Application' }}
          </button>
        </div>
      </div>

      <!-- Login Link -->
      <p class="mt-6 text-center text-gray-600">
        Already have an account? 
        <router-link to="/login" class="text-green-800 hover:underline">Login</router-link>
      </p>
    </div>
  </section>
</template>

<script setup>
import { reactive, ref } from 'vue'
import { createProvider } from '@/services/axios'
import router from '@/router'

const currentStep = ref(1)
const isEditing = ref(false)
const isSubmitting = ref(false)
const steps = ['Personal Info', 'Company Info', 'Documents', 'Review']

const provider = reactive({
  personalInfo: { first_name: '', middle_name: '', last_name: '', email: '', birthdate: '', contact_number: '' },
  companyInfo: { company_name: '', address: '' },
  documents: {}
})

const requiredDocuments = [
  { label: 'Business Permit', key: 'Business Permit' },
  { label: 'DTI/SEC Registration', key: 'Registration Certificate' },
  { label: 'BIR Certificate', key: 'BIR Certificate' },
  { label: 'Owner ID', key: 'Owner ID' }
]

function nextStep() {
  if (currentStep.value < steps.length) currentStep.value++
}

function prevStep() {
  if (currentStep.value > 1) currentStep.value--
}

// Handle Edit: go to step, change button to Save
function editStep(step) {
  currentStep.value = step
  isEditing.value = true
}

// Handle step submission (Next or Save)
function handleStepSubmit() {
  if (isEditing.value) {
    currentStep.value = 4 // Return to review
    isEditing.value = false
  } else {
    nextStep()
  }
}

// File upload with preview
function handleFileUpload(event, key) {
  const file = event.target.files[0]
  if (file) {
    if (file.type.startsWith('image/')) {
      const reader = new FileReader()
      reader.onload = (e) => {
        provider.documents[key] = { name: file.name, file, preview: e.target.result }
      }
      reader.readAsDataURL(file)
    } else {
      provider.documents[key] = { name: file.name, file }
    }
  }
}

// Check if file is image
function isImage(doc) {
  return doc && doc.preview
}

// Map UI file keys to server-expected document_type values
function mapDocumentType(key) {
  if (key === 'Registration Certificate' || key === 'DTI/SEC Registration') return 'DTI Registration'
  if (key === 'Owner ID') return 'Valid ID'
  // Fallback to key or label
  return key
}

async function submitForm() {
  isSubmitting.value = true

  const formData = new FormData()
  const p = provider.personalInfo
  formData.append('first_name', p.first_name)
  formData.append('middle_name', p.middle_name || '')
  formData.append('last_name', p.last_name)
  formData.append('email', p.email)
  formData.append('birthdate', p.birthdate || '')
  formData.append('contact_number', p.contact_number)

  formData.append('company[company_name]', provider.companyInfo.company_name)
  formData.append('company[address]', provider.companyInfo.address)

  // Append documents (documents[0][document_type], documents[0][file])
  const docKeys = Object.keys(provider.documents)
  docKeys.forEach((key, index) => {
    const doc = provider.documents[key]
    const docType = mapDocumentType(key)
    formData.append(`documents[${index}][document_type]`, docType)
    if (doc.file) {
      formData.append(`documents[${index}][file]`, doc.file)
    }
  })

  try {
    const response = await createProvider(formData)
    alert(response.data.message || 'Application submitted! Pending admin approval.')

    // Reset form
    currentStep.value = 1
    provider.personalInfo.first_name = ''
    provider.personalInfo.middle_name = ''
    provider.personalInfo.last_name = ''
    provider.personalInfo.email = ''
    provider.personalInfo.birthdate = ''
    provider.personalInfo.contact_number = ''
    provider.companyInfo.company_name = ''
    provider.companyInfo.address = ''
    provider.documents = {}

    router.push('/')
  } catch (error) {
    console.error('Provider submission failed:', error)
    alert(error.response?.data?.message || 'Submission failed. Please try again.')
  } finally {
    isSubmitting.value = false
  }
}
</script>