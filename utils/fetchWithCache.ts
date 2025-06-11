export async function fetchWithCache(url: string, cacheTime = 3600000) {
  const cached = localStorage.getItem(`cache:${url}`)
  const cachedAt = localStorage.getItem(`cache:${url}:time`)

  if (cached && cachedAt && Date.now() - Number(cachedAt) < cacheTime) {
    return JSON.parse(cached)
  }

  const response = await fetch(url)
  const data = await response.json()
  localStorage.setItem(`cache:${url}`, JSON.stringify(data))
  localStorage.setItem(`cache:${url}:time`, Date.now().toString())
  return data
}
