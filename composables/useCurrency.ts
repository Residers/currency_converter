import currencyService from "~/services/currency"
const currencyList = ref<string[]>([])
const rates = reactive<Record<string, number>>({})
const fromCurrency = ref("USD")
const toCurrency = ref<string>("EUR")
const historicalRates = ref<number[]>([])
const historicalDates = ref<string[]>([])
export const useCurrency = () => {
  // Глобальное состояние курсов (кешируется между страницами)

  // const rates = useState<Record<string, number>>("rates", () => ({}))
  const lastUpdated = useState<string>("lastUpdated", () => "")
  const isUpdating = ref(false)
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
  async function fetchHistoricalData() {
    try {
      //TODO add access key
      const { data } = await useFetch(
        `https://api.exchangerate.host/timeseries?base=${
          fromCurrency.value
        }&symbols=${toCurrency.value}&start_date=${getPastDate(
          7
        )}&end_date=${getCurrentDate()}`
      )

      historicalDates.value = Object.keys(data.value?.rates || {})
      historicalRates.value = historicalDates.value.map(
        (date) => data.value?.rates[date][toCurrency.value]
      )
    } catch (error) {
      console.error("Error fetching historical data:", error)
    }
  }
  function getPastDate(days: number) {
    const date = new Date()
    date.setDate(date.getDate() - days)
    return date.toISOString().split("T")[0]
  }
  function getCurrentDate() {
    return new Date().toISOString().split("T")[0]
  }
  const fetchRates = async () => {
    if (isUpdating.value) return
    try {
      isUpdating.value = true
      const data = await currencyService.fetchRates()
      if (data) {
        currencyList.value = Object.keys(data.rates)
        console.log(
          "🚀 ~ fetchRates ~ currencyList.value :",
          currencyList.value
        )
        console.log("🚀 ~ fetchRates ~ data.rates:", data.rates)
        rates.value = data.rates
        lastUpdated.value = formatTime(new Date().toUTCString())
      }
    } catch (error) {
      console.error("Ошибка загрузки курсов:", error)
    } finally {
      setTimeout(() => (isUpdating.value = false), 5000) // Не чаще чем раз в 5 сек
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

  return {
    rates,
    fetchRates,
    convert,
    history,
    currencyList,
    lastUpdated,
    isUpdating,
    fetchHistoricalData,
    fromCurrency,
    toCurrency,
    historicalDates,
    historicalRates,
  }
}
