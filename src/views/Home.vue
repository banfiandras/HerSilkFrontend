<template>
  <div class="home-page">
    <div class="image-carousel">
      <img :src="currentImage" :key="currentImageKey" alt="Carousel Image" />
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      images: [],
      currentImageIndex: 0,
      intervalId: null,
      intervalDuration: 7000,
      baseUrl: 'http://localhost:8000',
    };
  },
  computed: {
    currentImage() {
      return this.images.length > 0 ? this.constructImageUrl(this.images[this.currentImageIndex]) : '';
    },
    currentImageKey() {
      return this.images.length > 0 ? this.images[this.currentImageIndex] : null;
    },
  },
  mounted() {
    this.fetchCarouselImages(); 
    this.startCarousel();
  },
  methods: {
    async fetchCarouselImages() {
      try {
        const response = await axios.get('http://localhost:8000/api/carouselImages');
        if (Array.isArray(response.data) && response.data.length > 0) {
          this.images = response.data;
        } else {
          console.warn('No images found:', response.data);
        }
      } catch (error) {
        console.error('Error fetching images:', error);
      }
    },
    startCarousel() {
      this.intervalId = setInterval(() => {
        this.nextImage();
      }, this.intervalDuration);
    },
    nextImage() {
      this.currentImageIndex = (this.currentImageIndex + 1) % this.images.length;
    },
    constructImageUrl(filename) {
      return `${this.baseUrl}${filename}`;
    },
  },
  beforeUnmount() {
    clearInterval(this.intervalId);
  },
};
</script>

<style scoped>
.home-page {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  overflow: hidden;
}

.image-carousel {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.image-carousel img {
  min-width: 100%;
  min-height: 100%;
  object-fit: cover;
  transition: opacity 0.5s ease;
}
</style>
