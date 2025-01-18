<script setup>
defineProps({
  color: {
    type: String,
    default: "bg-white text-black",
  },
});
</script>
<template>
  <div
    :class="`rounded-xl p-6 shadow-[0_4px_12px_rgba(0,0,0,0.05)] 
    transition-all duration-300 ease-in-out hover:-translate-y-1 
    hover:shadow-[0_8px_24px_rgba(0,0,0,0.12)] ${color}`"
  >
    <div class="space-y-4">
      <slot name="content" />
    </div>
  </div>
</template>

