<template>
  <div class="admin-container">
    <h1>Admin Page</h1>

    <div
      class="drop-area"
      @dragover.prevent="onDragOver"
      @dragleave.prevent="onDragLeave"
      @drop.prevent="onDrop"
    >
      <p>Drag and drop your image here, or click to select</p>
      <input type="file" accept="image/*" @change="onFileChange" ref="fileInput" />
    </div>

    <div v-if="image" class="image-preview">
      <img :src="image" alt="Uploaded Image Preview" />
      <input type="text" v-model="imageName" placeholder="Enter image name" />
      <button @click="uploadTo('sal')">Sál</button>
      <button @click="uploadTo('kendo')">Kendő</button>
      <button @click="uploadTo('carousel')">Carousel</button>
    </div>

    <div class="uploaded-images">
      <h2>Uploaded Images</h2>
      <ul>
        <li v-for="image in images" :key="image.id">
          <img :src="baseUrl + image" alt="Uploaded Image" />
          <button @click="deleteImage(image)">Delete</button>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      image: null,
      file: null,
      imageName: '',
      images: [],
      baseUrl: 'http://127.0.0.1:8000'
    };
  },
  mounted() {
    this.fetchImages();
  },
  methods: {
    onDragOver() {
      this.$refs.dropArea.classList.add('hover');
    },
    onDragLeave() {
      this.$refs.dropArea.classList.remove('hover');
    },
    onDrop(event) {
      this.$refs.dropArea.classList.remove('hover');
      const file = event.dataTransfer.files[0];
      this.handleFile(file);
    },
    onFileChange(event) {
      const file = event.target.files[0];
      this.handleFile(file);
    },
    handleFile(file) {
      if (file) {
        this.file = file;
        const reader = new FileReader();
        reader.onload = (e) => {
          this.image = e.target.result;
        };
        reader.readAsDataURL(file);
      } else {
        console.error('No file selected or dropped.');
      }
    },
    async uploadTo(directory) {
      if (this.file && this.imageName) {
        const formData = new FormData();
        formData.append('image', this.file);
        formData.append('name', this.imageName);
        try {
          const response = await axios.post(`http://localhost:8000/api/upload${directory}`, formData, {
            headers: {
              'Content-Type': 'multipart/form-data'
            }
          });
          console.log('Image uploaded successfully: ', response.data);
          this.image = null;
          this.file = null;
          this.imageName = '';
          this.fetchImages();
        } catch (error) {
          console.error('Error uploading image: ', error);
        }
      } else {
        console.error('No file selected or no image name provided.');
      }
    },
    fetchImages() {
      axios
        .get('http://localhost:8000/api/allImages')
        .then((response) => {
          this.images = response.data;
        })
        .catch((error) => {
          console.error('Error fetching images:', error);
        });
    },
    deleteImage(imageUrl) {
      const imageName = imageUrl.split('/').pop();
      axios
        .delete(`http://localhost:8000/api/images/${imageName}`)
        .then(() => {
          this.images = this.images.filter((image) => image !== imageUrl);
          console.log('Image deleted successfully');
        })
        .catch((error) => {
          console.error('Error deleting image:', error);
        });
    }
  }
};
</script>

<style scoped>
.admin-container {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
  background-color: #f8f8f8;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

h1 {
  text-align: center;
  color: #6a0dad;
  margin-bottom: 20px;
}

.drop-area {
  margin-bottom: 20px;
  padding: 20px;
  border: 2px dashed #8a2be2;
  border-radius: 10px;
  text-align: center;
  cursor: pointer;
}

.drop-area p {
  margin: 0;
  color: #8a2be2;
}

.image-preview {
  margin-bottom: 20px;
  text-align: center;
}

.image-preview img {
  max-width: 100%;
  max-height: 300px;
  border-radius: 10px;
}

.uploaded-images {
  text-align: center;
}

.uploaded-images h2 {
  color: #6a0dad;
}

.uploaded-images ul {
  list-style: none;
  padding: 0;
}

.uploaded-images ul li {
  margin-bottom: 10px;
}

.uploaded-images ul li img {
  max-width: 100%;
  border-radius: 10px;
}

.uploaded-images ul li button {
  margin-top: 5px;
  background-color: #8a2be2;
  color: white;
  border: none;
  border-radius: 5px;
  padding: 8px 16px;
  cursor: pointer;
}

.uploaded-images ul li button:hover {
  background-color: #6a0dad;
}
</style>
