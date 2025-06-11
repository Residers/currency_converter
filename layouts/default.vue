<script setup>
// Можно добавить логику хедера (например, активная ссылка)
const navItems = [
  { name: "Конвертер", path: "/" },
  { name: "История", path: "/history" },
]
</script>

<template>
  <div class="min-h-screen flex flex-col">
    <div class="bg-blue-600 h-12"></div>
    <!-- Хедер -->
    <header class="bg-blue-600 text-white shadow">
      <div class="container mx-auto p-4">
        <nav class="flex gap-4">
          <NuxtLink
            v-for="item in navItems"
            :key="item.path"
            :to="item.path"
            class="px-3 py-2 rounded hover:bg-blue-500 transition"
            active-class="bg-blue-700"
          >
            {{ item.name }}
          </NuxtLink>
        </nav>
      </div>
    </header>

    <!-- Контент страницы -->
    <main class="flex-grow container mx-auto p-4">
      <slot />
      <!-- Сюда подставляются страницы -->
    </main>
  </div>
</template>
