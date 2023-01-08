import { initializeApp } from 'firebase/app'
import { getDatabase } from 'firebase/database'

const firebaseConfig = {
  apiKey: 'AIzaSyDSJ-B87Lko5lsPJZj0ut-0UODbCBbuYwU',
  authDomain: 'media-tracker-cad.firebaseapp.com',
  projectId: 'media-tracker-cad',
  storageBucket: 'media-tracker-cad.appspot.com',
  messagingSenderId: '178767952453',
  appId: '1:178767952453:web:9f9e0bed927122ad01412c',
}

const app = initializeApp(firebaseConfig)
const db = getDatabase(app)
export default db