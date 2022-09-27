<template>
  <div class="relative flex flex-col rounded border border-gray-200 bg-white">
    <div class="border-b border-gray-200 px-6 pt-6 pb-5 font-bold">
      <span class="card-title">Upload</span>
      <i class="fas fa-upload float-right text-2xl text-green-400"></i>
    </div>
    <div class="p-6">
      <!-- Upload Dropbox -->
      <div
        class="group relative w-full cursor-pointer rounded border border-dashed border-gray-400 px-10 py-20 text-center text-gray-400 transition duration-500 hover:border-solid hover:border-green-400 hover:bg-green-400 hover:text-white"
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
          class="m-auto h-16 transition-all group-hover:brightness-[40]"
          src="https://filedropper.com/assets/themes/modern/img/upload-outline.svg"
          alt="upload icon"
        />
        <input
          class="absolute inset-0 h-full w-full cursor-pointer opacity-0"
          type="file"
          accept="audio/mpeg,audio/x-m4a"
          name="files"
          multiple
          title="Select Files to Upload"
          @change="uploadHandler"
        />
        <h5 class="text-xl">Select Files to Upload</h5>
        <h6 class="mt-3.5 text-base">or Drag and Drop your files here</h6>
        <span class="mt-4 text-xs text-opacity-80">
          [Maximum upload file size: {{ maxFileSizeInMB }}MB]
        </span>
      </div>
      <hr class="my-6" />
      <!-- Progess Bars -->
      <div class="mb-4" v-for="upload in uploads" :key="upload.name">
        <!-- File Name -->
        <h5
          class="mb-0.5 text-sm font-semibold text-opacity-90"
          :class="upload.textClass"
        >
          <i :class="upload.icon"></i> {{ upload.name }}
        </h5>
        <div class="flex h-4 overflow-hidden rounded bg-gray-200">
          <!-- Inner Progress Bar -->
          <div
            class="progress-bar transition-all"
            :class="upload.variant"
            :style="{ width: upload.currentProgress + '%' }"
          ></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { auth, songsRef, songsCollection } from "@/plugins/firebase.js";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { addDoc } from "firebase/firestore";

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
      if (!navigator.onLine) {
        alert("You are offline...");
        return;
      }
      console.log("UPLOADING>>>>");
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
              const { id } = await addDoc(songsCollection, songData);
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
  @apply border-solid border-green-400 bg-green-400 text-white;
}
</style>
