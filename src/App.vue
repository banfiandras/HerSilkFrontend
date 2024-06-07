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
          <li class="nav-item">
            <a class="nav-link" @click="handleLoginLogout">{{ loginLogoutText }}</a>
          </li>
        </ul>
      </div>
    </div>
  </nav>

  <router-view @login="handleLogin" @logout="handleLogout" />
</template>

<script>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';

export default {
  setup() {
    const router = useRouter();
    const loginLogoutText = ref('Bejelentkezés');

    onMounted(() => {
      const token = localStorage.getItem('token');
      if (token) {
        loginLogoutText.value = 'Kijelentkezés';
      }
    });

    const handleLogin = () => {
      loginLogoutText.value = 'Kijelentkezés';
    };

    const handleLogout = () => {
      loginLogoutText.value = 'Bejelentkezés';
      localStorage.removeItem('token');
      router.push('/login');
    };

    const handleLoginLogout = () => {
      if (loginLogoutText.value === 'Bejelentkezés') {
        router.push('/login');
      } else {
        handleLogout();
      }
    };

    return {
      loginLogoutText,
      handleLogin,
      handleLogout,
      handleLoginLogout,
    };
  },
};
</script>

<style scoped></style>
