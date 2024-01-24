import { initializeApp } from "firebase/app";
import { 
    getFirestore, collection, onSnapshot,
    addDoc, deleteDoc, doc,
    query, where,
    orderBy, serverTimestamp,
    getDoc, updateDoc
} from "firebase/firestore";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signOut, signInWithEmailAndPassword,
  onAuthStateChanged
} from "firebase/auth"

const firebaseConfig = {
    apiKey: "AIzaSyC-NG2Ir3I7UvPfMw2uRJn5sndQbVcTN9Q",
    authDomain: "fir-9-diamuy-18c39.firebaseapp.com",
    projectId: "fir-9-diamuy-18c39",
    storageBucket: "fir-9-diamuy-18c39.appspot.com",
    messagingSenderId: "419907447334",
    appId: "1:419907447334:web:9d49a0c9f3a7ca198394e7"
  };

initializeApp(firebaseConfig);

const db = getFirestore();
const auth = getAuth();

const colRef = collection(db, 'books');

const q = query(colRef, orderBy('createAt'));

const unsubCol = onSnapshot(q, (snapshot) => {
  let books = []
  snapshot.docs.forEach((doc) => {
      books.push({ ...doc.data(), id: doc.id })
  })
  console.log(books)
})

const addBookForm = document.querySelector('.add');
addBookForm.addEventListener('submit', (e) => {
    e.preventDefault();

    addDoc(colRef, {
      title: addBookForm.title.value,
      author: addBookForm.author.value,
      createAt: serverTimestamp()
    })
    .then (() => {
        addBookForm.reset()
    })
})

const deleteBookForm = document.querySelector('.delete');
deleteBookForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const docRef = doc(db, 'books', deleteBookForm.id.value);

    deleteDoc(docRef)
    .then(() => {
        deleteBookForm.reset()
    })
})

const docRef = doc(db, 'books', 'Sq5URUgrX5soi0SaMY7D');

const unsubDoc = onSnapshot(docRef, (doc) => {
    console.log(doc.data(), doc.id)
})

const updateForm = document.querySelector('.update');
updateForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const docRef = doc(db, 'books', updateForm.id.value);

    updateDoc(docRef, {
        title: 'updated title'
    })
    .then(() => {
        updateForm.reset()
    })
})

const signupForm = document.querySelector('.signup');
signupForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const email = signupForm.email.value;
    const password = signupForm.password.value;

    createUserWithEmailAndPassword(auth, email, password)
    .then((cred) => {
        // console.log('user created', cred.user)
        signupForm.reset()
    })
    .catch((err) => {
        console.log(err.message)
    })
})

const logoutButton = document.querySelector('.logout');
logoutButton.addEventListener('click', () => {
    signOut(auth)
    .then(() => {
        // console.log('the user signed out')
    })
    .catch((err) => {
        console.log(err.message)
    })
})

const loginForm = document.querySelector('.login');
loginForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const email = loginForm.email.value;
    const password = loginForm.password.value;

    signInWithEmailAndPassword(auth, email, password)
    .then((cred) => {
        // console.log('user logged in', cred.user)
    })
    .catch((err) => {
        console.log(err.message)
    })
})

const unsubAuth = onAuthStateChanged(auth, (user) => {
    console.log('user state changed', user)
})

const unsubButton = document.querySelector('.unsub');
unsubButton.addEventListener('click', () => {
  console.log('unsubscribing')
  unsubCol()
  unsubDoc()
  unsubAuth()
})