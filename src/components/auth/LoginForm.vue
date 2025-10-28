<template>
  <AuthCard
    title="Welcome back"
    description="Sign in to your TrackiT account"
    :backLink="true"
  >
    <form @submit.prevent="onSubmit" class="mt-8 space-y-6">
      <div class="space-y-4">
        <div class="space-y-2">
          <Label htmlFor="email">Email address</Label>
          <Input
            v-model="form.email"
            id="email"
            type="email"
            autocomplete="email"
            placeholder="demo@example.com"
            :disabled="auth.isLoading"
          />
          <p v-if="errors.email" class="text-sm text-destructive">
            {{ errors.email }}
          </p>
        </div>

        <div class="space-y-2">
          <Label htmlFor="password">Password</Label>
          <Input
            v-model="form.password"
            id="password"
            type="password"
            autocomplete="current-password"
            placeholder="Enter your password"
            :disabled="auth.isLoading"
          />
          <p v-if="errors.password" class="text-sm text-destructive">
            {{ errors.password }}
          </p>
        </div>
      </div>

      <div class="flex items-center justify-between">
        <div class="flex items-center space-x-2">
          <Checkbox id="remember-me" v-model="rememberMe" />
          <Label
            htmlFor="remember-me"
            class="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            Remember me
          </Label>
        </div>

        <div class="text-sm">
          <router-link
            to="/auth/reset-password"
            class="font-medium text-blue-600 hover:text-blue-500"
          >
            Forgot your password?
          </router-link>
        </div>
      </div>

      <Button
        type="submit"
        class="w-full bg-blue-700 hover:bg-blue-500"
        :disabled="auth.isLoading"
      >
        {{ auth.isLoading ? "Signing in..." : "Sign in" }}
      </Button>

      <div class="text-center">
        <p class="text-sm text-gray-600">
          Don't have an account?
          <router-link
            to="/auth/signup"
            class="font-medium text-primary hover:text-primary/90"
          >
            Sign Up
          </router-link>
        </p>
      </div>
    </form>
  </AuthCard>
</template>

<script setup lang="ts">
import { ref, reactive } from "vue";
import * as z from "zod";
import { useToast } from "vue-toastification";
import AuthCard from "./AuthCard.vue";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { useAuthStore } from "@/stores/auth";

const auth = useAuthStore();
const toast = useToast();
const rememberMe = ref(false);

const form = reactive({
  email: "",
  password: "",
});

const errors = reactive({
  email: "",
  password: "",
});

const loginSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .max(100, "Password cannot exceed 100 characters"),
});

const validateForm = () => {
  const result = loginSchema.safeParse(form);
  if (!result.success) {
    const formattedErrors = result.error.format();
    errors.email = formattedErrors.email?._errors[0] || "";
    errors.password = formattedErrors.password?._errors[0] || "";
    return false;
  }
  return true;
};

const onSubmit = async () => {
  if (!validateForm()) return;

  try {
    const success = await auth.login(form.email, form.password);
    if (success) {
      toast.success("Logged in successfully!");
    }
  } catch (error) {
    toast.error(
      error instanceof Error ? error.message : "Invalid email or password"
    );
  }
};
</script>
