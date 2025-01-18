<script setup>
import Person from "@/components/Icons/Person.vue"
defineProps({
  pageTitle: String
})
</script>
<template>
  <div class="min-h-screen bg-gray-100">
    
    <main class=" min-h-screen">
    
      <header class="bg-white shadow">
        <div class="px-6 py-4">
          <div class="flex items-center justify-end">
           
            <div class="flex items-center">
              <span class="me-2 mt-1 text-sm text-gray-600">Victory Ndu</span>
              <button class="rounded-full bg-gray-200 p-2">
               <Person/>
              </button>
            </div>
          </div>
        </div>
      </header>
      <div class="p-6">
        <slot />
      </div>
    </main>
  </div>
</template>

