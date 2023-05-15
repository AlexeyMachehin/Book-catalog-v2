import { IBook } from '@/types/IBook';
import { fromDto, toDto } from '@/types/mapper';
import { initializeApp } from 'firebase/app';
import {
  getFirestore,
  collection,
  getDoc,
  doc,
  addDoc,
  deleteDoc,
  updateDoc,
} from 'firebase/firestore';

const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  projectId: process.env.FIREBASE_PROJECT_ID,
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.FIREBASE_APP_ID,
  measurementId: process.env.FIREBASE_MEASUREMENT_ID,
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export const colRef = collection(db, 'books');

export async function setDoc(value: IBook): Promise<string> {
  const docRef = await addDoc(colRef, value);
  return docRef.id;
}

export async function deleteBook(id: string): Promise<void> {
  await deleteDoc(doc(db, 'books', id));
}

export async function getDocById(id: string): Promise<IBook> {
  const document = await getDoc(doc(db, 'books', id));
  return fromDto(document.data(), id);
}

export async function updateDocById(
  updatedBook: IBook,
  id: string,
): Promise<void> {
  await updateDoc(doc(db, 'books', id), toDto(updatedBook));
}
