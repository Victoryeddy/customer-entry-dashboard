<template>
  <span
    :class="[
      'inline-flex items-center px-3 py-1 rounded-full text-sm font-medium',
      isActive ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
    ]"
  >
    <span
      :class="[
        'h-2 w-2 rounded-full mr-2',
        isActive ? 'bg-green-500' : 'bg-red-500'
      ]"
    ></span>
    {{ isActive ? 'Active' : 'Inactive' }}
  </span>
</template>

<script setup>
defineProps({
  isActive: {
    type: Boolean,
    required: true,
  },
});
</script>
