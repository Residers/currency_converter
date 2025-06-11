export const useCurrency = () => {
  // Глобальное состояние курсов (кешируется между страницами)
  const rates = useState<Record<string, number>>("rates", () => ({}))
  const currencyList = ref<string[]>([])
  const lastUpdated = useState<string>("lastUpdated", () => "")
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

  const fetchRates = async () => {
    console.log("🚀 ~ fetchRates ~ rates.value:", rates.value)
    if (Object.keys(rates.value).length > 0) return // Не грузим повторно

    const { data } = await useFetch(
      "https://api.exchangerate-api.com/v4/latest/USD"
    )
    if (data.value) {
      currencyList.value = Object.keys(data.value.rates)
      rates.value = data.value.rates
    }
  }

  // Конвертация + добавление в историю
  const convert = (amount: number, from: string, to: string) => {
    console.log("🚀 ~ convert ~ convert:", rates.value[from], rates.value[to])
    if (!rates.value[from] || !rates.value[to]) return null
    const result = (amount * rates.value[to]) / rates.value[from]
    console.log("🚀 ~ convert ~ result:", result)

    history.value.unshift({
      date: new Date().toLocaleString(),
      from: `${amount} ${from}`,
      to: `${result.toFixed(2)} ${to}`,
      amount,
      result,
    })

    return result
  }

  return { rates, fetchRates, convert, history, currencyList }
}
