<script setup>
import { ref } from "vue";

const emit = defineEmits(["form-submitted"]);

const currentStep = ref(1);
const totalSteps = 2;

const nextStep = () => {
  if (currentStep.value < totalSteps) {
    currentStep.value += 1;
  }
};

const prevStep = () => {
  if (currentStep.value > 1) {
    currentStep.value -= 1;
  }
};

const submitForm = () => {
  emit("form-submitted");
};
</script>
<template>
  <div class="">
    <div class="flex justify-between mb-6">
      <div
        :class="[
          'w-8 h-8 flex items-center justify-center rounded-full',
          currentStep === 1
            ? 'bg-blue-500 text-white'
            : 'bg-gray-300 text-gray-600',
        ]"
      >
        1
      </div>
      <div
        :class="[
          'w-8 h-8 flex items-center justify-center rounded-full',
          currentStep === 2
            ? 'bg-blue-500 text-white'
            : 'bg-gray-300 text-gray-600',
        ]"
      >
        2
      </div>
    </div>

    <form @submit.prevent="submitForm">
      <div v-if="currentStep === 1">
        <slot name="firstSet" />
      </div>

      <div v-if="currentStep === 2">
        <slot name="secondSet" />
      </div>

      <div class="mt-6">
        <slot
          name="actions"
          :nextStep="nextStep"
          :prevStep="prevStep"
          :currentStep="currentStep"
          :totalSteps="totalSteps"
          :submitForm="submitForm"
        />
      </div>
    </form>
  </div>
</template>
