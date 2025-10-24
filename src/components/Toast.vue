<template>
  <div class="fixed bottom-4 right-4 z-50 space-y-2">
    <div
      v-for="toast in toasts"
      :key="toast.id"
      class="flex items-center gap-3 px-4 py-3 rounded-lg shadow-lg text-white animate-in fade-in slide-in-from-bottom-4 duration-300"
      :class="{
        'bg-green-500': toast.type === 'success',
        'bg-red-500': toast.type === 'error',
        'bg-blue-500': toast.type === 'info',
      }"
      role="alert"
    >
      <CheckCircle v-if="toast.type === 'success'" class="w-5 h-5" />
      <AlertCircle v-if="toast.type === 'error'" class="w-5 h-5" />
      <Info v-if="toast.type === 'info'" class="w-5 h-5" />

      <span class="flex-1">{{ toast.message }}</span>

      <button
        @click="removeToast(toast.id)"
        class="hover:opacity-80 transition"
        aria-label="Close notification"
      >
        <X class="w-4 h-4" />
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { toast } from '../composables/Toast'
import { X, CheckCircle, AlertCircle, Info } from "lucide-vue-next"

const { toasts, removeToast } = toast
</script>

