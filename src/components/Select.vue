<script setup>
defineProps({
  modelValue: [String, Number], 
  options: {
    type: Array,
    required: true, 
  },
  id: String,
  label: String,
});

defineEmits(['update:modelValue']);
</script>
<template>
  <div class="mb-4">
    <label v-if="label" :for="id" class="block text-sm font-medium text-gray-700 mb-1">
      {{ label }}
    </label>
    <select
      :id="id"
      :value="modelValue"
      @change="$emit('update:modelValue', $event.target.value)"
      class="block w-full px-2 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
      required
    >
      <option v-for="(option, index) in options" :key="index" :value="option.state">
        {{ option?.state }}
      </option>
    </select>
  </div>
</template>


