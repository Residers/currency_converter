<script setup>
defineProps({
  modelValue: String,
  options: Array,
})

const emit = defineEmits(["update:modelValue"])
</script>

<template>
  <select
    :value="modelValue"
    @change="emit('update:modelValue', $event.target.value)"
    class="border p-2 rounded flex-1"
  >
    <option v-for="opt in options" :key="opt" :value="opt">
      {{ opt }}
    </option>
  </select>
</template>
