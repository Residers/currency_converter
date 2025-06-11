// export default defineNuxtPlugin(() => {
//   const { $fetch } = useNuxtApp()

//   // Request interceptor
//   $fetch.interceptors.request.use((config) => {
//     config.headers = config.headers || {}
//     config.headers["X-Requested-With"] = "XMLHttpRequest"
//     return config
//   })

//   // Response interceptor
//   $fetch.interceptors.response.use(
//     (response) => response,
//     (error) => {
//       if (error.response?.status === 401) {
//         navigateTo("/login")
//       }
//       return Promise.reject(error)
//     }
//   )
// })
