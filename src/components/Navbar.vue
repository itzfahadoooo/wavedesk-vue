<template>
  <nav class="bg-white border-b border-gray-200 sticky top-0 z-50 shadow-sm">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex justify-between items-center h-16">
        <!-- Logo -->
        <RouterLink
          to="/"
          class="flex items-center gap-2 font-bold text-xl sm:text-2xl text-blue-600"
        >
          <Waves class="w-6 h-6 sm:w-8 sm:h-8" />
          WaveDesk
        </RouterLink>

        <!-- Desktop Navigation -->
        <div class="hidden md:flex items-center gap-6">
          <template v-if="isAuthenticated">
            <RouterLink
              to="/dashboard"
              class="text-gray-600 hover:text-blue-600 transition font-medium"
            >
              Dashboard
            </RouterLink>
            <RouterLink
              to="/tickets"
              class="text-gray-600 hover:text-blue-600 transition font-medium"
            >
              Tickets
            </RouterLink>
            <button
              @click="handleLogout"
              class="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-medium cursor-pointer"
            >
              <LogOut class="w-4 h-4" />
              Logout
            </button>
          </template>

          <template v-else>
            <RouterLink
              to="/auth/login"
              class="text-gray-600 hover:text-blue-600 transition font-medium"
            >
              Login
            </RouterLink>
            <RouterLink
              to="/auth/signup"
              class="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-medium"
            >
              Sign Up
            </RouterLink>
          </template>
        </div>

        <!-- Mobile Menu Button -->
        <button
          @click="isMenuOpen = !isMenuOpen"
          class="md:hidden p-2 text-gray-600 hover:text-blue-600 transition"
          aria-label="Toggle menu"
        >
          <component :is="isMenuOpen ? X : Menu" class="w-6 h-6" />
        </button>
      </div>

      <!-- Mobile Navigation -->
      <transition name="fade">
        <div v-if="isMenuOpen" class="md:hidden py-4 border-t border-gray-200">
          <template v-if="isAuthenticated">
            <div class="flex flex-col gap-3">
              <RouterLink
                to="/dashboard"
                @click="closeMenu"
                class="text-gray-600 hover:text-blue-600 transition font-medium py-2 px-4 rounded-lg hover:bg-gray-50"
              >
                Dashboard
              </RouterLink>
              <RouterLink
                to="/tickets"
                @click="closeMenu"
                class="text-gray-600 hover:text-blue-600 transition font-medium py-2 px-4 rounded-lg hover:bg-gray-50"
              >
                Tickets
              </RouterLink>
              <button
                @click="handleLogout"
                class="flex items-center justify-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-medium"
              >
                <LogOut class="w-4 h-4" />
                Logout
              </button>
            </div>
          </template>

          <template v-else>
            <div class="flex flex-col gap-3">
              <RouterLink
                to="/auth/login"
                @click="closeMenu"
                class="text-gray-600 hover:text-blue-600 transition font-medium py-2 px-4 rounded-lg hover:bg-gray-50"
              >
                Login
              </RouterLink>
              <RouterLink
                to="/auth/signup"
                @click="closeMenu"
                class="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-medium text-center"
              >
                Sign Up
              </RouterLink>
            </div>
          </template>
        </div>
      </transition>
    </div>
  </nav>
</template>

<script setup lang="ts">
import { ref } from "vue"
import { useRouter } from "vue-router"
import { LogOut, Menu, X, Waves } from "lucide-vue-next"
import { useAuth } from "../stores/useAuth"
import { toast } from "../composables/Toast"

const { isAuthenticated, logout } = useAuth()
const { showToast } = toast
const router = useRouter()
const isMenuOpen = ref(false)

function handleLogout() {
  logout()
  showToast("Logout successful!", "success")
  router.push("/")
  isMenuOpen.value = false
}

function closeMenu() {
  isMenuOpen.value = false
}
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>