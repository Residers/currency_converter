<script setup lang="ts">
import { Line } from "vue-chartjs"
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  LineElement,
  LinearScale,
  PointElement,
  CategoryScale,
  TimeScale,
} from "chart.js"

ChartJS.register(
  Title,
  Tooltip,
  Legend,
  LineElement,
  LinearScale,
  PointElement,
  CategoryScale,
  TimeScale
)

const {
  fromCurrency,
  toCurrency,
  historicalDates,
  historicalRates,
  isLoading,
} = useCurrency()

const chartData = computed(() => ({
  labels: historicalDates.value,
  datasets: [
    {
      label: `${fromCurrency.value} → ${toCurrency.value}`,
      data: historicalRates.value,
      borderColor: "#3b82f6",
      backgroundColor: "rgba(59, 130, 246, 0.1)",
      tension: 0.4,
      fill: true,
    },
  ],
}))

const chartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      position: "top" as const,
    },
  },
  scales: {
    x: {
      grid: {
        display: false,
      },
    },
    y: {
      grid: {
        color: "#e5e7eb",
      },
    },
  },
}
</script>

<template>
  <div class="mt-8 bg-white p-4 rounded-lg shadow">
    <h2 class="text-xl font-semibold mb-4">
      Динамика курса: {{ fromCurrency }} → {{ toCurrency }}
    </h2>
    <div
      v-if="isLoading"
      class="absolute inset-0 flex items-center justify-center bg-white/50 z-10"
    >
      <Icon name="eos-icons:loading" size="32" class="text-blue-500" />
    </div>
    <div v-else class="h-64">
      <Line :data="chartData" :options="chartOptions" />
    </div>
  </div>
</template>
