import { Book, SortingType } from '@/types/Book';
import { fromDto, toDto } from '@/types/mapper';
import { initializeApp } from 'firebase/app';
import { getFirestore, OrderByDirection } from 'firebase/firestore';
import {
  collection,
  getDocs,
  getDoc,
  orderBy,
  doc,
  query,
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

console.log(process.env.FIREBASE_API_KEY)

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export async function getSortDocs(
  sortingType: SortingType,
  directionSort: OrderByDirection,
): Promise<Array<Book>> {
  const arr: Book[] = [];
  const documents = await getDocs(
    query(collection(db, 'books'), orderBy(sortingType, directionSort)),
  );

  documents.docs.forEach(doc => {
    arr.push(fromDto(doc.data(), doc.id));
  });

  return arr;
}

export async function getAllDocs(): Promise<Array<Book>> {
  const arr: Book[] = [];
  const documents = await getDocs(collection(db, 'books'));

  documents.docs.forEach(doc => {
    arr.push(fromDto(doc.data(), doc.id));
  });
  return arr;
}

export async function setDoc(value: Book): Promise<string> {
  const docRef = await addDoc(collection(db, 'books'), value);
  return docRef.id;
}

export async function deleteBook(id: string): Promise<void> {
  await deleteDoc(doc(db, 'books', id));
}

export async function getDocById(id: string): Promise<Book> {
  const document = await getDoc(doc(db, 'books', id));
  return fromDto(document.data(), id);
}

export async function updateDocById(
  updatedBook: Book,
  id: string,
): Promise<void> {
  await updateDoc(doc(db, 'books', id), toDto(updatedBook));
}
