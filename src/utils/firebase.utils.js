import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithPopup,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";

import {
  getDoc,
  setDoc,
  doc,
  getFirestore,
  collection,
  writeBatch,
  query,
  getDocs,
} from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDuJqM0uyQlmIbpO7AY-cr-YOkzt4W5-Fs",
  authDomain: "crwn-clothing-db-ddf30.firebaseapp.com",
  projectId: "crwn-clothing-db-ddf30",
  storageBucket: "crwn-clothing-db-ddf30.appspot.com",
  messagingSenderId: "748605077563",
  appId: "1:748605077563:web:90fa912bbc6e09b4f2041e",
};

// Initialize Firebase
// eslint-disable-next-line
const fireBaseApp = initializeApp(firebaseConfig);

const googleProvider = new GoogleAuthProvider();

export const auth = getAuth();

const db = getFirestore();

export const addCollectionAndDocument = async (collectionKey, objectToAdd) => {
  const collectionRef = collection(db, collectionKey);
  const batch = writeBatch(db);

  objectToAdd.forEach((object) => {
    const docRef = doc(collectionRef, object.title.toLowerCase());
    batch.set(docRef, object);
  });

  await batch.commit();
  console.log("Data uploaded");
};

export const getCategoriesAndDocuments = async () => {
  const collectionRef = collection(db, "categories");
  const q = query(collectionRef);
  const querrySnapShots = await getDocs(q);
  return querrySnapShots.docs.map((doc) => doc.data());
};

export const createUserDocumentFromAuth = async (
  userAuth,
  additionalInformations = {}
) => {
  const userDocRef = await doc(db, "users", userAuth.uid);

  const userSnapShot = await getDoc(userDocRef);

  if (!userSnapShot.exists()) {
    const { displayName, email } = userAuth;
    const createdDate = new Date();

    try {
      await setDoc(userDocRef, {
        displayName,
        email,
        createdDate,
        ...additionalInformations,
      });
    } catch (error) {
      console.log(error);
    }
  }

  return userSnapShot;
};

export const createAuthUserWithEmailAndPassword = async (email, password) => {
  if (!email || !password) return;

  return await createUserWithEmailAndPassword(auth, email, password);
};

export const signInWithGooglePopup = () =>
  signInWithPopup(auth, googleProvider);

export const signInWithPasswordAndEmail = async (email, password) => {
  if (!email || !password) return;

  return await signInWithEmailAndPassword(auth, email, password);
};

export const signOutUser = async () => await signOut(auth);

export const onAuthStateChangedListener = (callback) =>
  onAuthStateChanged(auth, callback);

export const getCurrentUser = () => {
  return new Promise((resolve, reject) => {
    const unsubscribe = onAuthStateChanged(
      auth,
      (userAuth) => {
        unsubscribe();
        resolve(userAuth);
      },
      reject
    );
  });
};
