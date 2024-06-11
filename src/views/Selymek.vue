<template>
  <div class="select-image-page">
    <h1>Select Image</h1>
    <div class="image-container">
      <div class="image-card" @click="selectImage('sal')">
        <img :src="baseUrl + salImage" alt="Sal Image" />
        <p>Select Sal Image</p>
      </div>
      <div class="image-card" @click="selectImage('kendo')">
        <img :src="baseUrl + kendoImage" alt="Kendo Image" />
        <p>Select Kendo Image</p>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

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
  methods: {
    async getSalImage() {
      try {
        const response = await axios.get('http://localhost:8000/api/images/sal');
        if (response.data.length > 0) {
          this.salImage = response.data;
          console.log(response.data);
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
    selectImage(category) {
      console.log('Selected category:', category);
    }
  }
};
</script>

<style scoped>
.select-image-page {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
  text-align: center;
}

.image-container {
  display: flex;
  justify-content: center;
  align-items: center;
}

.image-card {
  margin: 20px;
  cursor: pointer;
}

.image-card img {
  width: 300px;
  height: auto;
  border-radius: 10px;
}

.image-card p {
  margin-top: 10px;
  font-size: 18px;
}
</style>
