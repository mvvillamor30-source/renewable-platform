<template>
  <section class="flex justify-center items-center min-h-screen bg-gray-50">
    <div class="bg-white rounded-lg shadow-lg p-8 w-full max-w-lg">
      <h2 class="text-3xl font-bold text-green-800 mb-4 text-center">
        Create an Account
      </h2>
      <p class="text-gray-600 mb-6 text-center">
        Register to access renewable energy solutions.
      </p>

      <form v-if="activeTab === 'customer'" @submit.prevent="submitForm" class="space-y-4">
        <!-- Name -->
        <div class="grid grid-cols-1 md:grid-cols-3 gap-3">
          <div>
            <label class="block text-gray-700 mb-1">First Name</label>
            <input type="text" v-model="form.first_name"
              class="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-800 focus:border-green-800" />
            <span class="text-red-500 text-sm" v-if="errors.first_name">{{ errors.first_name }}</span>
          </div>
          <div>
            <label class="block text-gray-700 mb-1">Middle Name</label>
            <input type="text" v-model="form.middle_name"
              class="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-800 focus:border-green-800" />
          </div>
          <div>
            <label class="block text-gray-700 mb-1">Last Name</label>
            <input type="text" v-model="form.last_name"
              class="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-800 focus:border-green-800" />
            <span class="text-red-500 text-sm" v-if="errors.last_name">{{ errors.last_name }}</span>
          </div>
        </div>

        <!-- Contact -->
        <div>
          <label class="block text-gray-700 mb-1">Email Address</label>
          <input type="email" v-model="form.email"
            class="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-800 focus:border-green-800" />
          <span class="text-red-500 text-sm" v-if="errors.email">{{ errors.email }}</span>
        </div>

        <div>
          <label class="block text-gray-700 mb-1">Contact Number</label>
          <input type="text" v-model="form.contact_number" placeholder="09XXXXXXXXX"
            class="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-800 focus:border-green-800" />
          <span class="text-red-500 text-sm" v-if="errors.contact_number">{{ errors.contact_number }}</span>
        </div>

        <!-- Address -->
        <div class="border-t pt-4">
          <h3 class="text-lg font-semibold text-green-800 mb-2">Address Information</h3>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div>
              <label class="block text-gray-700 mb-1">Province</label>
              <input type="text" v-model="form.province" disabled
                class="w-full px-4 py-2 border rounded-md bg-gray-100 focus:outline-none focus:ring-2 focus:ring-green-800 focus:border-green-800" />
            </div>
            <div>
              <label class="block text-gray-700 mb-1">City / Municipality</label>
              <input type="text" v-model="form.city"
                class="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-800 focus:border-green-800" />
              <span class="text-red-500 text-sm" v-if="errors.city">{{ errors.city }}</span>
            </div>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-3 mt-3">
            <div>
              <label class="block text-gray-700 mb-1">Barangay</label>
              <input type="text" v-model="form.barangay"
                class="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-800 focus:border-green-800" />
              <span class="text-red-500 text-sm" v-if="errors.barangay">{{ errors.barangay }}</span>
            </div>
            <div>
              <label class="block text-gray-700 mb-1">Subdivision</label>
              <input type="text" v-model="form.subdivision"
                class="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-800 focus:border-green-800" />
            </div>
          </div>

          <div class="mt-3">
            <label class="block text-gray-700 mb-1">Street</label>
            <input type="text" v-model="form.street"
              class="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-800 focus:border-green-800" />
          </div>
          <div class="mt-3">
            <label class="block text-gray-700 mb-1">House No.</label>
            <input type="text" v-model="form.house_number"
              class="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-800 focus:border-green-800" />
          </div>

          <div class="mt-3">
            <label class="block text-gray-700 mb-1">Postal Code</label>
            <input type="text" v-model="form.postal_code"
              class="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-800 focus:border-green-800" />
          </div>
        </div>

        <!-- Password -->
        <div>
          <label class="block text-gray-700 mb-1">Password</label>
          <input type="password" v-model="form.password"
            class="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-800 focus:border-green-800" />
          <span class="text-red-500 text-sm" v-if="errors.password">{{ errors.password }}</span>
        </div>

        <div>
          <label class="block text-gray-700 mb-1">Confirm Password</label>
          <input type="password" v-model="form.password_confirmation"
            class="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-800 focus:border-green-800" />
        </div>

        <button type="submit"
  :disabled="isLoading"
  class="w-full bg-green-800 text-white font-semibold px-4 py-2 rounded-md hover:bg-green-700 transition flex items-center justify-center gap-2">
  <span v-if="isLoading" class="loader-border h-5 w-5 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
  <span>{{ isLoading ? 'Creating...' : 'Create Account' }}</span>
</button>

        <p v-if="successMessage" class="text-green-600 mt-2 text-center">{{ successMessage }}</p>
        <p v-if="errorMessage" class="text-red-500 mt-2 text-center">{{ errorMessage }}</p>
      </form>

      <!-- Provider Registration Placeholder -->
      <form v-if="activeTab === 'provider'" class="space-y-4">
        <p class="text-center text-gray-600">
          Provider registration form goes here.
        </p>
      </form>

      <!-- Login Link -->
      <p class="mt-6 text-center text-gray-600">
        Already have an account?
        <router-link to="/login" class="text-green-800 hover:underline">Login</router-link>
      </p>
    </div>
  </section>
</template>

<script setup>
import { ref, reactive } from 'vue'
import { useRouter } from 'vue-router'
import { createCustomer } from '@/services/customerService'

const router = useRouter()
const activeTab = ref('customer')

// Form fields
const form = reactive({
  first_name: '',
  middle_name: '',
  last_name: '',
  email: '',
  contact_number: '',
  province: 'Cavite', // default
  city: '',
  barangay: '',
  subdivision: '',
  street: '',
  house_number: '',
  postal_code: '',
  password: '',
  password_confirmation: ''
})

// Validation errors
const errors = reactive({})

// Messages
const successMessage = ref('')
const errorMessage = ref('')

// Loading state
const isLoading = ref(false)

const submitForm = async () => {
  // clear previous messages
  successMessage.value = ''
  errorMessage.value = ''
  Object.keys(errors).forEach(key => errors[key] = '')

  // Set loading state
  isLoading.value = true

  try {
    const response = await createCustomer(form)

    successMessage.value = response.data.message || 'Registration successful!'

    // Save token for future auth (optional)
    if (response.data.token) localStorage.setItem('token', response.data.token)

    // Reset form
    Object.keys(form).forEach(key => form[key] = key === 'province' ? 'Cavite' : '')

    // Redirect to login after short delay (2 seconds)
    setTimeout(() => {
      router.push('/login')
    }, 2000)

  } catch (err) {
    if (err.response && err.response.status === 422) {
      // Validation errors from Laravel
      Object.assign(errors, err.response.data.errors)
      errorMessage.value = 'Please fix the highlighted errors.'
    } else {
      errorMessage.value = 'Registration failed. Please try again.'
      console.error(err)
    }
  } finally {
    isLoading.value = false
  }
}
</script>

<style scoped>

.loader-border {
  border-style: solid;
  border-width: 2px;
  border-radius: 50%;
  border-top-color: transparent;
}

</style>