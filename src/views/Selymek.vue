<template>
  <div class="select-image-page">
    <div class="image-container">
      <div class="image-card" @click="selectSalImage">
        <img :src="baseUrl + salImage" alt="Sal Image" />
        <div class="overlay">
          <p>Sálak</p>
        </div>
      </div>
      <div class="image-card" @click="selectKendoImage">
        <img :src="baseUrl + kendoImage" alt="Kendo Image" />
        <div class="overlay">
          <p>Kendők</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import { useRouter } from 'vue-router';

export default {
  data() {
    return {
      salImage: '',
      kendoImage: '',
      baseUrl: 'http://127.0.0.1:8000'
    };
  },
  mounted() {
    this.getSalImage();
    this.getKendoImage();
  },
  setup() {
    const router = useRouter();
    return { router };
  },
  methods: {
    async getSalImage() {
      try {
        const response = await axios.get('http://localhost:8000/api/images/sal');
        if (response.data.length > 0) {
          this.salImage = response.data;
        }
      } catch (error) {
        console.error('Error fetching Sal image: ', error);
      }
    },
    async getKendoImage() {
      try {
        const response = await axios.get('http://localhost:8000/api/images/kendo');
        if (response.data.length > 0) {
          this.kendoImage = response.data;
        }
      } catch (error) {
        console.error('Error fetching Kendo image: ', error);
      }
    },
    selectSalImage() {
      this.router.push('/salak');
    },
    selectKendoImage() {
      this.router.push('/kendok');
    }
  }
};
</script>

<style scoped>

.select-image-page {
  max-width: 800px;
  margin: 0 auto;
  padding: 40px;
  background-color: #f1d5fc;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  text-align: center;
  position: relative;
  overflow: hidden;
  background-image: radial-gradient(circle, rgba(190, 176, 231, 0.5), rgba(157, 144, 199, 0.5)), linear-gradient(to right, rgba(230, 230, 250, 0.7) 10%, transparent 10%), linear-gradient(to bottom, rgba(230, 230, 250, 0.7) 10%, transparent 10%);
  background-size: 200% 100%, 100% 100%, 100% 100%;
  animation: backgroundAnimation 10s infinite linear;

  @keyframes backgroundAnimation {
    0% {
      background-position: 0 0, 0 0, 0 0;
    }
    100% {
      background-position: -200% 0, 0 0, 0 0;
    }
  }
}

h1 {
  color: #6a0dad;
  margin-bottom: 30px;
}

.image-container {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 30px;
}

.image-card {
  position: relative;
  cursor: pointer;
  width: 400px;
  height: 400px;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s, box-shadow 0.3s;
}

.image-card:hover {
  transform: scale(1.05);
  box-shadow: 0 0 15px rgba(0, 0, 0, 0.2);
}

.image-card img {
  width: 100%; 
  height: 100%; 
  object-fit: cover; 
  border-radius: 10px;
}

.overlay {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: rgba(138, 43, 226, 0.7);
  color: white;
  padding: 10px;
  border-bottom-left-radius: 10px;
  border-bottom-right-radius: 10px;
  text-align: center;
  opacity: 0;
  transition: opacity 0.3s;
}

.image-card:hover .overlay {
  opacity: 1;
}

.overlay p {
  margin: 0;
  font-size: 18px;
}
</style>
