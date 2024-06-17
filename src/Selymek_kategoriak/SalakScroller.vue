<template>
  <div class="scroller-page">
    <h1 style="color: #6a0dad;">{{ formattedImageGroupName }}</h1>
    <div class="image-container">
      <div v-for="image in images" :key="image.id" class="image-item" @click="openModal(image)">
        <img :src="baseUrl + image.location" :alt="image.filename" />
      </div>
    </div>
    <div class="modal" v-if="selectedImage">
      <span class="close" @click="selectedImage = null">&times;</span>
      <img :src="baseUrl + selectedImage.location" :alt="selectedImage.filename" />
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
  computed: {
    formattedImageGroupName() {
      const imageName = this.$route.params.imageName || '';
      console.log("Image name from route params:", imageName); // Debug logging
      return this.getFilenameWithoutSuffix(imageName);
    }
  },
  mounted() {
    this.fetchGroupedImages();
  },
  methods: {
    async fetchGroupedImages() {
      const imageName = this.$route.params.imageName;
      console.log("Fetching images for group:", imageName); // Debug logging
      try {
        const response = await axios.get(`http://localhost:8000/api/images/salak?name=${imageName}`);
        console.log("Fetched images:", response.data); // Debug logging
        this.images = response.data;
      } catch (error) {
        console.error('Error fetching grouped images:', error);
      }
    },
    openModal(image) {
      this.selectedImage = image;
    },
    getFilenameWithoutSuffix(filename) {
      return filename.replace(/(_\d+)?(\.[^.]+)?$/, '');
    }
  },
};
</script>

<style scoped>
.scroller-page {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
}

.image-container {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
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
  height: 250px;
  object-fit: cover;
  display: block;
  transition: transform 0.3s ease;
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
</style>
