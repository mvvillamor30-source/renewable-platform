<script setup>
import { ref, reactive, computed, onMounted } from 'vue'
import api from '@/services/axios'
import { useRouter } from 'vue-router'

// =======================
// STATE
// =======================
const router = useRouter()
const isSubmitting = ref(false)

const profileForm = reactive({
  first_name: '',
  middle_name: '',
  last_name: '',
  email: '',
  contact_number: '',
  birthdate: '',
  current_password: '',
  password: '',
  password_confirmation: ''
})

// Computed full name for updating users.name
const fullName = computed(() =>
  `${profileForm.first_name} ${profileForm.middle_name} ${profileForm.last_name}`.replace(/\s+/g, ' ').trim()
)

// Fetch current user's profile (similar to fetchAdmins)
const fetchProfile = async () => {
  try {
    const res = await api.get('/profile') // endpoint to get current user's profile
    const profile = res.data

    // Map to profileForm (like viewUser in UserManagement)
    profileForm.first_name = profile.first_name || ''
    profileForm.middle_name = profile.middle_name || ''
    profileForm.last_name = profile.last_name || ''
    profileForm.contact_number = profile.contact_number || ''
    profileForm.birthdate = profile.birthdate ? profile.birthdate.split('T')[0] : ''
    profileForm.email = profile.email || ''
  } catch (err) {
    console.error('Failed to fetch profile:', err)
  }
}

onMounted(() => {
  fetchProfile()
})

// =======================
// SUBMIT PROFILE UPDATE
// =======================
const submitProfile = async () => {
  // If changing password, current password must be provided
  if (profileForm.password) {
  if (!profileForm.current_password) {
    alert('Please enter your current password to change password')
    return
  }

  // Trim to avoid accidental spaces
  if (profileForm.password.trim() !== profileForm.password_confirmation.trim()) {
    alert('New passwords do not match')
    return
  }
}

  isSubmitting.value = true

  try {
    const payload = {
      first_name: profileForm.first_name,
      middle_name: profileForm.middle_name,
      last_name: profileForm.last_name,
      contact_number: profileForm.contact_number,
      birthdate: profileForm.birthdate,
      email: profileForm.email,
      password: profileForm.password || undefined,
      password_confirmation: profileForm.password_confirmation || undefined,
      current_password: profileForm.current_password || undefined, // send current password
    }

    const res = await api.put('/profile', payload)
    alert(res.data.message || 'Profile updated successfully')

    // Reset password fields
    profileForm.current_password = ''
    profileForm.password = ''
    profileForm.password_confirmation = ''
  } catch (err) {
    alert(err.response?.data?.message || 'Failed to update profile')
  } finally {
    isSubmitting.value = false
  }
}
</script>

<template>
  <div class="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow">
    <h2 class="text-2xl font-semibold mb-4 text-blue-900">Update Profile</h2>

    <!-- Personal Information -->
    <div class="mb-6">
      <h3 class="font-medium mb-2">Personal Information</h3>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <input
          v-model="profileForm.first_name"
          type="text"
          placeholder="First Name"
          class="border rounded px-3 py-2 w-full"
        />
        <input
          v-model="profileForm.middle_name"
          type="text"
          placeholder="Middle Name"
          class="border rounded px-3 py-2 w-full"
        />
        <input
          v-model="profileForm.last_name"
          type="text"
          placeholder="Last Name"
          class="border rounded px-3 py-2 w-full"
        />
        <input
          v-model="profileForm.contact_number"
          type="text"
          placeholder="Contact Number"
          class="border rounded px-3 py-2 w-full"
        />
        <input
          v-model="profileForm.birthdate"
          type="date"
          placeholder="Birthdate"
          class="border rounded px-3 py-2 w-full"
        />
      </div>
    </div>

    <!-- Email & Password -->
    <div class="mb-6">
      <h3 class="font-medium mb-2">Account Information</h3>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <input
          v-model="profileForm.email"
          type="email"
          placeholder="Email"
          class="border rounded px-3 py-2 w-full"
        />
        <input
  v-model="profileForm.current_password"
  type="password"
  placeholder="Current Password (required to change password)"
  class="border rounded px-3 py-2 w-full"
/>
        <input
          v-model="profileForm.password"
          type="password"
          placeholder="Password (leave blank to keep current)"
          class="border rounded px-3 py-2 w-full"
        />
        <input
          v-model="profileForm.password_confirmation"
          type="password"
          placeholder="Confirm Password"
          class="border rounded px-3 py-2 w-full"
        />
      </div>
    </div>

    <!-- Submit -->
    <div class="flex justify-end">
      <button
        @click="submitProfile"
        :disabled="isSubmitting"
        class="px-6 py-2 rounded bg-blue-900 text-white hover:bg-blue-800"
      >
        {{ isSubmitting ? 'Updating...' : 'Update Profile' }}
      </button>
    </div>
  </div>
</template>