export interface CurrencyRates {
  rates: Record<string, number>
  base: string
  timestamp: number
}
export interface CurrencyData {
  rates: Record<string, number>
  base: string
  timestamp: number
}

export interface HistoricalData {
  rates: Record<string, Record<string, number>>
  start_date: string
  end_date: string
  base: string
}
