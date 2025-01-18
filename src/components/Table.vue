<script setup>
defineProps({
  bordered: {
    type: Boolean,
    default: true,
  },
  headers: {
    type: Array,
    default: [],
  },
  items: {
    type: Array,
    default: [],
  },
  noDataText: {
    type: String,
    default: "No Customer Recorded",
  },
});
</script>

<template>
  <div class="overflow-x-auto">
    <div class="flex lg:justify-end">
      <slot name="search" />
    </div>
    <table
      class="min-w-full border-collapse border border-gray-200 bg-white shadow rounded-lg"
    >
      <thead class="bg-gray-50">
        <tr>
          <th
            class="px-4 py-2 border border-gray-200 text-left text-sm font-semibold text-gray-600"
            v-for="(header, index) in headers"
            :key="index"
            :colspan="0.5"
          >
            {{ header.name }}
          </th>
        </tr>
      </thead>
      <tbody>
        <template v-if="!items.length">
          <tr>
            <td :colspan="headers?.length" class="text-center p-3">
              {{ noDataText }}
            </td>
          </tr>
        </template>
        <template v-else>
          <tr v-for="(item, index) in items" :key="item">
            <td
              class="px-4 py-2 border border-gray-200 text-sm text-gray-700"
              v-for="(tableColumn, tableColumnIndex) in headers"
              :key="tableColumnIndex"
            >
              <slot
                :name="tableColumn.value"
                :index="index"
                :item="item"
                
              >
                <template v-if="tableColumn?.value == 'count'">
                  {{ index + 1 }}
                </template>
                <template v-else>
                  {{ item ? item[tableColumn?.value] : "No Data" }}
                </template>
              </slot>
            </td>
          </tr>
        </template>
      </tbody>
    </table>
  </div>
</template>

<style scoped></style>
