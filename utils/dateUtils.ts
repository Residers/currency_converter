export const formatTime = (date: string) => {
  return new Intl.DateTimeFormat("default", {
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date(date))
}
