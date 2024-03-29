import { initializeApp } from "firebase/app"
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth"
import { getStorage } from "firebase/storage"

const firebaseConfig = {
  apiKey: "AIzaSyCo_ZkkmKBPDDlqdqqesxjEZBlfgAuVmzg",
  authDomain: "mern-blog-jsx.firebaseapp.com",
  projectId: "mern-blog-jsx",
  storageBucket: "mern-blog-jsx.appspot.com",
  messagingSenderId: "445696324579",
  appId: "1:445696324579:web:c6126f39a7350d3dfbe6d6",
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)

export const provider = new GoogleAuthProvider()
export const auth = getAuth(app)
export const storage = getStorage(app)

export const authGoogleWithPopup = async () => {
  const {
    user: { accessToken },
  } = await signInWithPopup(auth, provider)

  return accessToken
}
