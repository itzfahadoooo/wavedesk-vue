<script setup lang="ts">
import { ref } from "vue"
import Navbar from "../components/Navbar.vue"
import Footer from "../components/Footer.vue"
import Modal from "../components/Modal.vue"
import FormInput from "../components/FormInput.vue"
import TicketCard from "../components/TicketCard.vue"
import { Plus, Trash2 } from "lucide-vue-next"
import { toast } from "../composables/Toast"
import { useTickets, type Ticket } from "../composables/Tickets"

const { tickets, addTicket, updateTicket, deleteTicket } = useTickets()
const { showToast } = toast

// Modal states
const isCreateModalOpen = ref(false)
const isEditModalOpen = ref(false)
const isDeleteModalOpen = ref(false)
const selectedTicket = ref<Ticket | null>(null)

// Form data
const formData = ref({
  title: "",
  description: "",
  status: "open" as Ticket["status"],
  priority: "medium" as Ticket["priority"],
})

const errors = ref<{ title?: string }>({})

// Form validation
const validateForm = () => {
  errors.value = {}
  if (!formData.value.title.trim()) {
    errors.value.title = "Title is required"
  }
  return Object.keys(errors.value).length === 0
}

const resetForm = () => {
  formData.value = {
    title: "",
    description: "",
    status: "open",
    priority: "medium",
  }
  errors.value = {}
}

// Create
const handleCreateTicket = () => {
  if (!validateForm()) return
  addTicket({ ...formData.value })
  showToast("Ticket created successfully!", "success")
  resetForm()
  isCreateModalOpen.value = false
}

// Edit
const openEditModal = (ticket: Ticket) => {
  selectedTicket.value = ticket
  formData.value = {
    title: ticket.title,
    description: ticket.description,
    status: ticket.status,
    priority: ticket.priority,
  }
  isEditModalOpen.value = true
}

const handleEditTicket = () => {
  if (!selectedTicket.value || !validateForm()) return
  updateTicket(selectedTicket.value.id, { ...formData.value })
  showToast("Ticket updated successfully!", "success")
  resetForm()
  isEditModalOpen.value = false
}

// Delete
const openDeleteModal = (ticket: Ticket) => {
  selectedTicket.value = ticket
  isDeleteModalOpen.value = true
}

const handleDeleteConfirm = () => {
  if (!selectedTicket.value) return
  deleteTicket(selectedTicket.value.id)
  showToast("Ticket deleted successfully!", "success")
  isDeleteModalOpen.value = false
  selectedTicket.value = null
}
</script>

<template>
  <div class="min-h-screen flex flex-col bg-linear-to-b from-white to-blue-50">
    <Navbar />

    <main class="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-12">
      <div class="flex items-center justify-between mb-12">
        <div>
          <h1 class="text-4xl font-bold text-gray-900 mb-2">Tickets</h1>
          <p class="text-gray-600">Manage and track all your support tickets</p>
        </div>
        <button
          @click="() => { resetForm(); isCreateModalOpen = true }"
          class="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
        >
          <Plus class="w-5 h-5" />
          New Ticket
        </button>
      </div>

      <!-- Tickets Grid -->
      <div v-if="tickets.length === 0" class="bg-white rounded-2xl p-12 text-center border border-blue-100">
        <p class="text-gray-600 mb-4">No tickets yet. Create one to get started!</p>
        <button
          @click="() => { resetForm(); isCreateModalOpen = true }"
          class="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
        >
          Create First Ticket
        </button>
      </div>

      <div v-else class="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        <TicketCard
          v-for="ticket in tickets"
          :key="ticket.id"
          :ticket="ticket"
          @edit="openEditModal"
          @delete="openDeleteModal"
        />
      </div>
    </main>

    <!-- Modals -->
    <Modal :is-open="isCreateModalOpen" title="Create Ticket" size="md" @close="isCreateModalOpen = false">
      <div class="space-y-4">
        <FormInput label="Title" v-model="formData.title" :error="errors.title" placeholder="Brief description" required />
        <textarea v-model="formData.description" placeholder="Description (optional)" class="w-full px-4 py-2 border rounded-lg" rows="4" />
        <div class="grid grid-cols-2 gap-4">
          <div>
            <label>Status</label>
            <select v-model="formData.status" class="w-full px-4 py-2 border rounded-lg">
              <option value="open">Open</option>
              <option value="in_progress">In Progress</option>
              <option value="closed">Closed</option>
            </select>
          </div>
          <div>
            <label>Priority</label>
            <select v-model="formData.priority" class="w-full px-4 py-2 border rounded-lg">
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
          </div>
        </div>
        <div class="flex gap-3 pt-4">
          <button @click="handleCreateTicket" class="flex-1 py-2 bg-blue-600 text-white rounded-lg">Create Ticket</button>
          <button @click="isCreateModalOpen = false" class="flex-1 py-2 bg-gray-200 text-gray-900 rounded-lg">Cancel</button>
        </div>
      </div>
    </Modal>

    <Modal :is-open="isEditModalOpen" title="Edit Ticket" size="md" @close="isEditModalOpen = false">
      <div class="space-y-4">
        <FormInput label="Title" v-model="formData.title" :error="errors.title" placeholder="Brief description" required />
        <textarea v-model="formData.description" placeholder="Description (optional)" class="w-full px-4 py-2 border rounded-lg" rows="4" />
        <div class="grid grid-cols-2 gap-4">
          <div>
            <label>Status</label>
            <select v-model="formData.status" class="w-full px-4 py-2 border rounded-lg">
              <option value="open">Open</option>
              <option value="in_progress">In Progress</option>
              <option value="closed">Closed</option>
            </select>
          </div>
          <div>
            <label>Priority</label>
            <select v-model="formData.priority" class="w-full px-4 py-2 border rounded-lg">
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
          </div>
        </div>
        <div class="flex gap-3 pt-4">
          <button @click="handleEditTicket" class="flex-1 py-2 bg-blue-600 text-white rounded-lg">Save Changes</button>
          <button @click="isEditModalOpen = false" class="flex-1 py-2 bg-gray-200 text-gray-900 rounded-lg">Cancel</button>
        </div>
      </div>
    </Modal>

    <Modal :is-open="isDeleteModalOpen" title="Delete Ticket" size="sm" @close="isDeleteModalOpen = false">
      <div class="space-y-4">
        <p>Are you sure you want to delete this ticket? This action cannot be undone.</p>
        <div class="bg-red-50 border border-red-200 rounded-lg p-4">
          <p class="text-sm text-red-800"><strong>Ticket:</strong> {{ selectedTicket?.title }}</p>
        </div>
        <div class="flex gap-3 pt-4">
          <button @click="handleDeleteConfirm" class="flex-1 py-2 bg-red-600 text-white rounded-lg flex items-center justify-center gap-2">
            <Trash2 class="w-4 h-4" /> Delete
          </button>
          <button @click="isDeleteModalOpen = false" class="flex-1 py-2 bg-gray-200 text-gray-900 rounded-lg">Cancel</button>
        </div>
      </div>
    </Modal>

    <Footer />
  </div>
</template>
