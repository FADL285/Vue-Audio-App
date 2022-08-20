import { initializeApp } from "firebase/app";
import { collection, getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage, ref } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyC8SjLLy_7us1MsdHcx2yTvf3S31GwtZTY",
  authDomain: "vue-music-app-285.firebaseapp.com",
  projectId: "vue-music-app-285",
  storageBucket: "vue-music-app-285.appspot.com",
  messagingSenderId: "652986413015",
  appId: "1:652986413015:web:fc24a74e717ed884fce592",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// Initialize Cloud Firestore and get a reference to the service
export const db = getFirestore(app);
// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);
// Initialize Cloud Storage and get a reference to the service
const storage = getStorage(app);

export const songsRef = ref(storage, "songs");
export const songsCollection = collection(db, "songs");
export const commentsCollection = collection(db, "comments");
