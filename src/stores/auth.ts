import { defineStore } from "pinia";
import { ref } from "vue";
import { useRouter } from "vue-router";
import { initializeMockTickets } from "@/lib/tickets";

interface User {
  id: string;
  name: string;
  email: string;
  password: string;
}

interface Session {
  token: string;
  user: User | null;
  registeredUsers: Array<{
    id: string;
    name: string;
    email: string;
    password: string;
  }>;
}

export const useAuthStore = defineStore("auth", () => {
  const router = useRouter();
  const user = ref<User | null>(null);
  const isLoading = ref(false);

  const generateToken = (email: string): string => {
    return btoa(`${email}:${Date.now()}`);
  };

  const getSession = (): Session | null => {
    const sessionData = localStorage.getItem("ticketapp_session");
    if (!sessionData) return null;
    return JSON.parse(sessionData);
  };

  const saveSession = (sessionData: Session) => {
    localStorage.setItem("ticketapp_session", JSON.stringify(sessionData));
  };

  async function login(email: string, password: string) {
    isLoading.value = true;
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));

      if (email === "demo@example.com" && password === "password123") {
        const demoUser = {
          id: "demo-user",
          name: "Demo User",
          email: "demo@example.com",
          password: "password123",
        };
        const token = generateToken(email);

        const session = getSession();
        const registeredUsers = session?.registeredUsers || [];

        saveSession({
          token,
          user: demoUser,
          registeredUsers: [
            ...registeredUsers.filter((u) => u.id !== "demo-user"),
            demoUser,
          ],
        });

        // Initialize mock tickets for demo user
        initializeMockTickets();

        user.value = demoUser;
        router.push("/dashboard");
        return true;
      }

      // Regular user login
      const session = getSession();
      const registeredUsers = session?.registeredUsers || [];

      const foundUser = registeredUsers.find(
        (u: User) => u.email === email && u.password === password
      );

      if (!foundUser) {
        throw new Error("Invalid email or password");
      }

      const token = generateToken(email);

      saveSession({
        token,
        user: foundUser,
        registeredUsers,
      });

      user.value = foundUser;
      router.push("/dashboard");
      return true;
    } catch (error) {
      throw error;
    } finally {
      isLoading.value = false;
    }
  }

  async function signup(name: string, email: string, password: string) {
    isLoading.value = true;
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));

      const session = getSession();
      const registeredUsers = session?.registeredUsers || [];

      if (registeredUsers.some((u) => u.email === email)) {
        throw new Error("Email already exists");
      }

      // Create new user
      const newUser = {
        id: crypto.randomUUID(),
        name,
        email,
        password,
      };

      const updatedUsers = [...registeredUsers, newUser];

      // If this is the first user, create new session, otherwise update existing
      if (session) {
        saveSession({
          ...session,
          registeredUsers: updatedUsers,
        });
      } else {
        saveSession({
          token: "",
          user: null,
          registeredUsers: updatedUsers,
        });
      }

      return true;
    } catch (error) {
      throw error;
    } finally {
      isLoading.value = false;
    }
  }

  function logout() {
    localStorage.removeItem("ticketapp_session");
    user.value = null;
    router.push("/"); 
  }

  function checkAuth(): boolean {
    try {
      const session = getSession();
      if (!session || !session.token || !session.user) return false;

      user.value = session.user;
      return true;
    } catch {
      return false;
    }
  }

  // Initialize auth state and create demo user if not exists
  const initializeStore = () => {
    const session = getSession();
    if (!session) {

      const demoUser = {
        id: crypto.randomUUID(),
        name: "Demo User",
        email: "demo@example.com",
        password: "password123",
      };

      saveSession({
        token: "",
        user: null,
        registeredUsers: [demoUser],
      });
    }
    checkAuth();
  };

  initializeStore();

  return {
    user,
    isLoading,
    login,
    signup,
    logout,
    checkAuth,
  };
});
