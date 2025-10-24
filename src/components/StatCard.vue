<template>
  <div
    class="bg-white rounded-2xl p-6 shadow-sm border border-blue-100 hover:shadow-md transition"
  >
    <div class="flex items-center justify-between">
      <div>
        <p class="text-gray-600 text-sm font-medium">{{ title }}</p>
        <p class="text-3xl font-bold text-gray-900 mt-2">{{ value }}</p>
      </div>

      <div
        class="p-3 rounded-lg"
        :class="colorClasses[color]"
      >
        <component :is="icon" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Component } from "vue"

interface StatCardProps {
  title: string
  value: number
  icon: Component
  color: "blue" | "green" | "amber"
}

const { title, value, icon, color } = defineProps<StatCardProps>()

const colorClasses = {
  blue: "bg-blue-50 text-blue-600",
  green: "bg-green-50 text-green-600",
  amber: "bg-amber-50 text-amber-600",
}
</script>

