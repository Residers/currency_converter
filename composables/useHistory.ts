import { ref } from "vue"

export function useHistory() {
  const history = ref<IHistoryEntry[]>([])

  const addToHistory = (entry: any) => {
    history.value.unshift({ ...entry, date: new Date().toLocaleString() })
  }

  return { history, addToHistory }
}

export interface IHistoryEntry {
  date: string
  from: string
  to: string
  amount: number
  result: number
}
