<script setup>
defineProps({
  isOpen: {
    type: Boolean,
    required: true,
  },
  responsive: {
    type: Boolean,
    default: true, 
  },
  header: {
    type: Boolean,
    required: true 
  },
});

const emit = defineEmits(['close']);


function closeModal() {
  emit('close'); 
}
</script>
<template>
  <div
    v-show="isOpen"
    class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
  >
  
    <div
      class="relative w-full max-w-lg p-6 bg-white rounded-lg shadow-lg overflow-auto"
      :class="`${ responsive ? 'w-full sm:w-3/4 lg:w-4/5' : 'w-full'}`"
    >
      
      <button
        class="absolute top-3 right-3 text-gray-500 hover:text-gray-800"
        @click="closeModal"
      >
        ✕
      </button>

      
      <header v-if="header" class="mb-4 border-b border-gray-200 pb-2">
          <h2 class="text-lg font-semibold text-gray-700"><slot name="header" /></h2>
      </header>

     
      <div class="mb-4">
        <slot name="body">
          <p class="text-sm text-gray-600">Default body content.</p>
        </slot>
      </div>

    </div>
  </div>
</template>


