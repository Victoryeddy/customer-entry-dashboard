<script setup>
import Errors from "./Errors.vue"
const props = defineProps({
  modelValue: String, 
  type: {
    type: String,
    default: 'text', 
  },
  placeholder: String,
  id: String,
  label: String,
  errorMessages: [Array, String],
  validate: Function
});


let emit = defineEmits(['update:modelValue']);

const handleInput = (event) => {
  emit('update:modelValue', event.target.value)
  if(props.validate){
    props.validate(event.target.value)
  }
}
</script>
<template>
  <div class="mb-4">
    <label v-if="label" :for="id" class="block text-sm font-medium text-gray-700 mb-1">
      {{ label }}
    </label>
    <input
      :id="id"
      :type="type"
      :placeholder="placeholder"
      :value="modelValue"
      @input="handleInput"
       @blur="validate"
      :class="`block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm ${errorMessages ? 'border-red-700 focus:border-red-700 focus:ring-red-700' : 'focus:ring-blue-500 focus:border-blue-500 sm:text-sm'}`"
      required
    />
    <Errors :errorMessage="errorMessages"/>
  </div>
</template>


