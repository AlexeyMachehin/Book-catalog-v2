import { initializeApp } from 'firebase/app';
import {
  getFirestore,
  collection,
  doc,
  addDoc,
  deleteDoc,
  updateDoc,
} from 'firebase/firestore';
import { toast } from 'react-hot-toast';
import { BookOmitId, IBook } from '@/types/IBook';

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

export async function addBook(newBook: BookOmitId): Promise<void> {
  try {
    await addDoc(colRef, newBook).then(() =>
      toast.success('Book added successfully!'),
    );
  } catch (error: any) {
    console.log(error.message);
    toast.error('Error: no books with this title');
  }
}

export async function deleteBook(deletedBook: IBook): Promise<void> {
  try {
    await deleteDoc(doc(db, 'books', deletedBook.id)).then(() =>
      toast.success('Book deleted successfully!'),
    );
  } catch (error: any) {
    console.log(error.message);
    toast.error('Error: could not delete book');
  }
}

export async function updateBook(
  updatedBook: BookOmitId,
  id: string,
): Promise<void> {
  try {
    await updateDoc(doc(db, 'books', id), updatedBook).then(() =>
      toast.success('Book updated successfully!'),
    );
  } catch (error: any) {
    console.log(error.message);
    toast.error('Error: could not update book');
  }
}
