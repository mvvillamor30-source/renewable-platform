<script setup>
import { ref, computed, onMounted } from 'vue'
import Table from '@/views/components/tables/Table.vue'
import Modal from '@/views/components/modals/Modal.vue'
import { createAdmin, getAdmins, deleteAdmin, getCustomers, deleteCustomer } from '@/services/adminService'

// STATE
const providers = ref([
  { provider_id: 1, owner_name: 'Juan Dela Cruz', company_name: 'SolarTech PH', email: 'info@solartech.ph', status: 'Pending' }
])

const admins = ref([]) // Will fetch from API

const customers = ref([])

const fetchCustomers = async () => {
  try {
    const res = await getCustomers()

    // Backend returns { customers: [...] } (or in some endpoints { data: [...] })
    const raw = res.data.customers || res.data.data || []

    // Map backend structure → table-friendly structure (keep raw payload for detail view)
    customers.value = (raw || []).map(c => ({
      customer_id: c.id,
      name: c.user?.name || `${c.first_name || ''} ${c.last_name || ''}`.trim() || 'N/A',
      email: c.user?.email || c.email || 'N/A',
      status: c.user?.status || c.status || 'Unknown',
      _raw: c
    }))

  } catch (err) {
    console.error('Failed to fetch customers:', err)
    customers.value = []
  }
} 

// MODAL STATE
const showAdminProfileModal = ref(false)
const showUserAccountModal = ref(false)
const isSubmitting = ref(false)

// FORMS
const adminForm = ref({
  first_name: '',
  middle_name: '',
  last_name: '',
  email: '',
  contact_number: '',
  birthdate: ''
})
const accountForm = ref({
  password: '',
  password_confirmation: ''
})



// ACTIONS
const addAdmin = () => {
  showAdminProfileModal.value = true
}

const submitAdminProfile = () => {
  showAdminProfileModal.value = false
  showUserAccountModal.value = true
}

const submitUserAccount = async () => {
  if (accountForm.value.password !== accountForm.value.password_confirmation) {
    alert('Passwords do not match')
    return
  }

  isSubmitting.value = true

  const payload = {
    first_name: adminForm.value.first_name,
    middle_name: adminForm.value.middle_name,
    last_name: adminForm.value.last_name,
    email: adminForm.value.email,
    contact_number: adminForm.value.contact_number,
    birthdate: adminForm.value.birthdate,
    password: accountForm.value.password,
    password_confirmation: accountForm.value.password_confirmation
  }

  try {
    const response = await createAdmin(payload)
    alert(response.data.message || 'Admin created successfully')

    // Refresh admin table
    await fetchAdmins()

    // Close modal and reset
    showUserAccountModal.value = false
    resetForms()
  } catch (err) {
    alert(err.response?.data?.message || 'Error creating admin')
  } finally {
    isSubmitting.value = false
  }
}

const resetForms = () => {
  adminForm.value = {
    first_name: '',
    middle_name: '',
    last_name: '',
    email: '',
    contact_number: '',
    birthdate: ''
  }
  accountForm.value = { password: '', password_confirmation: '' }
}

// TABLE ACTIONS

const showAdminViewModal = ref(false)
const showCustomerViewModal = ref(false)

const customerForm = ref({
  customer_id: null,
  id: null,
  name: '',
  email: '',
  contact_number: '',
  province: '',
  city: '',
  barangay: '',
  subdivision: '',
  street: '',
  house_number: '',
  postal_code: '',
  created_at: '',
  updated_at: ''
})

const viewUser = (admin) => {
  adminForm.value = {
    id: admin.id,                  // users.id
    name: admin.name,              // users.name
    email: admin.email,            // users.email
    contact_number: admin.contact_number, // admin_profiles.contact_number
    birthdate: admin.birthdate ? admin.birthdate.split('T')[0] : '',
    created_at: admin.created_at ? admin.created_at.split('T')[0] : '',
    updated_at: admin.updated_at ? admin.updated_at.split('T')[0] : ''
  }

  showAdminViewModal.value = true
}

const viewCustomerAccount = (customer) => {
  const raw = customer._raw || customer

  customerForm.value = {
    customer_id: customer.customer_id || raw.id || null,
    id: raw.user?.id || null,
    name: raw.user?.name || `${raw.first_name || ''} ${raw.last_name || ''}`.trim() || 'N/A',
    email: raw.user?.email || raw.email || 'N/A',
    contact_number: raw.contact_number || '',
    province: raw.province || '',
    city: raw.city || '',
    barangay: raw.barangay || '',
    subdivision: raw.subdivision || '',
    street: raw.street || '',
    house_number: raw.house_number || '',
    postal_code: raw.postal_code || '',
    created_at: (raw.created_at || raw.user?.created_at || '').split('T')[0] || '',
    updated_at: (raw.updated_at || raw.user?.updated_at || '').split('T')[0] || ''
  }

  showCustomerViewModal.value = true
}


// FETCH ADMINS
const fetchAdmins = async () => {
  try {
    const response = await getAdmins()
    admins.value = response.data.data || []
  } catch (err) {
    console.error('Failed to fetch admins:', err)
  }
}

onMounted(() => {
  fetchAdmins()
  fetchCustomers()
})

const deleteAdminAccount = async (admin) => {
  const confirmed = confirm(
    `Are you sure you want to delete admin "${admin.name}"?\nThis action cannot be undone.`
  )

  if (!confirmed) return

  try {
    await deleteAdmin(admin.id)
    alert('Admin deleted successfully')
    await fetchAdmins()
  } catch (err) {
    alert(err.response?.data?.message || 'Failed to delete admin')
  }
}

const deleteCustomerAccount = async (customer) => {
  const customerName = customer.name || `${customer.first_name || ''} ${customer.last_name || ''}`.trim() || 'Customer'
  const confirmed = confirm(
    `Are you sure you want to delete customer "${customerName}"?\nThis action cannot be undone.`
  )

  if (!confirmed) return

  try {
    await deleteCustomer(customer.customer_id || customer.id)
    alert('Customer deleted successfully')
    await fetchCustomers()
  } catch (err) {
    alert(err.response?.data?.message || 'Failed to delete customer')
  }
}

</script>

<template>
  <div class="p-6 space-y-10 bg-gray-50 min-h-screen">
    <h1 class="text-2xl font-bold text-blue-900">User Management</h1>

    <!-- PROVIDERS -->
    <Table
      title="Providers"
      :columns="[
        { key: 'provider_id', label: 'Provider ID' },
        { key: 'owner_name', label: 'Owner Name' },
        { key: 'company_name', label: 'Company Name' },
        { key: 'email', label: 'Email' },
        { key: 'status', label: 'Application Status' }
      ]"
      :users="providers"
      @view="viewUser"
    >
      <template #view>View</template>
    </Table>

    <!-- SYSTEM ADMINS -->
    <Table
      title="System Admin"
      :columns="[
        { key: 'id', label: 'Admin ID' },
        { key: 'name', label: 'Name' },
        { key: 'email', label: 'Email' }
      ]"
      :users="admins"
      :addButton="{ label: '+ Add Admin', action: addAdmin }"
      @view="viewUser"
      @delete="deleteAdminAccount"
    >
      <template #view>View</template>
      <template #delete>Delete</template>
    </Table>


    <!-- CUSTOMERS -->
    <Table
      title="Customers"
      :columns="[
        { key: 'customer_id', label: 'Customer ID' },
        { key: 'name', label: 'Name' },
        { key: 'email', label: 'Email' },
        { key: 'status', label: 'Status' }
      ]"
      :users="customers"
      @view="viewCustomerAccount"
      @delete="deleteCustomerAccount"
    >
      <template #view>View</template>
      <template #delete>Delete</template>
    </Table>

    <!-- ADD ADMIN MODAL -->

<Modal
      :show="showAdminProfileModal"
  title="Add New System Admin"
  @close="showAdminProfileModal = false"
  @submit="submitAdminProfile"
    >
      <template #body>
        <form class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label class="text-sm font-medium text-gray-700">First Name</label>
            <input v-model="adminForm.first_name" type="text" class="input" />
          </div>

          <div>
            <label class="text-sm font-medium text-gray-700">Middle Name</label>
            <input v-model="adminForm.middle_name" type="text" class="input" />
          </div>

          <div>
            <label class="text-sm font-medium text-gray-700">Last Name</label>
            <input v-model="adminForm.last_name" type="text" class="input" />
          </div>

          <div>
            <label class="text-sm font-medium text-gray-700">Email</label>
            <input v-model="adminForm.email" type="email" class="input" />
          </div>

          <div>
            <label class="text-sm font-medium text-gray-700">Contact Number</label>
            <input v-model="adminForm.contact_number" type="text" class="input" />
          </div>

          <div>
            <label class="text-sm font-medium text-gray-700">Birthdate</label>
            <input v-model="adminForm.birthdate" type="date" class="input" />
          </div>
        </form>
      </template>
    </Modal>

<Modal
  :show="showUserAccountModal"
  title="Create User Account"
  @close="showUserAccountModal = false"
  @submit="submitUserAccount"
>
  <template #body>
    <div class="space-y-4">
      <div>
        <label class="label">Email</label>
        <input type="email" :value="adminForm.email" disabled class="input bg-gray-100" />
      </div>

      <div>
        <label class="label">Password</label>
        <input type="password" v-model="accountForm.password" class="input" />
      </div>

      <div>
        <label class="label">Confirm Password</label>
        <input type="password" v-model="accountForm.password_confirmation" class="input" />
      </div>
    </div>
  </template>
        <template #footer>
        <button
          :disabled="isSubmitting"
          class="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
        >
          {{ isSubmitting ? 'Saving...' : 'Submit' }}
        </button>
      </template>
</Modal>

<Modal
  title="Admin Details"
  :show="showAdminViewModal"
  @close="showAdminViewModal = false"
>
  <template #body>
    <div class="space-y-2">
      <p><strong>ID:</strong> {{ adminForm.id || 'N/A' }}</p>
      <p><strong>Name:</strong> {{ adminForm.name }}</p>
      <p><strong>Email:</strong> {{ adminForm.email }}</p>
      <p><strong>Contact Number:</strong> {{ adminForm.contact_number }}</p>
      <p><strong>Birthdate:</strong> {{ adminForm.birthdate }}</p>
      <p><strong>Created At:</strong> {{ adminForm.created_at }}</p>
      <p><strong>Updated At:</strong> {{ adminForm.updated_at }}</p>
    </div>
  </template>
</Modal>

<Modal
  title="Customer Details"
  :show="showCustomerViewModal"
  @close="showCustomerViewModal = false"
>
  <template #body>
    <div class="space-y-2">
      <p><strong>Customer ID:</strong> {{ customerForm.customer_id || 'N/A' }}</p>
      <p><strong>Name:</strong> {{ customerForm.name }}</p>
      <p><strong>Email:</strong> {{ customerForm.email }}</p>
      <p><strong>Contact Number:</strong> {{ customerForm.contact_number }}</p>
      <p><strong>Province:</strong> {{ customerForm.province }}</p>
      <p><strong>City:</strong> {{ customerForm.city }}</p>
      <p><strong>Barangay:</strong> {{ customerForm.barangay }}</p>
      <p><strong>Subdivision:</strong> {{ customerForm.subdivision }}</p>
      <p><strong>Street:</strong> {{ customerForm.street }}</p>
      <p><strong>House Number:</strong> {{ customerForm.house_number }}</p>
      <p><strong>Postal Code:</strong> {{ customerForm.postal_code }}</p>
      <p><strong>Created At:</strong> {{ customerForm.created_at }}</p>
      <p><strong>Updated At:</strong> {{ customerForm.updated_at }}</p>
    </div>
  </template>
</Modal>

  </div>
</template>