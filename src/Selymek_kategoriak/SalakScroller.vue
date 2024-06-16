<template>
    <div class="salak-scroller">
      <div class="main-image-container">
        <img
          v-if="selectedImage"
          :src="baseUrl + selectedImage.location"
          :alt="selectedImage.filename"
        />
      </div>
      <div class="image-grid">
        <div
          v-for="image in images"
          :key="image.id"
          class="image-item"
          @click="selectImage(image)"
        >
          <img :src="baseUrl + image.location" :alt="image.filename" />
          <div class="image-overlay" style="background-color: rgba(138, 43, 226, 0.7);">
            <p>{{ getFilenameWithoutExtension(image.filename) }}</p>
          </div>
        </div>
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
      this.getSelectedImage();
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
      getSelectedImage() {
        const storedImage = localStorage.getItem('selectedImage');
        if (storedImage) {
          this.selectedImage = JSON.parse(storedImage);
        }
      },
      selectImage(image) {
        this.selectedImage = image;
        localStorage.setItem('selectedImage', JSON.stringify(image));
        this.scrollToTop();
      },
      getFilenameWithoutExtension(filename) {
        const parts = filename.split('.');
        return parts.slice(0, -1).join('.');
      },
      scrollToTop() {
        window.scrollTo({
          top: 0,
          behavior: 'smooth',
        });
      },
    },
  };
  </script>
  
  <style scoped>
  .salak-scroller {
    max-width: 1200px;
    margin: 0 auto;
    padding: 20px;
  }
  
  .main-image-container {
    text-align: center;
    margin-bottom: 20px;
  }
  
  .main-image-container img {
    max-width: 70%;
    height: auto;
    border-radius: 8px;
  }
  
  .image-grid {
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
  
  @media (max-width: 1200px) {
    .image-grid {
      column-count: 3;
    }
  }
  
  @media (max-width: 768px) {
    .image-grid {
      column-count: 2;
    }
  }
  
  @media (max-width: 480px) {
    .image-grid {
      column-count: 1;
    }
  }
  </style>
  