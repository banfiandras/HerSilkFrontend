<template>
  <div class="salak-page">
    <h1 style="color: #6a0dad;">Salak Page</h1>
    <div class="image-container">
      <div
        v-for="image in images"
        :key="image.id"
        class="image-item"
        @click="redirectToGroup(image)"
      >
        <img :src="baseUrl + image.location" :alt="image.filename" />
        <div class="image-overlay">
          <p>{{ image.filename }}</p>
        </div>
      </div>
    </div>
    <div class="modal" v-if="selectedImage">
      <span class="close" @click="selectedImage = null">&times;</span>
      <img :src="baseUrl + selectedImage.location" :alt="selectedImage.filename" />
      <p>{{ getFilenameWithoutExtension(selectedImage.filename) }}</p>
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
      selectedImage: null,
    };
  },
  mounted() {
    this.fetchImages();
  },
  methods: {
    async fetchImages() {
      try {
        const response = await axios.get('http://localhost:8000/api/images/salak');
        const filteredImages = this.filterImages(response.data);
        this.images = filteredImages;
      } catch (error) {
        console.error('Error fetching images:', error);
      }
    },
    filterImages(images) {
      const uniqueImages = {};
      images.forEach(image => {
        const baseName = this.getBaseName(image.filename);
        if (!uniqueImages[baseName]) {
          uniqueImages[baseName] = image;
        }
      });
      return Object.values(uniqueImages);
    },
    getBaseName(filename) {
      const match = filename.match(/^(.*)_\d+\.\w+$/);
      return match ? match[1] : filename;
    },
    redirectToGroup(image) {
      const baseName = this.getBaseName(image.filename);
      this.$router.push({
        name: 'SalakScrollerWithImageName',
        params: { imageName: baseName }
      });
    },
    openModal(image) {
      this.selectedImage = image;
    },
    getFilenameWithoutExtension(filename) {
      if (!filename) {
        return '';
      }
      const parts = filename.split('.');
      if (parts.length > 1) {
        parts.pop();
      }
      return parts.join('.');
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
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 15px;
}

.image-item {
  position: relative;
  cursor: pointer;
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.image-item img {
  width: 100%;
  height: 200px; /* Ensures all images are the same height */
  object-fit: cover; /* Ensures images cover the container without distortion */
  display: block;
  transition: transform 0.3s ease;
}

.image-overlay {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  background-color: rgba(0, 0, 0, 0.7);
  color: #fff;
  padding: 10px;
  opacity: 0;
  transition: opacity 0.3s ease;
}

.image-item:hover img {
  transform: scale(1.1);
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
    grid-template-columns: repeat(3, 1fr);
  }
}

@media (max-width: 768px) {
  .image-container {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 480px) {
  .image-container {
    grid-template-columns: 1fr;
  }
}
</style>
