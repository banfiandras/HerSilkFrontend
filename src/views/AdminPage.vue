<template>
  <div class="admin-container">
    <h1>Admin Page</h1>

    <div class="drop-area" @dragover.prevent="onDragOver" @dragleave.prevent="onDragLeave" @drop.prevent="onDrop" ref="dropArea">
      <p>Drag and drop your images here, or click to select</p>
      <input type="file" accept="image/*" multiple @change="onFileChange" ref="fileInput" />
    </div>

    <div v-if="imagesToUpload.length" class="image-preview">
      <div v-for="(image, index) in imagesToUpload" :key="index" class="image-preview-item">
        <img :src="image.preview" alt="Uploaded Image Preview" />
        <button @click="removeImage(index)">Remove</button>
      </div>
      <input type="text" v-model="imageName" placeholder="Enter image name" />
      <button @click="uploadTo('sal')" :disabled="imagesToUpload.length > 4">Sál</button>
      <button @click="uploadTo('kendo')" :disabled="imagesToUpload.length > 4">Kendő</button>
      <button @click="uploadTo('carousel')" :disabled="imagesToUpload.length > 4">Carousel</button>
      <p v-if="imagesToUpload.length > 4" class="error-message">You can only upload up to 4 images.</p>
    </div>

    <div class="uploaded-images">
      <h2>Uploaded Images</h2>
      <div class="image-grid">
        <div v-for="image in images" :key="image.id" class="image-item" @click="enlargeImage(image)">
          <img :src="baseUrl + image.location" :alt="image.filename" />
          <div class="image-overlay">
            <p>{{ image.filename }}</p>
            <button @click.stop="deleteImage(image)">Delete</button>
          </div>
        </div>
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
      imagesToUpload: [],
      imageName: '',
      images: [],
      selectedImage: null,
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
      const files = event.dataTransfer.files;
      this.handleFiles(files);
    },
    onFileChange(event) {
      const files = event.target.files;
      this.handleFiles(files);
    },
    handleFiles(files) {
      for (let file of files) {
        const reader = new FileReader();
        reader.onload = (e) => {
          if (this.imagesToUpload.length < 4) {
            this.imagesToUpload.push({
              file: file,
              preview: e.target.result
            });
          } else {
            console.error('You can only upload up to 4 images.');
          }
        };
        reader.readAsDataURL(file);
      }
    },
    removeImage(index) {
      this.imagesToUpload.splice(index, 1);
    },
    async uploadTo(directory) {
      if (this.imagesToUpload.length && this.imageName) {
        const formData = new FormData();
        for (let image of this.imagesToUpload) {
          formData.append('images[]', image.file);
        }
        formData.append('name', this.imageName);
        try {
          const response = await axios.post(`http://localhost:8000/api/upload${directory}`, formData, {
            headers: {
              'Content-Type': 'multipart/form-data'
            }
          });
          console.log('Images uploaded successfully: ', response.data);
          this.imagesToUpload = [];
          this.imageName = '';
          this.fetchImages();
        } catch (error) {
          console.error('Error uploading images: ', error);
        }
      } else {
        console.error('No images selected or no image name provided.');
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
    deleteImage(image) {
      const imageName = image.location.split('/').pop();
      axios
        .delete(`http://localhost:8000/api/images/${imageName}`)
        .then(() => {
          this.images = this.images.filter((img) => img.location !== image.location);
          console.log('Image deleted successfully');
        })
        .catch((error) => {
          console.error('Error deleting image:', error);
        });
    },
    enlargeImage(image) {
      this.selectedImage = image;
    },
    closeImage() {
      this.selectedImage = null;
    }
  }
};
</script>

<style scoped>
.admin-container {
  max-width: 1200px;
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

.image-preview-item {
  display: inline-block;
  margin: 10px;
  position: relative;
}

.image-preview img {
  max-width: 100px;
  max-height: 100px;
  border-radius: 10px;
}

.image-preview-item button {
  position: absolute;
  top: 5px;
  right: 5px;
  background: #ff4c4c;
  color: white;
  border: none;
  border-radius: 50%;
  padding: 5px 10px;
  cursor: pointer;
}

.image-preview-item button:hover {
  background: #ff0000;
}

.uploaded-images {
  text-align: center;
}

.uploaded-images h2 {
  color: #6a0dad;
}

.image-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 15px;
}

.image-item {
  position: relative;
  cursor: pointer;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

.image-item img {
  width: 100%;
  height: 250px;
  object-fit: cover;
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
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.image-overlay button {
  background-color: #8a2be2;
  color: white;
  border: none;
  border-radius: 5px;
  padding: 5px 10px;
  cursor: pointer;
}

.image-overlay button:hover {
  background-color: #6a0dad;
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
  border-radius: 10px;
}

.modal .close {
  position: absolute;
  top: 20px;
  right: 20px;
  color: #fff;
  font-size: 30px;
  cursor: pointer;
}

.error-message {
  color: red;
  margin-top: 10px;
}

@media (max-width: 768px) {
  .image-grid {
    grid-template-columns: repeat(auto-fill, minmax(100px, 1fr));
  }
}

@media (max-width: 480px) {
  .image-grid {
    grid-template-columns: repeat(auto-fill, minmax(80px, 1fr));
  }
}
</style>
