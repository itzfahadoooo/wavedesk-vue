<template>
  <div
    v-if="isOpen"
    class="fixed inset-0 z-40 flex items-center justify-center p-2 sm:p-4 md:mt-16"
  >
    <!-- Backdrop -->
    <div
      class="absolute inset-0 bg-black/50 backdrop-blur-sm"
      @click="onClose"
      aria-hidden="true"
    ></div>

    <!-- Modal -->
    <div
      :class="[
        'relative bg-white rounded-2xl shadow-2xl w-full mx-auto animate-in fade-in zoom-in-95 duration-300 max-h-[90vh] overflow-y-auto',
        sizeClasses[size],
      ]"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      <!-- Header -->
      <div class="flex items-center justify-between p-4 sm:p-6 border-b border-blue-100">
        <h2 id="modal-title" class="text-lg sm:text-xl font-bold text-gray-900">
          {{ title }}
        </h2>
        <button
          @click="onClose"
          class="p-1 hover:bg-gray-100 rounded-lg transition"
          aria-label="Close modal"
        >
          <X class="w-5 h-5 text-gray-500" />
        </button>
      </div>

      <!-- Content -->
      <div class="p-4 sm:p-6">
        <slot />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { X } from "lucide-vue-next"

interface Props {
  isOpen: boolean
  onClose: () => void
  title: string
  size?: "sm" | "md" | "lg"
}

withDefaults(defineProps<Props>(), {
  size: "md",
})

const sizeClasses = {
  sm: "max-w-sm",
  md: "max-w-md",
  lg: "max-w-lg",
}
</script>
