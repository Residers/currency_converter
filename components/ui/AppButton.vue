<script setup lang="ts">
defineProps<IAppButtonProps>()
export interface IAppButtonProps {
  type?: string
  disabled?: boolean
}
</script>

<template>
  <button
    :type="type"
    :disabled="disabled"
    class="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:opacity-50"
  >
    <slot />
    <!-- Контент кнопки -->
  </button>
</template>
