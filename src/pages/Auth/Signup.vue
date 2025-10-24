<script setup lang="ts">
import { ref } from "vue";
import { useRouter, RouterLink } from "vue-router";
import { useAuth } from "../../stores/useAuth";
import { toast } from "../../composables/Toast";
import Navbar from "../../components/Navbar.vue";
import Footer from "../../components/Footer.vue";
import FormInput from "../../components/FormInput.vue";
import { UserPlus } from "lucide-vue-next";

const email = ref("");
const password = ref("");
const confirmPassword = ref("");
const errors = ref<{
  email?: string;
  password?: string;
  confirmPassword?: string;
}>({});
const isLoading = ref(false);

const { signup } = useAuth();
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

  if (!confirmPassword.value) {
    newErrors.confirmPassword = "Please confirm your password";
  } else if (password.value !== confirmPassword.value) {
    newErrors.confirmPassword = "Passwords do not match";
  }

  errors.value = newErrors;
  return Object.keys(newErrors).length === 0;
};

const handleSubmit = async (e: Event) => {
  e.preventDefault();

  if (!validateForm()) return;

  isLoading.value = true;
  try {
    await signup(email.value, password.value);
    showToast("Account created successfully!", "success");
    router.push("/dashboard");
  } catch (error) {
    showToast(
      error instanceof Error ? error.message : "Signup failed",
      "error"
    );
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
              <UserPlus class="w-6 h-6 text-blue-600" />
            </div>
          </div>

          <h1 class="text-2xl font-bold text-center text-gray-900 mb-2">
            Create Account
          </h1>
          <p class="text-center text-gray-600 mb-8">Join TicketHub today</p>

          <form @submit="handleSubmit" class="space-y-4">
            <FormInput
              label="Email"
              type="email"
              :model-value="email"
              @update:model-value="email = $event"
              :error="errors.email"
              placeholder="your@email.com"
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

            <FormInput
              label="Confirm Password"
              type="password"
              :model-value="confirmPassword"
              @update:model-value="confirmPassword = $event"
              :error="errors.confirmPassword"
              placeholder="Confirm your password"
              required
            />

            <button
              type="submit"
              :disabled="isLoading"
              class="w-full py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-medium disabled:opacity-50 cursor-pointer"
            >
              {{ isLoading ? "Creating account..." : "Create Account" }}
            </button>
          </form>

          <p class="text-center text-gray-600 mt-6">
            Already have an account?
            <RouterLink
              to="/auth/login"
              class="text-blue-600 hover:underline font-medium"
            >
              Sign in
            </RouterLink>
          </p>
        </div>
      </div>
    </div>

    <Footer />
  </div>
</template>
