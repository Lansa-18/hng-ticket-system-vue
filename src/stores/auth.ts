import { defineStore } from "pinia";
import { ref } from "vue";
import { useRouter } from "vue-router";

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

  // Generate a simple session token (for demo purposes)
  const generateToken = (email: string): string => {
    return btoa(`${email}:${Date.now()}`);
  };

  // Get session data with registered users
  const getSession = (): Session | null => {
    const sessionData = localStorage.getItem("ticketapp_session");
    if (!sessionData) return null;
    return JSON.parse(sessionData);
  };

  // Save session data
  const saveSession = (sessionData: Session) => {
    localStorage.setItem("ticketapp_session", JSON.stringify(sessionData));
  };

  async function login(email: string, password: string) {
    isLoading.value = true;
    try {
      // Simulate network delay
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Check for demo user credentials first
      if (email === "demo@example.com" && password === "password123") {
        const demoUser = {
          id: "demo-user",
          name: "Demo User",
          email: "demo@example.com",
          password: "password123",
        };
        const token = generateToken(email);

        // Get any existing users from session
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
      // Simulate network delay
      await new Promise((resolve) => setTimeout(resolve, 1000));

      const session = getSession();
      const registeredUsers = session?.registeredUsers || [];

      // Check if email already exists
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

      // Update registered users
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
    // Clear session from localStorage
    localStorage.removeItem("ticketapp_session");
    user.value = null;
    router.push("/"); // Redirect to landing page
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
      // Create demo user
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
