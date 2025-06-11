import type { CurrencyRates } from "../types/currency"

async function fetchRates() {
  const { data, error } = await useFetch<CurrencyRates>(
    "https://api.exchangerate-api.com/v4/latest/USD",
    {
      timeout: 5000,
      retry: 2,
    }
  )

  if (error.value) {
    throw createError({
      statusCode: 500,
      message: "Failed to fetch currency rates",
    })
  }

  return data.value!
}

export default {
  fetchRates,
}
