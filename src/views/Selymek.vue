<template>
  <div class="select-image-page">
    <h1>Select Image</h1>
    <div class="image-container">
      <div class="image-card" @click="selectSalImage">
        <img :src="baseUrl + salImage" alt="Sal Image" />
        <p>Select Sal Image</p>
      </div>
      <div class="image-card" @click="selectKendoImage">
        <img :src="baseUrl + kendoImage" alt="Kendo Image" />
        <p>Select Kendo Image</p>
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
          console.log(this.salImage);
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
  background-color: #f8f8f8;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  text-align: center;
}

h1 {
  color: #6a0dad;
}

.image-container {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 50px; /* Adjust the gap between image cards */
}

.image-card {
  cursor: pointer;
  background-color: #ffffff;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s, box-shadow 0.3s;
}

.image-card:hover {
  transform: scale(1.05);
  box-shadow: 0 0 15px rgba(0, 0, 0, 0.2);
}

.image-card img {
  width: 300px;
  height: auto;
  border-radius: 10px;
}

.image-card p {
  margin-top: 10px;
  font-size: 18px;
  color: #8a2be2;
}
</style>
