// composables/toast.ts
import { reactive } from "vue"

export interface Toast {
  id: string
  message: string
  type: "success" | "error" | "info"
}

interface ToastContextType {
  toasts: Toast[]
  showToast: (message: string, type: "success" | "error" | "info") => void
  removeToast: (id: string) => void
}

export const toast = reactive<ToastContextType>({
  toasts: [],
  showToast(message, type) {
    const id = Date.now().toString()
    toast.toasts.push({ id, message, type })
    setTimeout(() => toast.removeToast(id), 3000)
  },
  removeToast(id) {
    const index = toast.toasts.findIndex((t) => t.id === id)
    if (index !== -1) toast.toasts.splice(index, 1)
  },
})
