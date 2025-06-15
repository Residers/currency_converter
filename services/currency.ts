import type { CurrencyRates } from "../types/currency"
import { FakeCurrencyService } from "../services/fakeCurrency"
async function fetchRates(fromCurrency: string = "USD") {
  const payload = await useFetch<CurrencyRates>(
    "https://api.exchangerate-api.com/v4/latest/USD",
    {
      timeout: 5000,
      retry: 2,
      // headers: { apikey: config.public.currencyApiKey },
      params: { base: fromCurrency },
    }
  )
  if (payload) {
    const { data, error } = payload
    if (error.value) {
      throw createError({
        statusCode: 500,
        message: "Failed to fetch currency rates",
      })
    }

    return data.value!
  }
  return null
}
export interface IParameters {
  fromCurrency?: string
  days?: number
  toCurrency?: string
}
async function fetchHistoricalData(params: IParameters) {
  // const config = useRuntimeConfig()
  // const endDate = new Date().toISOString().split("T")[0]
  // const startDate = new Date(Date.now() - params.days * 24 * 60 * 60 * 1000)
  //   .toISOString()
  //   .split("T")[0]

  // Имитация задержки сети
  await new Promise((resolve) => setTimeout(resolve, 500))

  const payload = FakeCurrencyService.generateHistoricalData({
    baseCurrency: params.fromCurrency,
    targetCurrency: params.toCurrency,
    days: params.days,
  })
  // const payload = await useFetch<HistoricalData>(
  //   `https://openexchangerates.org/api/time-series.json`,
  //   {
  //     params: {
  //       app_id: config.public.openexchangeratesApiKey,
  //       start: startDate,
  //       end: endDate,
  //       base: params.fromCurrency,
  //       symbols: params.toCurrency,
  //       prettyprint: 1,
  //     },
  //   }
  // )
  if (payload) {
    const { data, error } = payload
    if (error.value) {
      throw createError({
        statusCode: 500,
        message: error.value?.message,
      })
    }

    return data
  }
  return null
}

export default {
  fetchRates,
  fetchHistoricalData,
}
