<template>
  <div class="salak-page">
    <h1 style="color: #6a0dad;">Salak Page</h1>
    <div class="image-container">
      <div
        v-for="image in images"
        :key="image.id"
        class="image-item"
        @click="navigateToScroller(image)"
      >
      <img :src="baseUrl + image.location" :alt="image.filename" />
        <div class="image-overlay" style="background-color: rgba(138, 43, 226, 0.7);">
          <p>{{ getFilenameWithoutExtension(image.filename) }}</p>
        </div>
      </div>
    </div>
    <div class="modal" v-if="selectedImage">
      <span class="close" @click="selectedImage = null" style="color: white;">&times;</span>
      <img :src="baseUrl + selectedImage.location" :alt="selectedImage.filename" />
      <p style="color: white;">{{ getFilenameWithoutExtension(selectedImage.filename) }}</p>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      images: [],
      baseUrl: 'http://localhost:8000',
    };
  },
  mounted() {
    this.fetchSalImages();
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
    navigateToScroller(image) {
      localStorage.setItem('selectedImage', JSON.stringify(image));

      this.$router.push({ name: 'SalakScroller' });
    },
    getFilenameWithoutExtension(filename) {
      const parts = filename.split('.');
      return parts.slice(0, -1).join('.');
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

.image-container {
  column-count: 4;
  column-gap: 15px;
}

.image-item {
  display: inline-block;
  margin-bottom: 15px;
  position: relative;
  cursor: pointer;
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.image-item img {
  width: 100%;
  height: auto;
  display: block;
  transition: transform 0.3s ease;
}

.image-overlay {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  color: #fff;
  padding: 10px;
  opacity: 0;
  transition: opacity 0.3s ease;
}

.image-item:hover img {
  transform: scale(1.1);
}

.image-item:hover .image-overlay {
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

@media (max-width: 1200px) {
  .image-container {
    column-count: 3;
  }
}

@media (max-width: 768px) {
  .image-container {
    column-count: 2;
  }
}

@media (max-width: 480px) {
  .image-container {
    column-count: 1;
  }
}
</style>
