<script setup>
defineProps({
    errorMessage: String
})
</script>
<template>
    <div v-if="errorMessage">
        <p class="text-red-600 text-sm">{{errorMessage}}</p>
    </div>
</template>