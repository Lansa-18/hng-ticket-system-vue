<template>
  <AuthCard
    title="Create an account"
    description="Sign up for TrackiT"
    :backLink="true"
  >
    <form @submit.prevent="onSubmit" class="mt-8 space-y-6">
      <div class="space-y-4">
        <div class="space-y-2">
          <Label for="name">Full Name</Label>
          <Input
            v-model="form.name"
            id="name"
            type="text"
            placeholder="Enter your full name"
            :disabled="isLoading"
          />
          <p v-if="errors.name" class="text-sm text-destructive">
            {{ errors.name }}
          </p>
        </div>

        <div class="space-y-2">
          <Label for="email">Email address</Label>
          <Input
            v-model="form.email"
            id="email"
            type="email"
            autocomplete="email"
            placeholder="Enter your email"
            :disabled="isLoading"
          />
          <p v-if="errors.email" class="text-sm text-destructive">
            {{ errors.email }}
          </p>
        </div>

        <div class="space-y-2">
          <Label for="password">Password</Label>
          <Input
            v-model="form.password"
            id="password"
            type="password"
            placeholder="Create a password"
            :disabled="isLoading"
          />
          <p v-if="errors.password" class="text-sm text-destructive">
            {{ errors.password }}
          </p>
        </div>

        <div class="space-y-2">
          <Label for="confirmPassword">Confirm Password</Label>
          <Input
            v-model="form.confirmPassword"
            id="confirmPassword"
            type="password"
            placeholder="Confirm your password"
            :disabled="isLoading"
          />
          <p v-if="errors.confirmPassword" class="text-sm text-destructive">
            {{ errors.confirmPassword }}
          </p>
        </div>
      </div>

      <Button
        type="submit"
        variant="default"
        class="w-full bg-blue-700 hover:bg-blue-500"
        :disabled="isLoading"
      >
        {{ isLoading ? "Creating account..." : "Create account" }}
      </Button>

      <div class="text-center">
        <p class="text-sm text-gray-600">
          Already have an account?
          <router-link
            to="/auth/login"
            class="font-medium text-primary hover:text-primary/90"
          >
            Sign In
          </router-link>
        </p>
      </div>
    </form>
  </AuthCard>
</template>

<script setup lang="ts">
import { ref, reactive } from "vue";
import { useRouter } from "vue-router";
import * as z from "zod";
import { useToast } from "vue-toastification";
import AuthCard from "./AuthCard.vue";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { auth } from "@/lib/auth";

const router = useRouter();
const toast = useToast();
const isLoading = ref(false);

const form = reactive({
  name: "",
  email: "",
  password: "",
  confirmPassword: "",
});

const errors = reactive({
  name: "",
  email: "",
  password: "",
  confirmPassword: "",
});

const signUpSchema = z
  .object({
    name: z
      .string()
      .min(2, "Name must be at least 2 characters")
      .max(50, "Name cannot exceed 50 characters"),
    email: z.string().email("Please enter a valid email address"),
    password: z
      .string()
      .min(8, "Password must be at least 8 characters")
      .max(100, "Password cannot exceed 100 characters"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

const validateForm = () => {
  const result = signUpSchema.safeParse(form);
  if (!result.success) {
    const formattedErrors = result.error.format();
    errors.name = formattedErrors.name?._errors[0] || "";
    errors.email = formattedErrors.email?._errors[0] || "";
    errors.password = formattedErrors.password?._errors[0] || "";
    errors.confirmPassword = formattedErrors.confirmPassword?._errors[0] || "";
    return false;
  }
  return true;
};

const onSubmit = async () => {
  if (!validateForm()) return;

  isLoading.value = true;
  try {
    await auth.signup(form.name, form.email, form.password);
    toast.success("Account created successfully!");
    router.push("/auth/login");
  } catch (error) {
    toast.error(
      error instanceof Error
        ? error.message
        : "Something went wrong. Please try again."
    );
  } finally {
    isLoading.value = false;
  }
};
</script>
