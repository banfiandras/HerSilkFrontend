<template>
  <div class="salak-page">
    <h1>Salak Page</h1>
    <div class="image-grid">
      <div v-for="image in images" :key="image.id" class="image-card" @click="enlargeImage(image)">
        <img :src="baseUrl + image.location" :alt="image.filename" />
        <p>{{ image.filename }}</p>
      </div>
    </div>
    <div class="modal" v-if="selectedImage">
      <span class="close" @click="selectedImage = null">&times;</span>
      <img :src="baseUrl + selectedImage.location" :alt="selectedImage.filename" />
      <p>{{ selectedImage.filename }}</p>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      images: [],
      selectedImage: null,
      baseUrl: 'http://localhost:8000',
    };
  },
  mounted() {
    this.fetchSalImages();
    // Add event listener to close modal on pressing Escape key
    document.addEventListener('keydown', this.onEscKey);
  },
  beforeDestroy() {
    // Remove event listener when component is destroyed
    document.removeEventListener('keydown', this.onEscKey);
  },
  methods: {
    async fetchSalImages() {
      try {
        const response = await axios.get('http://localhost:8000/api/images/salak');
        this.images = response.data;
      } catch (error) {
        console.error('Error fetching Sal images:', error);
      }
    },
    enlargeImage(image) {
      this.selectedImage = image;
    },
    closeImage() {
      this.selectedImage = null;
    },
    onEscKey(event) {
      if (event.key === 'Escape') {
        this.closeImage();
      }
    },
  },
};
</script>

<style scoped>
.salak-page {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
}

.image-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  grid-auto-rows: 200px; /* Set a minimum row height */
  grid-gap: 20px;
  grid-auto-flow: dense; /* Fill empty spaces with images */
}

.image-card {
  position: relative;
  cursor: pointer;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.image-card img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 8px;
  transition: transform 0.3s ease;
}

.image-card p {
  position: absolute;
  bottom: 10px;
  left: 0;
  width: 100%;
  text-align: center;
  margin: 0;
  padding: 5px;
  background-color: rgba(0, 0, 0, 0.5);
  color: #fff;
  font-size: 14px;
  opacity: 0;
  transition: opacity 0.3s ease;
}

.image-card:hover p {
  opacity: 1;
}

.modal {
  display: block;
  position: fixed;
  z-index: 1000;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.8);
  padding-top: 50px;
  text-align: center;
}

.modal img {
  max-width: 80%;
  max-height: 80%;
  margin: 0 auto;
  border-radius: 8px;
}

.modal .close {
  position: absolute;
  top: 20px;
  right: 20px;
  color: #fff;
  font-size: 30px;
  cursor: pointer;
}
</style>
