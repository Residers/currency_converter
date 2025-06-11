<script setup>
const { history } = useCurrency()
</script>

<template>
  <div class="max-w-md mx-auto p-4">
    <h1 class="text-2xl font-bold mb-4">История операций</h1>
    <ul class="space-y-2">
      <li
        v-for="(item, index) in history"
        :key="index"
        class="p-3 border rounded hover:bg-gray-50"
      >
        <p>{{ item.date }}</p>
        <p class="font-semibold">{{ item.from }} → {{ item.to }}</p>
      </li>
    </ul>
  </div>
</template>
