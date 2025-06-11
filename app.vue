<template>
  <div>
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>
<script setup>
const { fetchRates } = useCurrency()
await fetchRates() // Загружаем курсы 1 раз
</script>
