<script setup lang="ts">
import { ref } from "vue";
import { useAuth } from "../../stores/useAuth";
import { useRouter, RouterLink } from "vue-router";
import { toast } from "../../composables/Toast";
import Navbar from "../../components/Navbar.vue";
import Footer from "../../components/Footer.vue";
import FormInput from "../../components/FormInput.vue";
import { LogIn } from "lucide-vue-next";

const email = ref("");
const password = ref("");
const errors = ref<{ email?: string; password?: string }>({});
const isLoading = ref(false);

const { login } = useAuth();
const { showToast } = toast;
const router = useRouter();

const validateForm = () => {
  const newErrors: typeof errors.value = {};

  if (!email.value) {
    newErrors.email = "Email is required";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value)) {
    newErrors.email = "Please enter a valid email";
  }

  if (!password.value) {
    newErrors.password = "Password is required";
  } else if (password.value.length < 6) {
    newErrors.password = "Password must be at least 6 characters";
  }

  errors.value = newErrors;
  return Object.keys(newErrors).length === 0;
};

const handleSubmit = async (e: Event) => {
  e.preventDefault();

  if (!validateForm()) return;

  isLoading.value = true;
  try {
    await login(email.value, password.value);
    showToast("Login successful!", "success");
    router.push("/dashboard");
  } catch (error) {
    showToast(error instanceof Error ? error.message : "Login failed", "error");
  } finally {
    isLoading.value = false;
  }
};
</script>

<template>
  <div class="min-h-screen bg-linear-to-b from-white to-blue-50 flex flex-col">
    <Navbar />

    <div class="flex-1 flex items-center justify-center px-4 py-12">
      <div class="w-full max-w-md">
        <div class="bg-white rounded-2xl shadow-lg p-8 border border-blue-100">
          <div class="flex justify-center mb-6">
            <div class="p-3 bg-blue-100 rounded-full">
              <LogIn class="w-6 h-6 text-blue-600" />
            </div>
          </div>

          <h1 class="text-2xl font-bold text-center text-gray-900 mb-2">
            Welcome Back
          </h1>
          <p class="text-center text-gray-600 mb-8">Sign in to your account</p>

          <form @submit="handleSubmit" class="space-y-4">
            <FormInput
              label="Email"
              type="email"
              :model-value="email"
              @update:model-value="email = $event"
              :error="errors.email"
              placeholder="test@example.com"
              required
            />

            <FormInput
              label="Password"
              type="password"
              :model-value="password"
              @update:model-value="password = $event"
              :error="errors.password"
              placeholder="Password123!"
              required
            />

            <button
              type="submit"
              :disabled="isLoading"
              class="w-full cursor-pointer py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-medium disabled:opacity-50"
            >
              {{ isLoading ? "Signing in..." : "Sign In" }}
            </button>
          </form>

          <p class="text-center text-gray-600 mt-6">
            Don't have an account?
            <RouterLink
              to="/auth/signup"
              class="text-blue-600 hover:underline font-medium"
            >
              Sign up
            </RouterLink>
          </p>

          <!-- <div class="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
            <p class="text-sm text-gray-700">
              <strong>Demo credentials:</strong>
              <br />
              Email: test@example.com
              <br />
              Password: Password123!
            </p>
          </div> -->
        </div>
      </div>
    </div>

    <Footer />
  </div>
</template>
