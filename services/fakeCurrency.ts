import { range } from "lodash-es"

interface FakeCurrencyOptions {
  baseCurrency?: string
  targetCurrency?: string
  days?: number
  volatility?: number // Уровень волатильности (0.1-0.5)
  startRate?: number // Начальный курс
}

export const FakeCurrencyService = {
  generateHistoricalData(options: FakeCurrencyOptions = {}) {
    const {
      baseCurrency = "USD",
      targetCurrency = "EUR",
      days = 30,
      volatility = 0.2,
      startRate = 0.9,
    } = options

    // Генерация дат
    const dates = this.generateDates(days)

    // Генерация случайных курсов
    let currentRate = startRate
    const rates = dates.map(() => {
      const changePercent = (Math.random() * 2 - 1) * volatility
      currentRate = currentRate * (1 + changePercent / 100)
      return parseFloat(currentRate.toFixed(4))
    })

    return {
      data: {
        base: baseCurrency,
        target: targetCurrency,
        dates,
        rates,
        lastUpdated: new Date().toISOString(),
      },
      error: { value: null },
    }
  },

  generateDates(days: number) {
    return range(0, days)
      .map((daysBack) => {
        const date = new Date()
        date.setDate(date.getDate() - daysBack)
        return date.toISOString().split("T")[0]
      })
      .reverse()
  },

  getCurrentRate(targetCurrency: string) {
    // Примерные курсы для основных валют
    const rates: Record<string, number> = {
      EUR: 0.92 + Math.random() * 0.1,
      GBP: 0.79 + Math.random() * 0.05,
      JPY: 145 + Math.random() * 10,
      CAD: 1.35 + Math.random() * 0.1,
    }

    return {
      rate: parseFloat((rates[targetCurrency] || 1).toFixed(4)),
      lastUpdated: new Date().toISOString(),
    }
  },
}
