<template>
  <div class="bg-white rounded border border-gray-200 relative flex flex-col">
    <div class="px-6 pt-6 pb-5 font-bold border-b border-gray-200">
      <span class="card-title">Upload</span>
      <i class="fas fa-upload float-right text-green-400 text-2xl"></i>
    </div>
    <div class="p-6">
      <!-- Upload Dropbox -->
      <div
        class="group relative w-full px-10 py-20 rounded text-center cursor-pointer border border-dashed border-gray-400 text-gray-400 transition duration-500 hover:text-white hover:bg-green-400 hover:border-green-400 hover:border-solid"
        :class="{
          'active-dropbox': isDragOver,
        }"
        @drag.prevent=""
        @dragstart.prevent=""
        @dragenter.prevent="isDragOver = true"
        @dragend.prevent="isDragOver = false"
        @dragleave.prevent="isDragOver = false"
        @dragover.prevent="isDragOver = true"
        @drop.prevent="uploadHandler"
      >
        <img
          class="h-16 m-auto transition-all group-hover:brightness-[40]"
          src="https://filedropper.com/assets/themes/modern/img/upload-outline.svg"
          alt="upload icon"
        />
        <input
          class="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
          type="file"
          accept="audio/mpeg,audio/x-m4a"
          name="files"
          multiple
          title="Select Files to Upload"
          @change="uploadHandler"
        />
        <h5 class="text-xl">Select Files to Upload</h5>
        <h6 class="text-base mt-3.5">or Drag and Drop your files here</h6>
        <span class="text-opacity-80 text-xs mt-4">
          [Maximum upload file size: {{ maxFileSizeInMB }}MB]
        </span>
      </div>
      <hr class="my-6" />
      <!-- Progess Bars -->
      <div class="mb-4" v-for="upload in uploads" :key="upload.name">
        <!-- File Name -->
        <h5
          class="font-semibold text-sm text-opacity-90 mb-0.5"
          :class="upload.textClass"
        >
          <i :class="upload.icon"></i> {{ upload.name }}
        </h5>
        <div class="flex h-4 overflow-hidden bg-gray-200 rounded">
          <!-- Inner Progress Bar -->
          <div
            class="transition-all progress-bar"
            :class="upload.variant"
            :style="{ width: upload.currentProgress + '%' }"
          ></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { auth, db, songsRef } from "@/plugins/firebase.js";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { addDoc, collection } from "firebase/firestore";

export default {
  name: "AppUploader",
  data() {
    return {
      isDragOver: false,
      supportedTypes: ["audio/mpeg", "audio/x-m4a"],
      maxFileSizeInBytes: 200 * 1024 ** 2,
      uploads: [],
    };
  },
  computed: {
    maxFileSizeInMB() {
      return this.maxFileSizeInBytes / 1024 ** 2;
    },
    hasActiveUploads() {
      return this.uploads.some((upload) => upload.currentProgress < 100);
    },
  },
  methods: {
    getFileSizeInMB(sizeInBytes) {
      return Math.round(sizeInBytes / 1024 ** 2);
    },
    handleSuccessUpload(fileIndex) {
      this.uploads[fileIndex].variant = "bg-green-400";
      this.uploads[fileIndex].icon = "fas fa-check";
      this.uploads[fileIndex].textClass = "text-green-400";
    },
    handleFailureUpload(fileIndex, error) {
      this.uploads[fileIndex].variant = "bg-red-400";
      this.uploads[fileIndex].icon = "fas fa-times";
      this.uploads[fileIndex].textClass = "text-red-400";
      console.error("Upload is failed", error);
    },
    uploadHandler(event) {
      this.isDragOver = false;
      const { files } = event.dataTransfer || event.target;
      for (const file of files) {
        if (!this.supportedTypes.includes(file.type)) continue;
        if (!(file.size < this.maxFileSizeInBytes)) {
          alert(
            `File is too large [${this.getFileSizeInMB(
              file.size
            )}MB]. Maximum size is ${this.maxFileSizeInMB}MB`
          );
          continue;
        }
        const songRef = ref(songsRef, file.name);
        const uploadTask = uploadBytesResumable(songRef, file);
        const taskIndex =
          this.uploads.push({
            uploadTask,
            currentProgress: 0,
            name: file.name,
            variant: "bg-blue-400",
            icon: "fas fa-spinner fa-spin",
            textClass: "",
          }) - 1;

        uploadTask.on(
          "state_changed",
          (snapshot) => {
            this.uploads[taskIndex].currentProgress =
              (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          },
          (error) => {
            //Handle unsuccessful upload
            this.handleFailureUpload(taskIndex, error);
          },
          async () => {
            // Handle Successful upload
            const songData = {
              uid: auth.currentUser.uid,
              displayName: auth.currentUser.displayName,
              originalName: uploadTask.snapshot.ref.name,
              modifiedName: uploadTask.snapshot.ref.name,
              genre: "",
              commentsCount: 0,
            };
            songData.url = await getDownloadURL(uploadTask.snapshot.ref);
            try {
              const { id } = await addDoc(collection(db, "songs"), songData);
              songData.id = id;
              this.$store.commit("addUserSong", songData);
            } catch (err) {
              console.error("Error adding song Details: ", err);
            }

            this.handleSuccessUpload(taskIndex);
          }
        );
      }
    },
    cancelUploads() {
      this.uploads.forEach((upload) => {
        upload.uploadTask.cancel();
      });
    },
  },
};
</script>

<style scoped>
.active-dropbox {
  @apply bg-green-400 border-green-400 border-solid text-white;
}
</style>
