import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

const config = {
  apiKey: "AIzaSyAQcLC12Wb7J8lIznvk4BP_y4W2YnrwS2w",
  authDomain: "crown-db-166b6.firebaseapp.com",
  databaseURL: "https://crown-db-166b6.firebaseio.com",
  projectId: "crown-db-166b6",
  storageBucket: "crown-db-166b6.appspot.com",
  messagingSenderId: "204366409206",
  appId: "1:204366409206:web:89975906f73f813654ebd7",
  measurementId: "G-8ZPJZCM467",
};

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;

  const userRef = firestore.doc(`users/${userAuth.uid}`);
  const snapShot = await userRef.get();

  if (!snapShot.exists) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();
    try {
      await userRef.set({
        displayName,
        createdAt,
        email,
        ...additionalData,
      });
    } catch (error) {
      console.log("error", error.message);
    }
  }
  return userRef;
};

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: "select_account" });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
