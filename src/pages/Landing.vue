<script setup lang="ts">
import Navbar from "../components/Navbar.vue"
import Footer from "../components/Footer.vue"
import { RouterLink } from "vue-router"
import { Zap, Shield, Users } from "lucide-vue-next"

const features = [
  {
    icon: Zap,
    title: "Lightning Fast",
    description: "Create and manage tickets instantly with our intuitive interface",
  },
  {
    icon: Shield,
    title: "Secure & Reliable",
    description: "Enterprise-grade security to keep your data safe and protected",
  },
  {
    icon: Users,
    title: "Team Collaboration",
    description: "Work together seamlessly with real-time updates and notifications",
  },
]

const stats = [
  { value: "10K+", label: "Active Users" },
  { value: "99.9%", label: "Uptime" },
  { value: "24/7", label: "Support" },
]
</script>

<template>
  <div class="min-h-screen">
    <Navbar />

    <!-- Hero Section -->
    <section class="relative overflow-hidden pt-20 pb-40 px-4 sm:px-6 lg:px-8">
      <svg
        class="absolute inset-0 w-full h-full -z-10"
        viewBox="0 0 1440 800"
        preserveAspectRatio="none"
      >
        <defs>
          <linearGradient id="waveGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stop-color="#dbeafe" stop-opacity="1" />
            <stop offset="100%" stop-color="#9fc8ff" stop-opacity="1" />
          </linearGradient>
        </defs>
        <path
          d="M0,200 Q360,100 720,200 T1440,200 L1440,0 L0,0 Z"
          fill="url(#waveGradient)"
        />
      </svg>

      <div class="absolute bottom-30 right-10 w-72 h-72 bg-blue-400 opacity-20 rounded-full -z-10" />
      <div class="absolute top-60 left-20 w-96 h-96 bg-black rounded-full opacity-15 -z-10" />

      <div class="max-w-7xl mx-auto">
        <div class="text-center mb-16">
          <h1 class="text-5xl md:text-7xl font-bold text-gray-900 mb-6 leading-tight text-balance">
            Manage Tickets with <span class="text-blue-600">Confidence</span>
          </h1>

          <p class="text-xl text-gray-600 mb-12 max-w-2xl mx-auto leading-relaxed text-balance">
            A modern ticket management system designed for teams that want to
            organize, track, and resolve issues efficiently without the
            complexity.
          </p>

          <div class="flex flex-col sm:flex-row gap-4 justify-center mb-16">
            <RouterLink
              to="/auth/signup"
              class="px-8 py-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-semibold text-lg shadow-lg hover:shadow-xl"
            >
              Get Started Free
            </RouterLink>
            <RouterLink
              to="/auth/login"
              class="px-8 py-4 bg-white text-blue-600 border-2 border-blue-600 rounded-lg hover:bg-blue-50 transition font-semibold text-lg"
            >
              Sign In
            </RouterLink>
          </div>

          <div class="grid grid-cols-3 gap-4 max-w-2xl mx-auto">
            <div
              v-for="(stat, index) in stats"
              :key="index"
              class="text-center"
            >
              <p class="text-4xl font-bold text-gray-900">{{ stat.value }}</p>
              <p class="text-sm text-gray-600 mt-1">{{ stat.label }}</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Features Section -->
    <section class="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
      <div class="max-w-7xl mx-auto">
        <div class="text-center mb-16">
          <h2 class="text-4xl font-bold text-gray-900 mb-4">
            Why Choose TicketHub?
          </h2>
          <p class="text-lg text-gray-600 max-w-2xl mx-auto">
            Everything you need to manage tickets effectively in one beautiful
            platform
          </p>
        </div>

        <div class="grid md:grid-cols-3 gap-8">
          <div
            v-for="(feature, index) in features"
            :key="index"
            class="bg-white rounded-2xl p-8 shadow-md hover:shadow-2xl border border-gray-100 hover:border-blue-200 transition-all duration-300 transform hover:-translate-y-1"
          >
            <div class="mb-4 inline-block p-3 bg-blue-100 rounded-lg">
              <component :is="feature.icon" class="w-6 h-6 text-blue-600" />
            </div>
            <h3 class="text-xl font-bold text-gray-900 mb-3">
              {{ feature.title }}
            </h3>
            <p class="text-gray-600 leading-relaxed">
              {{ feature.description }}
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- CTA Section -->
    <section class="py-20 px-4 sm:px-6 lg:px-8 bg-linear-to-r from-blue-400 to-blue-700">
      <div class="max-w-7xl mx-auto">
        <div class="rounded-3xl p-12 shadow-2xl border-t border-white border-opacity-10 text-center">
          <h2 class="text-4xl font-bold text-white mb-6">
            Ready to Get Started?
          </h2>
          <p class="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Join thousands of teams already using TicketHub to manage their
            tickets efficiently.
          </p>
          <RouterLink
            to="/auth/signup"
            class="inline-block px-8 py-4 bg-white text-blue-600 rounded-lg hover:bg-gray-100 transition font-semibold text-lg shadow-lg hover:shadow-xl"
          >
            Start Your Free Trial
          </RouterLink>
        </div>
      </div>
    </section>

    <Footer/>
  </div>
</template>
