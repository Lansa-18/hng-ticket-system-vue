import { useAuthStore } from "@/stores/auth";

class Auth {
  private get store() {
    return useAuthStore();
  }

  async login(email: string, password: string) {
    return this.store.login(email, password);
  }

  async signup(name: string, email: string, password: string) {
    return this.store.signup(name, email, password);
  }

  logout() {
    this.store.logout();
  }

  checkAuth() {
    return this.store.checkAuth();
  }

  getUser() {
    return this.store.user;
  }
}

export const auth = new Auth();
