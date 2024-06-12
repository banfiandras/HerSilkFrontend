<template>
  <div class="login-container">
    <h1>Login</h1>
    <form @submit.prevent="login" class="login-form">
      <input type="text" v-model="username" placeholder="Username" required>
      <input type="password" v-model="password" placeholder="Password" required>
      <button type="submit">Login</button>
    </form>
    <router-link to="/register" class="register-link">Don't have an account? Register here</router-link>
  </div>
</template>

<script>
import axios from 'axios';
import { useRouter } from 'vue-router';
import { useAuthStore } from '../store';

export default {
  data() {
    return {
      username: '',
      password: '',
    };
  },

  methods: {
    async login() {
      try {
        const response = await axios.post('http://localhost:8000/api/login', {
          username: this.username,
          password: this.password,
        });

        console.log(response.data);

        const authStore = useAuthStore();
        authStore.login(this.username);

        if (this.username === 'admin' && response.status === 200) {
          this.$router.push('/admin');
        } else {
          this.$router.push('/');
        }
      } catch (error) {
        alert(error.response.data.message);
      }
    },
  },
};
</script>

<style scoped>
.login-container {
  max-width: 400px;
  margin: 0 auto;
  padding: 40px;
  background-color: #f8f8f8;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

h1 {
  text-align: center;
  color: #6a0dad;
}

.login-form {
  display: flex;
  flex-direction: column;
  align-items: center;
}

input[type="text"],
input[type="password"],
button {
  margin-bottom: 20px;
  padding: 15px;
  width: 100%;
  border: none;
  border-radius: 8px;
  font-size: 16px;
}

button {
  background-color: #8a2be2;
  color: white;
  cursor: pointer;
}

button:hover {
  background-color: #6a0dad;
}

.register-link {
  text-align: center;
  color: #8a2be2;
  text-decoration: none;
  display: block;
  margin-top: 20px;
  font-size: 14px;
}
</style>
