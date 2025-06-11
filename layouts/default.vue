<template>
  <div class="min-h-screen flex flex-col">
    <!-- Хедер -->

    <LayoutAppHeader />
    <!-- Контент страницы -->
    <main class="flex-grow container mx-auto p-4">
      <slot />
      <!-- Сюда подставляются страницы -->
    </main>
  </div>
</template>
