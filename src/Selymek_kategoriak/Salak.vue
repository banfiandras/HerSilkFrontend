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
    },
    methods: {
      async fetchSalImages() {
        try {
          const response = await axios.get('http://localhost:8000/api/images/sal');
          this.images = [response.data]; 
        } catch (error) {
          console.error('Error fetching Sal images:', error);
        }
      },
      enlargeImage(image) {
        this.selectedImage = image;
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
    grid-template-columns: repeat(5, 1fr);
    gap: 20px;
  }
  
  .image-card {
    cursor: pointer;
    border-radius: 8px;
    overflow: hidden;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  }
  
  .image-card img {
    width: 100%;
    height: auto;
    transition: transform 0.3s ease;
  }
  
  .image-card p {
    text-align: center;
    margin: 10px 0;
    font-size: 14px;
    color: #333;
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
  