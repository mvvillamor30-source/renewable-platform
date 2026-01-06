<script setup>
import { ref, defineProps, defineEmits, computed } from 'vue'

const props = defineProps({
  title: { type: String, default: 'Modal Title' },
  show: { type: Boolean, required: true }, // control visibility from parent
  size: { type: String, default: 'md' } // sm, md, lg, xl, full
})

const sizeClass = computed(() => {
  switch (props.size) {
    case 'sm': return 'max-w-sm'
    case 'md': return 'max-w-md'
    case 'lg': return 'max-w-lg'
    case 'xl': return 'max-w-4xl'
    case 'full': return 'max-w-full mx-2'
    default: return 'max-w-md'
  }
})

const emit = defineEmits(['close', 'submit'])

const closeModal = () => emit('close')
const submitForm = () => emit('submit')
</script>

<template>
  <div
    v-if="show"
    class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
  >
    <div :class="['bg-white rounded-lg shadow-lg w-full', sizeClass, 'max-h-[90vh] overflow-auto']">
      <!-- Header -->
      <div class="flex justify-between items-center border-b px-4 py-3">
        <h3 class="text-lg font-semibold text-blue-900">{{ title }}</h3>
        <button @click="closeModal" class="text-gray-400 hover:text-gray-600">
          ✕
        </button>
      </div>

      <!-- Body -->
      <div class="px-4 py-4">
        <slot name="body">
          <!-- Default Body -->
          <p>Modal content goes here.</p>
        </slot>
      </div>

      <!-- Footer -->
      <div class="flex justify-end border-t px-4 py-3 space-x-2">
        <button
          @click="closeModal"
          class="px-4 py-2 rounded border hover:bg-gray-100"
        >
          Cancel
        </button>
        <button
          @click="submitForm"
          class="px-4 py-2 rounded bg-blue-900 text-white hover:bg-blue-800"
        >
          Submit
        </button>
      </div>
    </div>
  </div>
</template>