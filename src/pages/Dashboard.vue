<script setup lang="ts">
import { useTickets } from '../composables/Tickets'
import Navbar from '../components/Navbar.vue'
import Footer from '../components/Footer.vue'
import StatCard from '../components/StatCard.vue'
import { BarChart3, CheckCircle, AlertCircle } from 'lucide-vue-next'
import { RouterLink } from 'vue-router'

const { getStats } = useTickets()
const stats = getStats()
</script>

<template>
  <div class="min-h-screen bg-linear-to-b from-white to-blue-50 flex flex-col">
    <Navbar />

    <main class="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-12">
      <div class="mb-12">
        <h1 class="text-4xl font-bold text-gray-900 mb-2">Dashboard</h1>
        <p class="text-gray-600">Welcome back! Here's your ticket overview.</p>
      </div>

      <!-- Stats Grid -->
      <div class="grid md:grid-cols-3 gap-6 mb-12">
        <StatCard title="Total Tickets" :value="stats.total" :icon="BarChart3" color="blue" />
        <StatCard title="Open Tickets" :value="stats.open" :icon="AlertCircle" color="amber" />
        <StatCard
          title="Resolved Tickets"
          :value="stats.closed"
          :icon="CheckCircle"
          color="green"
        />
      </div>

      <!-- Quick Actions -->
      <div class="bg-white rounded-2xl p-8 shadow-sm border border-blue-100 flex flex-col items-center">
        <h2 class="text-xl font-bold text-gray-900 mb-4">Quick Actions</h2>
        <div class="flex flex-col sm:flex-row gap-4">
          <RouterLink
            to="/tickets"
            class="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-medium text-center"
          >
            Manage Tickets
          </RouterLink>
          <RouterLink
            to="/tickets"
            class="px-6 py-3 bg-white text-blue-600 border-2 border-blue-600 rounded-lg hover:bg-blue-50 transition font-medium text-center"
          >
            View All Tickets
          </RouterLink>
        </div>
      </div>
    </main>

    <Footer />
  </div>
</template>