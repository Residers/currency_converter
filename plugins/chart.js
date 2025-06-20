import { defineNuxtPlugin } from "#app"
import { Chart, registerables } from "chart.js"

export default defineNuxtPlugin(() => {
  Chart.register(...registerables)
})
