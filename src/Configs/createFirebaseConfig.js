const V = require("voca");
const createFirebaseConfig = (entity) => {
  const EntityNameInTitleCase = V.titleCase(entity.name);
  const EntityNameInCamelCase = V.camelCase(entity.name);

  return `

import { initializeApp ,firestore ,storage} from "firebase/app";
import  "firebase/firestore";
import 'firebase/storage';
const firebaseConfig = {
  apiKey: "",
  authDomain: "",
  databaseURL: "",
  projectId: "",
  storageBucket: "",
  messagingSenderId: "",
  appId: "",
  measurementId: "",
};

export const firebaseInstance = initializeApp(firebaseConfig);
export const firestoreInstance = firestore();
export const storageInstance = storage()


    `;
};
module.exports = { createFirebaseConfig };
