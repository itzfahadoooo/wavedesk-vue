<template>
  <div
    class="bg-white rounded-2xl p-6 shadow-sm border border-blue-100 hover:shadow-md transition"
  >
    <!-- Header -->
    <div class="flex items-start justify-between mb-4">
      <div class="flex-1">
        <h3 class="text-lg font-bold text-gray-900">{{ ticket.title }}</h3>
        <p class="text-gray-600 text-sm mt-1">{{ ticket.description }}</p>
      </div>

      <div class="flex gap-2 ml-4">
        <button
          @click="emit('edit', ticket)"
          class="p-2 hover:bg-blue-50 rounded-lg transition text-blue-600 cursor-pointer"
          aria-label="Edit ticket"
        >
          <Edit2 class="w-4 h-4" />
        </button>

        <button
          @click="emit('delete', ticket)"
          class="p-2 hover:bg-red-50 rounded-lg transition text-red-600 cursor-pointer"
          aria-label="Delete ticket"
        >
          <Trash2 class="w-4 h-4" />
        </button>
      </div>
    </div>

    <!-- Footer -->
    <div class="flex items-center justify-between">
      <div class="flex gap-2">
        <span
          class="px-3 py-1 rounded-full text-xs font-medium"
          :class="statusColors[ticket.status]"
        >
          {{ ticket.status.replace("_", " ") }}
        </span>

        <span
          class="px-3 py-1 rounded-full text-xs font-medium capitalize"
          :class="priorityColors[ticket.priority]"
        >
          {{ ticket.priority }}
        </span>
      </div>

      <p class="text-xs text-gray-500">
        {{ new Date(ticket.createdAt).toLocaleDateString() }}
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Edit2, Trash2 } from "lucide-vue-next";

interface Ticket {
  id: string;
  title: string;
  description: string;
  status: "open" | "in_progress" | "closed";
  priority: "low" | "medium" | "high";
  createdAt: string;
  updatedAt: string;
}

interface Props {
  ticket: Ticket;
}

const { ticket } = defineProps<Props>();
const emit = defineEmits(["edit", "delete"]);

const statusColors: Record<Ticket["status"], string> = {
  open: "bg-green-200 text-green-800",
  in_progress: "bg-amber-200 text-amber-800",
  closed: "bg-gray-200 text-gray-800",
};

const priorityColors: Record<Ticket["priority"], string> = {
  low: "text-blue-600",
  medium: "text-amber-600",
  high: "text-red-600",
};
</script>
