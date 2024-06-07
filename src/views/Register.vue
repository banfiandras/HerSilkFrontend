<template>
    <div class="register-container">
      <h1>Register</h1>
      <form @submit.prevent="register" class="register-form">
        <input type="text" v-model="username" placeholder="Username" required>
        <input type="password" v-model="password" placeholder="Password" required>
        <button type="submit">Register</button>
      </form>
      <router-link to="/login" class="login-link">Already have an account? Login here</router-link>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  import { useAuthStore } from '@/store/auth';
  
  export default {
    data() {
      return {
        username: '',
        password: '',
      };
    },
    methods: {
      async register() {
        try {
          const response = await axios.post('http://localhost:8000/api/register', {
            username: this.username,
            password: this.password,
          });
          useAuthStore().login();
          alert(response.data.message);
        } catch (error) {
          alert(error.response.data.message);
        }
      },
    },
  };
  </script>
  
  <style scoped>
  .register-container {
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
  
  .register-form {
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
  
  .login-link {
    text-align: center;
    color: #8a2be2;
    text-decoration: none;
    display: block;
    margin-top: 20px;
    font-size: 14px;
  }
  </style>
  