import currencyService from "~/services/currency"

// Глобальное состояние курсов (кешируется между страницами)
const rates = reactive<Record<string, number>>({})
const lastUpdated = ref<string>("")
const fromCurrency = ref("USD")
const toCurrency = ref<string>("EUR")
const historicalRates = ref<number[]>([])
const historicalDates = ref<string[]>([])
const isLoading = ref(false)
const currencyList = ref<string[]>([])

export const useCurrency = () => {
  // История операций
  const history = useState<IHistory[]>("conversion-history", () => [])
  interface IHistory {
    date: string
    from: string
    to: string
    amount: number
    result: number
  }
  /*************  ✨ Windsurf Command ⭐  *************/
  /**
 * Converts an amount from one currency to another using the current exchange rates.
 * 

 * @param amount - The amount of currency to convert.
 * @param from - The currency code to convert from.
 * @param to - The currency code to convert to.
 * 
 * @returns The converted amount or undefined if the conversion could not be performed.
 */
  async function fetchHistoricalData(days = 7): Promise<void> {
    try {
      isLoading.value = true

      const data = await currencyService.fetchHistoricalData({
        toCurrency: toCurrency.value,
        fromCurrency: fromCurrency.value,
        days,
      })

      if (data?.rates) {
        historicalDates.value = data.dates
        historicalRates.value = data.rates
      }
    } catch (err) {
      console.error(err)
    } finally {
      isLoading.value = false
    }
  }

  const fetchRates = async () => {
    if (isLoading.value) return
    try {
      isLoading.value = true
      const data = await currencyService.fetchRates(fromCurrency.value)
      if (data) {
        currencyList.value = Object.keys(data.rates)

        rates.value = data.rates
        lastUpdated.value = formatTime(new Date().toUTCString())
      }
    } catch (error) {
      console.error("Ошибка загрузки курсов:", error)
    } finally {
      setTimeout(() => (isLoading.value = false), 5000) // Не чаще чем раз в 5 сек
    }
  }

  // Конвертация + добавление в историю
  const convert = (amount: number, from: string, to: string) => {
    if (!rates.value[from] || !rates.value[to]) return null
    const result = (amount * rates.value[to]) / rates.value[from]

    history.value.unshift({
      date: new Date().toLocaleString(),
      from: `${amount} ${from}`,
      to: `${result.toFixed(2)} ${to}`,
      amount,
      result,
    })

    return result
  }
  // Автоматически загружаем данные при изменении валют
  watch(
    [fromCurrency, toCurrency],
    ([newFrom, newTo]) => {
      fetchRates()
      fetchHistoricalData()
    },
    { immediate: true }
  )
  return {
    rates,
    fetchRates,
    convert,
    history,
    currencyList,
    lastUpdated,
    isLoading,
    fetchHistoricalData,
    fromCurrency,
    toCurrency,
    historicalDates,
    historicalRates,
  }
}
