<script setup>
defineProps({
  type: {
    type: String,
    default: "button", 
  },
  variant: {
    type: String,
    default: "",
    required: false 
  },
  disabled: {
    type: Boolean,
    default: false, 
  },
});

</script>
<template>
  <button
    :type="type"
    :class="[
      'inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm bg-blue-500 text-white hover:bg-blue-600 focus:ring-blue-500',
      disabled ? 'opacity-50 cursor-not-allowed' : '',
    ]"
    :disabled="disabled"
    @click="$emit('click')"
  >
    <slot />
  </button>
</template>
