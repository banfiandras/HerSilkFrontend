<template>
  <div class="admin-page">
    <h1>Admin Page</h1>
    <div
      class="drop-area"
      @dragover.prevent="onDragOver"
      @dragleave.prevent="onDragLeave"
      @drop.prevent="onDrop"
      @click="selectFile"
    >
      <p>Drag and drop your image here, or click to select</p>
      <input type="file" accept="image/*" @change="onFileChange" ref="fileInput" />
    </div>
    <div v-if="image" class="image-preview">
      <img :src="image" alt="Uploaded Image Preview" />
      <button @click="uploadImage">Upload Image</button>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      image: null,
      file: null
    };
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
      console.log('File:', file); // Add this line to check if the file is not empty or undefined

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
    selectFile() {
      this.$refs.fileInput.click();
    },
    async uploadImage() {
      if (this.file) {
        const formData = new FormData();
        formData.append('image', this.file);

        try {
          const response = await axios.post('http://localhost:8000/api/upload', formData, {
            headers: {
              'Content-Type': 'multipart/form-data'
            }
          });
          console.log('Image uploaded successfully: ', response.data);
          this.image = null;
          this.file = null;
        } catch (error) {
          console.error('Error uploading image: ', error);
        }
      } else {
        console.error('No file selected or dropped.');
      }
    }
  }
};
</script>

<style scoped>
.admin-page {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
  text-align: center;
}

.drop-area {
  border: 2px dashed #ccc;
  border-radius: 10px;
  padding: 20px;
  cursor: pointer;
  position: relative;
}

.drop-area p {
  margin: 0;
  font-size: 16px;
  color: #888;
}

.drop-area input[type="file"] {
  display: none;
}

.drop-area.hover {
  border-color: #333;
}

.image-preview {
  margin-top: 20px;
}

.image-preview img {
  max-width: 100%;
  height: auto;
  border: 1px solid #ccc;
  border-radius: 10px;
}

.image-preview button {
  margin-top: 10px;
  padding: 10px 20px;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}
</style>
