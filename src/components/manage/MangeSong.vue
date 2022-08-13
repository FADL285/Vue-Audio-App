<template>
  <div class="border border-gray-200 p-3 mb-4 rounded">
    <div>
      <h4 class="inline-block text-2xl font-bold">{{ song.modifiedName }}</h4>
      <button
        @click="deleteSong"
        class="ml-1 py-1 px-2 text-sm rounded text-white bg-red-600 float-right"
      >
        <i class="fa fa-times"></i>
      </button>
      <button
        @click="switchToEditMode(true)"
        class="ml-1 py-1 px-2 text-sm rounded text-white bg-blue-600 float-right"
      >
        <i class="fa fa-pencil-alt"></i>
      </button>
    </div>
    <ManageSongEditor
      :song="song"
      v-if="inEditMode"
      @cancel="switchToEditMode(false)"
      @update="updateSong"
    />
  </div>
</template>

<script>
import ManageSongEditor from "@/components/manage/ManageSongEditor.vue";

export default {
  name: "MangeSong",
  components: { ManageSongEditor },
  data() {
    return {
      inEditMode: false,
    };
  },
  props: {
    song: {
      type: Object,
      required: true,
    },
  },
  methods: {
    switchToEditMode(val) {
      this.inEditMode = val;
    },
    async updateSong(song) {
      await this.$store.dispatch("updateSong", song);
      this.switchToEditMode(false);
    },
    async deleteSong() {
      const answer = window.confirm("Do you really want to Delete this song?");
      if (!answer) return false;
      this.$store.dispatch("deleteSong", this.song);
    },
  },
};
</script>

<style scoped></style>
