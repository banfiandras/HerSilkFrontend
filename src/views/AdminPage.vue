<template>
  <div class="admin-page">
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
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      image: null
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
      const reader = new FileReader();
      reader.onload = (e) => {
        this.image = e.target.result;
      };
      reader.readAsDataURL(file);
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
</style>
