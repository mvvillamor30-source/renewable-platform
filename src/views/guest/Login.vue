<template>
    <section class="flex justify-center items-center min-h-screen bg-gray-50">
      <div class="bg-white rounded-lg shadow-lg p-8 w-full max-w-md">
        <h2 class="text-3xl font-bold text-green-800 mb-6 text-center">Login</h2>
        <p class="text-gray-600 mb-6 text-center">Access your account to manage renewable energy solutions.</p>
        
        <!-- Login Form -->
        <form class="space-y-4">
          <div>
            <label for="email" class="block text-gray-700 mb-1">Email Address</label>
            <input 
              v-model="email"
              type="email" 
              id="email" 
              placeholder="you@example.com"
              class="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-800 focus:border-green-800"
            />
          </div>

          <div>
            <label for="password" class="block text-gray-700 mb-1">Password</label>
            <input 
              v-model="password"
              type="password" 
              id="password" 
              placeholder="********"
              class="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-800 focus:border-green-800"
            />
          </div>

          <div class="flex justify-between items-center text-sm">
            <router-link to="/forgot-password" class="text-green-800 hover:underline">Forgot Password?</router-link>
          </div>

          <button @click="submitLogin" type="submit" class="w-full bg-green-800 text-white font-semibold px-4 py-2 rounded-md hover:bg-green-700 transition">
            Login
          </button>
          <p v-if="error" class="text-red-600 text-sm">{{ error }}</p>
        </form>

        <!-- Register Link -->
        <p class="mt-6 text-center text-gray-600">
          Don't have an account? 
          <router-link to="/register" class="text-yellow-400 hover:underline">Register</router-link>
        </p>
      </div>
    </section>
</template>

<script setup>
import { ref } from 'vue';
import { login } from '@/services/authService';
import { useRouter } from 'vue-router';

const router = useRouter();
const email = ref('');
const password = ref('');
const error = ref('');

const submitLogin = async (e) => {
  e.preventDefault();

  try {
    const response = await login({ email: email.value, password: password.value });
    const user = response.data.user;
    const token = response.data.token;

    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(user));

    // Role-based redirect using user_type and role
    if (user.user_type === 'Admin') {
      router.push('/admin');
    } else if (user.user_type === 'Provider') {
      router.push('/provider');
    } else if (user.user_type === 'Staff') {
      switch (user.role) {
        case 'Human Resource':
          router.push('/human-resource');
          break;
        case 'Operations':
          router.push('/operation');
          break;
        case 'Marketing':
          router.push('/marketing');
          break;
        case 'Inventory':
        case 'Procurement':
          router.push('/inventory');
          break;
        case 'Installer':
          router.push('/installer');
          break;
        default:
          router.push('/staff/dashboard'); // fallback
      }
    } else if (user.user_type === 'Customer') {
      router.push('/e-commerce');
    } else {
      router.push('/'); // fallback
    }

  } catch (err) {
    error.value = err.response?.data?.message || 'Login failed';
  }
};
</script>

<style scoped>
/* Optional: small hover/focus animations handled by Tailwind */
</style>