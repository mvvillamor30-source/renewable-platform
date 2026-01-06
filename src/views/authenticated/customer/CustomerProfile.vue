<script setup>
import { ref, reactive, onMounted } from 'vue'
import { getCustomerProfile, updateCustomerProfile } from '@/services/axios'

// form state
const form = reactive({
  first_name: '',
  middle_name: '',
  last_name: '',
  contact_number: '',
  city: '',
  barangay: '',
  subdivision: '',
  street: '',
  house_number: '',
  postal_code: '',
  email: '',
  password: '',
  password_confirmation: ''
})

// ui state
const loading = ref(false)
const successMessage = ref('')
const errors = ref({})

// load profile
const fetchProfile = async () => {
  try {
    loading.value = true
    const { data } = await getCustomerProfile()

    Object.assign(form, {
      ...data.customer,
      email: data.user.email,
      password: '',
      password_confirmation: ''
    })
  } catch (err) {
    console.error(err)
  } finally {
    loading.value = false
  }
}

// submit update
const submit = async () => {
  errors.value = {}
  successMessage.value = ''

  // basic frontend validation (mirrors backend)
  if (!form.first_name || !form.last_name) {
    errors.value.name = 'First and last name are required'
    return
  }

  if (form.password && form.password.length < 6) {
    errors.value.password = 'Password must be at least 6 characters'
    return
  }

  if (form.password !== form.password_confirmation) {
    errors.value.password_confirmation = 'Passwords do not match'
    return
  }

  try {
    loading.value = true

    const payload = { ...form }

    // do not send empty password
    if (!payload.password) {
      delete payload.password
      delete payload.password_confirmation
    }

    await updateCustomerProfile(payload)
    successMessage.value = 'Profile updated successfully'
  } catch (err) {
    if (err.response?.status === 422) {
      errors.value = err.response.data.errors
    } else {
      console.error(err)
    }
  } finally {
    loading.value = false
  }
}

onMounted(fetchProfile)
</script>

<template>
  <div class="max-w-4xl mx-auto p-6 bg-white rounded-xl shadow">
    <h2 class="text-2xl font-semibold mb-6 text-green-700">
      Customer Profile
    </h2>

    <form @submit.prevent="submit" class="space-y-8">

  <!-- PERSONAL INFORMATION -->
  <section class="bg-white border rounded-xl p-6 shadow-sm">
    <h3 class="text-lg font-semibold text-green-700 mb-4">
      Personal Information
    </h3>

    <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
      <div>
        <label class="label">First Name</label>
        <input v-model="form.first_name" class="input" />
      </div>

      <div>
        <label class="label">Middle Name</label>
        <input v-model="form.middle_name" class="input" />
      </div>

      <div>
        <label class="label">Last Name</label>
        <input v-model="form.last_name" class="input" />
      </div>
    </div>
  </section>

  <!-- CONTACT INFORMATION -->
  <section class="bg-white border rounded-xl p-6 shadow-sm">
    <h3 class="text-lg font-semibold text-green-700 mb-4">
      Contact Information
    </h3>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div>
        <label class="label">Contact Number</label>
        <input v-model="form.contact_number" class="input" />
      </div>

      <div>
        <label class="label">Email Address</label>
        <input v-model="form.email" class="input" />
      </div>
    </div>
  </section>

  <!-- ADDRESS -->
  <section class="bg-white border rounded-xl p-6 shadow-sm">
    <h3 class="text-lg font-semibold text-green-700 mb-4">
      Address Details
    </h3>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div>
        <label class="label">City</label>
        <input v-model="form.city" class="input" />
      </div>

      <div>
        <label class="label">Barangay</label>
        <input v-model="form.barangay" class="input" />
      </div>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
      <div>
        <label class="label">Subdivision</label>
        <input v-model="form.subdivision" class="input" />
      </div>

      <div>
        <label class="label">Street</label>
        <input v-model="form.street" class="input" />
      </div>

      <div>
        <label class="label">House Number</label>
        <input v-model="form.house_number" class="input" />
      </div>
    </div>

    <div class="mt-4 w-full md:w-1/3">
      <label class="label">Postal Code</label>
      <input v-model="form.postal_code" class="input" />
    </div>
  </section>

  <!-- SECURITY -->
  <section class="bg-white border rounded-xl p-6 shadow-sm">
    <h3 class="text-lg font-semibold text-green-700 mb-4">
      Security
    </h3>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div>
        <label class="label">New Password</label>
        <input
          type="password"
          v-model="form.password"
          class="input"
          placeholder="Leave blank to keep current"
        />
      </div>

      <div>
        <label class="label">Confirm Password</label>
        <input
          type="password"
          v-model="form.password_confirmation"
          class="input"
        />
      </div>
    </div>
  </section>

  <!-- FEEDBACK -->
  <div v-if="Object.keys(errors).length" class="text-sm text-red-600">
    <div v-for="(err, key) in errors" :key="key">
      {{ Array.isArray(err) ? err[0] : err }}
    </div>
  </div>

  <div v-if="successMessage" class="text-sm text-green-600">
    {{ successMessage }}
  </div>

  <!-- ACTION -->
  <div class="flex justify-end">
    <button
      type="submit"
      :disabled="loading"
      class="px-6 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition"
    >
      {{ loading ? 'Saving...' : 'Update Profile' }}
    </button>
  </div>

</form>

  </div>
</template>

<style scoped>

</style>
