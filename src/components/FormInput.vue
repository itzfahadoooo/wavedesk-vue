<template>
  <div class="mb-4">
    <label class="block text-sm font-medium text-gray-700 mb-2">
      {{ label }}
      <span v-if="required" class="text-red-500">*</span>
    </label>

    <input
      :type="type"
      :value="modelValue"
      @input="$emit('update:modelValue', ($event.target as HTMLInputElement).value)"
      :placeholder="placeholder"
      :aria-invalid="!!error"
      class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
      :class="error ? 'border-red-500' : 'border-gray-300'"
    />

    <p v-if="error" class="text-red-500 text-sm mt-1">{{ error }}</p>
  </div>
</template>

<script setup lang="ts">
interface Props {
  label: string
  type?: string
  modelValue: string
  error?: string
  placeholder?: string
  required?: boolean
}

withDefaults(defineProps<Props>(), {
  type: "text",
})

defineEmits<{
  (e: "update:modelValue", value: string): void
}>()
</script>
