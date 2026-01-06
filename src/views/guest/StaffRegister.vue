
<script setup>
import { reactive, ref } from 'vue'
import router from '@/router'

const currentStep = ref(1)
const isEditing = ref(false)
const isSubmitting = ref(false)
const steps = ['Personal Info', 'Documents', 'Review']

const staff = reactive({
  first_name: '',
  middle_name: '',
  last_name: '',
  email: '',
  birthdate: '',
  contact_number: '',
  application_type: ''
})

const documents = reactive({})

const requiredDocuments = [
  { label: 'Resume', key: 'Resume' },
  { label: 'Valid ID', key: 'Valid ID' },
  { label: 'Proof of Address', key: 'Proof of Address' },
  { label: 'Certificate (if applicable)', key: 'Certificate' }
]

function nextStep() {
  if (currentStep.value < steps.length) currentStep.value++
}

function prevStep() {
  if (currentStep.value > 1) currentStep.value--
}

function editStep(step) {
  currentStep.value = step
  isEditing.value = true
}

function handleStepSubmit() {
  if (isEditing.value) {
    currentStep.value = 3
    isEditing.value = false
  } else {
    nextStep()
  }
}

function handleFileUpload(event, key) {
  const file = event.target.files[0]
  if (file) {
    if (file.type.startsWith('image/')) {
      const reader = new FileReader()
      reader.onload = (e) => {
        documents[key] = { name: file.name, file, preview: e.target.result }
      }
      reader.readAsDataURL(file)
    } else {
      documents[key] = { name: file.name, file }
    }
  }
}

function isImage(doc) {
  return doc && doc.preview
}

async function submitForm() {
  isSubmitting.value = true
  const formData = new FormData()
  formData.append('first_name', staff.first_name)
  formData.append('middle_name', staff.middle_name || '')
  formData.append('last_name', staff.last_name)
  formData.append('email', staff.email)
  formData.append('birthdate', staff.birthdate || '')
  formData.append('contact_number', staff.contact_number)
  formData.append('application_type', staff.application_type)

  // Append documents (documents[0][document_type], documents[0][file])
  const docKeys = Object.keys(documents)
  docKeys.forEach((key, index) => {
    const doc = documents[key]
    formData.append(`documents[${index}][document_type]`, key)
    if (doc.file) {
      formData.append(`documents[${index}][file]`, doc.file)
    }
  })

  try {
    await createStaff(formData)
    alert('Application submitted. Pending approval.')
    // Reset form
    currentStep.value = 1
    staff.first_name = ''
    staff.middle_name = ''
    staff.last_name = ''
    staff.email = ''
    staff.birthdate = ''
    staff.contact_number = ''
    staff.application_type = ''
    Object.keys(documents).forEach(k => delete documents[k])
    router.push('/')
  } catch (err) {
    alert(err.response?.data?.message || 'Submission failed')
  } finally {
    isSubmitting.value = false
  }
}
</script>

<template>
  <section class="flex justify-center items-center min-h-screen bg-gray-50">
    <div class="bg-white rounded-lg shadow-lg p-8 w-full max-w-2xl">
      <h2 class="text-3xl font-bold text-green-800 mb-6 text-center">
        Staff Registration
      </h2>
      <p class="text-gray-600 mb-6 text-center">
        Complete the form below. Your application will be reviewed by the provider admin.
      </p>

      <!-- Stepper -->
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
          <input v-model="staff.first_name" type="text" placeholder="John" class="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-800 focus:border-green-800" required />
        </div>
        <div>
          <label class="block text-gray-700 mb-1">Middle Name</label>
          <input v-model="staff.middle_name" type="text" placeholder="M." class="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-800 focus:border-green-800" />
        </div>
        <div>
          <label class="block text-gray-700 mb-1">Last Name</label>
          <input v-model="staff.last_name" type="text" placeholder="Doe" class="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-800 focus:border-green-800" required />
        </div>
        <div>
          <label class="block text-gray-700 mb-1">Email</label>
          <input v-model="staff.email" type="email" placeholder="you@example.com" class="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-800 focus:border-green-800" required />
        </div>
        <div>
          <label class="block text-gray-700 mb-1">Birthdate</label>
          <input v-model="staff.birthdate" type="date" class="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-800 focus:border-green-800" required />
        </div>
        <div>
          <label class="block text-gray-700 mb-1">Contact Number</label>
          <input v-model="staff.contact_number" type="text" placeholder="0912-345-6789" class="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-800 focus:border-green-800" required />
        </div>
        <div>
          <label class="block text-gray-700 mb-1">Application Type</label>
          <select v-model="staff.application_type" class="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-800 focus:border-green-800" required>
            <option value="" disabled>Select application type</option>
            <option value="Human Resource">Human Resource</option>
            <option value="Marketing">Marketing</option>
            <option value="Operations">Operations</option>
            <option value="Inventory">Inventory</option>
            <option value="Procurement">Procurement</option>
            <option value="Installer">Installer</option>
          </select>
        </div>

        <div class="flex justify-between mt-4">
          <div></div>
          <button type="submit" class="bg-yellow-400 text-green-800 font-semibold px-4 py-2 rounded-md hover:bg-yellow-300 transition">
            {{ isEditing ? 'Save' : 'Next' }}
          </button>
        </div>
      </form>

      <!-- Step 2: Documents -->
      <form v-if="currentStep === 2" class="space-y-4" @submit.prevent="handleStepSubmit">
        <div v-for="doc in requiredDocuments" :key="doc.key">
          <label class="block text-gray-700 mb-1">{{ doc.label }}</label>
          <input type="file" @change="handleFileUpload($event, doc.key)" class="w-full" :required="!documents[doc.key]" />
          <div v-if="documents[doc.key]" class="mt-1 text-gray-700">
            <span class="font-semibold">{{ documents[doc.key].name }}</span>
            <img v-if="isImage(documents[doc.key])" :src="documents[doc.key].preview" alt="Preview" class="mt-2 w-32 h-32 object-contain border" />
          </div>
        </div>

        <div class="flex justify-between mt-4">
          <button type="button" @click="prevStep" class="bg-gray-300 text-gray-700 font-semibold px-4 py-2 rounded-md hover:bg-gray-200 transition">Back</button>
          <button type="submit" class="bg-yellow-400 text-green-800 font-semibold px-4 py-2 rounded-md hover:bg-yellow-300 transition">
            {{ isEditing ? 'Save' : 'Next' }}
          </button>
        </div>
      </form>

      <!-- Step 3: Review -->
      <div v-if="currentStep === 3" class="space-y-6">
        <div class="border p-4 rounded-md">
          <div class="flex justify-between items-center mb-2">
            <h4 class="font-semibold text-green-800">Personal Info</h4>
            <button @click="editStep(1)" class="text-yellow-400 hover:underline text-sm">Edit</button>
          </div>
          <p>First Name: {{ staff.first_name }}</p>
          <p>Middle Name: {{ staff.middle_name }}</p>
          <p>Last Name: {{ staff.last_name }}</p>
          <p>Email: {{ staff.email }}</p>
          <p>Birthdate: {{ staff.birthdate }}</p>
          <p>Contact Number: {{ staff.contact_number }}</p>
        </div>

        <div class="border p-4 rounded-md">
          <div class="flex justify-between items-center mb-2">
            <h4 class="font-semibold text-green-800">Uploaded Documents</h4>
            <button @click="editStep(2)" class="text-yellow-400 hover:underline text-sm">Edit</button>
          </div>
          <ul>
            <li v-for="(doc, key) in documents" :key="key">
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