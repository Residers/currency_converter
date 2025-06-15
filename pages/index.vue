<template>
  <div class="max-w-md mx-auto p-4">
    <h1 class="text-2xl font-bold mb-4">Конвертер валют</h1>
    <input
      v-model.number="amount"
      type="number"
      class="border p-2 rounded w-full mb-2"
    />
    <div class="flex gap-2 mb-4">
      <UiAppSelect v-model="fromCurrency" :options="currencyList" searchable />
      <UiAppSelect v-model="toCurrency" :options="currencyList" searchable />
    </div>
    <UiAppButton @click="evaluate"> Рассчитать </UiAppButton>
    <div v-if="result" class="mt-4 p-4 bg-gray-100 rounded">
      {{ amount }} {{ fromCurrency }} = {{ result }} {{ toCurrency }}
    </div>
    <CurrencyChart />
  </div>
</template>
<script setup>
const amount = ref(1)

const result = ref(0)
const evaluate = () => {
  result.value = convert(amount.value, fromCurrency.value, toCurrency.value)
}
// Используем composable для данных
const { convert, currencyList, fromCurrency, toCurrency, fetchHistoricalData } =
  useCurrency()
// Загружаем данные при изменении валют
watch(
  [() => fromCurrency.value, () => toCurrency.value],
  () => {
    fetchHistoricalData()
  },
  { immediate: true }
)
</script>
