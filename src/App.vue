<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-light custom-navbar">
    <div class="container-fluid">
      <a class="navbar-brand custom-brand" href="#">Hersilk</a>
      <button
        class="navbar-toggler custom-toggler"
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
            <router-link class="nav-link custom-nav-link active" to="/">Főoldal</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link custom-nav-link" to="/Selymek">Selymek</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link custom-nav-link" to="/Rolam">Rólam</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link custom-nav-link" to="/kapcsolat">Kapcsolat</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link custom-nav-link" to="/Vasarlas">Vásárlás</router-link>
          </li>
        </ul>
        <ul class="navbar-nav">
          <li class="nav-item" v-if="authStore.isAuthenticated && authStore.username === 'admin'">
            <a class="nav-link custom-nav-link" @click="goToAdminPage">Admin</a>
          </li>
          <li class="nav-item" v-if="authStore.isAuthenticated && authStore.username === 'admin'">
            <a class="nav-link custom-nav-link" @click="handleLogout">Kijelentkezés</a>
          </li>
          <li class="nav-item" v-else>
            <a class="nav-link custom-nav-link" @click="handleLoginLogout">{{ loginLogoutText }}</a>
          </li>
        </ul>
      </div>
    </div>
  </nav>

  <router-view @login="handleLogin" @logout="handleLogout" />
</template>

<script>
import { ref, computed, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from './store';

export default {
  setup() {
    const router = useRouter();
    const authStore = useAuthStore();

    const loginLogoutText = computed(() => {
      if (authStore.isAuthenticated) {
        return authStore.username === 'admin' ? '' : 'Kijelentkezés';
      }
      return 'Bejelentkezés';
    });

    onMounted(() => {
      authStore.initializeAuthState();
    });

    const handleLogin = () => {
      updateLoginLogoutText();
    };

    const handleLogout = () => {
      authStore.logout();
      updateLoginLogoutText();
      router.push('/login');
    };

    const handleLoginLogout = () => {
      if (authStore.isAuthenticated) {
        handleLogout();
      } else {
        router.push('/login');
      }
    };

    const goToAdminPage = () => {
      router.push('/admin');
    };

    return {
      loginLogoutText,
      handleLogin,
      handleLogout,
      handleLoginLogout,
      goToAdminPage,
      authStore,
    };
  },
};
</script>

<style scoped>
.custom-navbar {
  background-color: #f8f8f8;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  border-radius: 10px;
  padding: 10px 20px;
}

.custom-brand {
  color: #6a0dad;
  font-size: 24px;
  font-weight: bold;
}

.custom-toggler {
  border: none;
  outline: none;
}

.custom-toggler .navbar-toggler-icon {
  background-image: url("data:image/svg+xml;charset=utf8,%3Csvg viewBox='0 0 30 30' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath stroke='rgba%2864, 64, 64, 0.7%29' stroke-width='2' stroke-linecap='round' stroke-miterlimit='10' d='M4 7h22M4 15h22M4 23h22'/%3E%3C/svg%3E");
}

.custom-nav-link {
  color: #8a2be2;
  font-size: 16px;
  margin: 0 10px;
  cursor: pointer;
}

.custom-nav-link:hover {
  color: #6a0dad;
  cursor: pointer;
}

.nav-item .active {
  font-weight: bold;
  color: #6a0dad;
}
</style>
