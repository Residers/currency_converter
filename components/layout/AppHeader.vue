<script setup lang="ts">
const { rates, lastUpdated, fetchRates, isLoading } = useCurrency()
const clientTime = ref("")

onMounted(async () => {
  if (rates.value && Object.keys(rates.value).length === 0) {
    await fetchRates()
  }

  clientTime.value = lastUpdated.value
})
// Три основных курса для отображения
const displayRates = computed(() => ({
  EUR: rates.value?.EUR
    ? ((1 / rates.value.EUR) * rates.value.RUB).toFixed(2)
    : "...",
  USD: rates.value?.USD
    ? ((1 / rates.value.USD) * rates.value.RUB).toFixed(2)
    : "...",

  CNY: rates.value?.CNY
    ? ((1 / rates.value.CNY) * rates.value.RUB).toFixed(2)
    : "...",
}))
const navItems = [
  { name: "Конвертер", path: "/" },
  { name: "История", path: "/history" },
]
</script>

<template>
  <header class="bg-blue-600 text-white shadow">
    <div class="container mx-auto p-4 flex justify-between items-center">
      <nav class="flex gap-4">
        <NuxtLink
          v-for="item in navItems"
          :key="item.path"
          :to="item.path"
          class="px-3 py-2 rounded hover:bg-blue-500 transition"
          active-class="bg-blue-700"
        >
          {{ item.name }}
        </NuxtLink>
      </nav>
      <div class="flex items-center gap-6">
        <div class="flex gap-4 text-sm">
          <div v-for="(rate, ind) in displayRates" :key="ind">
            1 {{ ind }} = {{ rate }} RUB
          </div>
        </div>

        <button
          @click="fetchRates"
          class="flex items-center gap-1 px-2 py-1 bg-blue-700 rounded hover:bg-blue-800 text-xs"
        >
          <Icon
            name="mdi:refresh"
            class="w-4 h-4"
            :class="{ 'animate-spin': isLoading }"
          />
          <span v-if="clientTime">{{ clientTime }}</span>
        </button>
      </div>
    </div>
  </header>
</template>
