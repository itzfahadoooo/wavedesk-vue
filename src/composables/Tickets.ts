import { ref, watch, type Ref } from "vue"
import { auth } from "./Auth"

export type TicketStatus = "open" | "in_progress" | "closed"
export type TicketPriority = "low" | "medium" | "high"

export interface Ticket {
  id: string
  title: string
  description: string
  status: TicketStatus
  priority: TicketPriority
  createdAt: string
  updatedAt: string
}

export interface TicketContextType {
  tickets: Ref<Ticket[]>
  addTicket: (ticket: Omit<Ticket, "id" | "createdAt" | "updatedAt">) => void
  updateTicket: (id: string, ticket: Partial<Ticket>) => void
  deleteTicket: (id: string) => void
  getStats: () => { total: number; open: number; closed: number }
}

// Reactive tickets array
const tickets = ref<Ticket[]>([])

// Load tickets from localStorage when user changes
watch(
  () => auth.user,
  (user) => {
    if (!user) {
      tickets.value = []
      return
    }

    const stored = localStorage.getItem(`ticketapp_tickets_${user.id}`)
    if (stored) {
      try {
        tickets.value = JSON.parse(stored)
      } catch {
        tickets.value = []
      }
    } else {
      tickets.value = []
    }
  },
  { immediate: true }
)

// Save tickets to localStorage whenever they change
watch(
  [tickets, () => auth.user],
  ([tks, user]) => {
    if (!user) return
    localStorage.setItem(`ticketapp_tickets_${user.id}`, JSON.stringify(tks))
  },
  { deep: true }
)

const addTicket = (ticket: Omit<Ticket, "id" | "createdAt" | "updatedAt">) => {
  const newTicket: Ticket = {
    ...ticket,
    id: Date.now().toString(),
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  }
  tickets.value = [newTicket, ...tickets.value]
}

const updateTicket = (id: string, updates: Partial<Ticket>) => {
  tickets.value = tickets.value.map((t) =>
    t.id === id ? { ...t, ...updates, updatedAt: new Date().toISOString() } : t
  )
}

const deleteTicket = (id: string) => {
  tickets.value = tickets.value.filter((t) => t.id !== id)
}

const getStats = () => ({
  total: tickets.value.length,
  open: tickets.value.filter((t) => t.status === "open").length,
  closed: tickets.value.filter((t) => t.status === "closed").length,
})

// Export a composable to use tickets anywhere
export function useTickets(): TicketContextType {
  return {
    tickets,
    addTicket,
    updateTicket,
    deleteTicket,
    getStats,
  }
}
