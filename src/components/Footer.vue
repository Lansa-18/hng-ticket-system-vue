<template>
  <footer class="bg-gray-900 text-gray-300">
    <div class="container mx-auto px-4 py-12 max-w-[1440px]">
      <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div>
          <h3 class="text-xl font-bold mb-4">TrackiT</h3>
          <p class="text-gray-400">
            Streamline your support workflow with our powerful ticket management
            solution.
          </p>
        </div>
        <div>
          <h4 class="text-lg font-semibold mb-4">Quick Links</h4>
          <ul class="space-y-2">
            <li>
              <router-link to="/" class="hover:text-white transition-colors">
                Home
              </router-link>
            </li>
            <li>
              <router-link
                to="/auth/login"
                class="hover:text-white transition-colors"
              >
                Login
              </router-link>
            </li>
            <li>
              <router-link
                to="/auth/signup"
                class="hover:text-white transition-colors"
              >
                Sign Up
              </router-link>
            </li>
          </ul>
        </div>
        <div>
          <h4 class="text-lg font-semibold mb-4">Contact</h4>
          <ul class="space-y-2 text-gray-400">
            <li>Email: support@trackiT.com</li>
            <li>Phone: (555) 123-4567</li>
          </ul>
        </div>
      </div>
      <div class="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
        <p>© {{ new Date().getFullYear() }} TrackiT. All rights reserved.</p>
      </div>
    </div>
  </footer>
</template>
