<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-light">
    <div class="container-fluid">
      <a class="navbar-brand" href="#">Navbar</a>
      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
          <li class="nav-item">
            <router-link class="nav-link active" to="/">Kategóriák</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/Ujdonsagok">Újdonságok</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/Selymek">Selymek</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/Rolam">Rólam</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/kapcsolat">Kapcsolat</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/Vasarlas">Vásárlás</router-link>
          </li>
        </ul>
        <ul class="navbar-nav">
          <li class="nav-item" v-if="!isAuthenticated">
            <router-link class="nav-link" to="/login">Bejelentkezés</router-link>
          </li>
          <li class="nav-item" v-else>
            <a class="nav-link" href="#" @click.prevent="logout">Kijelentkezés</a>
          </li>
        </ul>
      </div>
    </div>
  </nav>

  <router-view />
</template>

<script>
import { RouterView } from "vue-router";
import { useAuthStore } from '@/store';
import { computed } from 'vue';

export default {
  setup() {
    const authStore = useAuthStore();

    const isLoggedIn = computed(() => authStore.isAuthenticated);

    const logout = () => {
      authStore.logout();
      router.push('/Login');
    };

    return {
      isLoggedIn,
      logout,
    };
  },
};
</script>

<style scoped>
</style>
