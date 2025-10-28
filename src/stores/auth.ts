import { defineStore } from "pinia";
import { ref } from "vue";
import { useToast } from "vue-toastification";

interface User {
  id: string;
  name: string;
  email: string;
}

export const useAuthStore = defineStore("auth", () => {
  const user = ref<User | null>(null);
  const isLoading = ref(false);
  const toast = useToast();

  async function login(email: string, password: string) {
    isLoading.value = true;
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // For demo purposes, accept any email/password
      user.value = {
        id: "1",
        name: email.split("@")[0],
        email,
      };

      localStorage.setItem("user", JSON.stringify(user.value));
      return true;
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Failed to login";
      toast.error(message);
      return false;
    } finally {
      isLoading.value = false;
    }
  }

  async function signup(name: string, email: string, password: string) {
    isLoading.value = true;
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // For demo purposes, just return success
      toast.success("Account created successfully!");
      return true;
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Failed to create account";
      toast.error(message);
      return false;
    } finally {
      isLoading.value = false;
    }
  }

  function logout() {
    user.value = null;
    localStorage.removeItem("user");
    window.location.href = "/auth/login";
  }

  function checkAuth() {
    const savedUser = localStorage.getItem("user");
    if (savedUser) {
      user.value = JSON.parse(savedUser);
      return true;
    }
    return false;
  }

  // Initialize auth state
  checkAuth();

  return {
    user,
    isLoading,
    login,
    signup,
    logout,
    checkAuth,
  };
});
