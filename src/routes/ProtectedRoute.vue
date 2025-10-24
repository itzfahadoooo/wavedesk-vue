<script setup lang="ts">
import { useAuth } from "../stores/useAuth"
import { useRouter } from "vue-router"
import { watchEffect } from "vue"

const router = useRouter()
const auth = useAuth()

// Watch for auth changes and redirect if not authenticated
watchEffect(() => {
  if (!auth.isAuthenticated) {
    router.replace("/auth/login")
  }
})
</script>

<template>
  <slot v-if="auth.isAuthenticated" />
</template>