<script setup lang="ts">
import { RecycleScroller } from "vue-virtual-scroller"

const props = defineProps({
  modelValue: String,
  options: {
    type: Array as PropType<string[]>,
    required: true,
    default: () => [],
  },
  placeholder: {
    type: String,
    default: "Select...",
  },
  searchable: {
    type: Boolean,
    default: false,
  },
})

const emit = defineEmits(["update:modelValue"])

const isOpen = ref(false)
const searchQuery = ref("")
const dropdownRef = ref<HTMLElement | null>(null)

// Фильтрация опций
const filteredOptions = computed(() => {
  if (!props.searchable) return props.options
  return props.options.filter((option) =>
    option.toLowerCase().includes(searchQuery.value.toLowerCase())
  )
})

// Закрытие при клике вне компонента
const clickOutside = (e: MouseEvent) => {
  if (dropdownRef.value && !dropdownRef.value.contains(e.target as Node)) {
    isOpen.value = false
  }
}
const onOptionClick = (option: string) => {
  emit("update:modelValue", option)
  isOpen.value = false
}
// Хуки жизненного цикла
onMounted(() => {
  document.addEventListener("click", clickOutside)
})

onBeforeUnmount(() => {
  document.removeEventListener("click", clickOutside)
})
</script>

<template>
  <div ref="dropdownRef" class="relative w-full">
    <!-- Триггер выпадающего списка -->
    <div
      class="flex items-center justify-between p-2 border rounded cursor-pointer hover:border-gray-400 transition-colors"
      @click="isOpen = !isOpen"
    >
      <span class="truncate">{{ modelValue || placeholder }}</span>
      <Icon
        name="heroicons:chevron-up-down"
        class="w-4 h-4 text-gray-500 transition-transform duration-200"
        :class="{ 'rotate-180': isOpen }"
      />
    </div>

    <!-- Выпадающий список -->
    <Transition
      enter-active-class="transition duration-100 ease-out"
      enter-from-class="transform scale-95 opacity-0"
      enter-to-class="transform scale-100 opacity-100"
      leave-active-class="transition duration-75 ease-in"
      leave-from-class="transform scale-100 opacity-100"
      leave-to-class="transform scale-95 opacity-0"
    >
      <div
        v-if="isOpen"
        class="absolute z-10 w-full mt-1 bg-white border rounded-md shadow-lg overflow-hidden"
      >
        <!-- Поле поиска (если включено) -->
        <input
          v-if="searchable"
          v-model="searchQuery"
          type="text"
          placeholder="Search..."
          class="w-full p-2 border-b focus:outline-none focus:ring-1 focus:ring-blue-500"
          @click.stop
        />

        <!-- Виртуальный список -->
        <ClientOnly>
          <RecycleScroller
            :items="filteredOptions"
            :item-size="36"
            key-field=""
            class="max-h-60 overflow-y-auto"
          >
            <template #default="{ item }">
              <div
                class="px-3 py-2 cursor-pointer hover:bg-gray-100 transition-colors"
                :class="{
                  'bg-blue-50 text-blue-600': item === modelValue,
                }"
                @click="onOptionClick(item)"
              >
                {{ item }}
              </div>
            </template>
          </RecycleScroller>
        </ClientOnly>
      </div>
    </Transition>
  </div>
</template>

<style>
/* Импорт стилей vue-virtual-scroller */
@import "vue-virtual-scroller/dist/vue-virtual-scroller.css";

/* Кастомные стили для скроллера */
.vue-recycle-scroller__item-view {
  display: flex;
  align-items: center;
  height: 40px;
}
</style>
