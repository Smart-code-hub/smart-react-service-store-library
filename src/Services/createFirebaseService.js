const V = require("voca");
const createFirebaseService = (entity) => {
  const EntityNameInTitleCase = V.titleCase(entity.name);
  const EntityNameInCamelCase = V.camelCase(entity.name);

  const ImageDeleteContent = (fieldName) => {
    return`
   
    for (let i = 0; i < ${EntityNameInCamelCase}.${fieldName}.length; i++) {
      const { path } = ${EntityNameInCamelCase}.${fieldName}[i];
      var doc${fieldName}ref = storageInstance.ref(path);
      await doc${fieldName}ref.delete();
    }
    `;
  };
  const ImageUploadContentforCreateFuncttion = (fieldName) => {

   const currentFieldName = '${'+`current${fieldName}.name`+'}';
    const PathPrefix = () =>
      "`" +
      EntityNameInTitleCase +
      "/${_id}/" +
      fieldName +
      `/${currentFieldName}` +
      "`";

      console.log(PathPrefix());
    return `
  const new${fieldName} = [];
  for (let i = 0; i < ${EntityNameInCamelCase}.${fieldName}.length; i++) {
    const current${fieldName} = ${EntityNameInCamelCase}.${fieldName}[i];
    const path = ${PathPrefix()};
    const downloadURL = await UploadImageToFirebase(current${fieldName}, path);

    new${fieldName}.push({
      url: downloadURL,
      path,
    });
  }
  ${EntityNameInCamelCase}.${fieldName} = [...new${fieldName}];
  
  `;
  };
  const ImageUploadContentforUpdateFuncttion = (fieldName) => {

   const currentFieldName = '${'+`current${fieldName}.name`+'}';
    const PathPrefix = () =>{

     return "`" +
      EntityNameInTitleCase +
      "/"+EntityNameInCamelCase+"id/" +
      fieldName +
      `/${currentFieldName}` +
      "`";
    }
 
    
    return `
  const new${fieldName} = [];
  for (let i = 0; i < ${EntityNameInCamelCase}.${fieldName}.length; i++) {
    const current${fieldName} = ${EntityNameInCamelCase}.${fieldName}[i];
    const path = ${PathPrefix()};
    const downloadURL = await UploadImageToFirebase(current${fieldName}, path);

    new${fieldName}.push({
      url: downloadURL,
      path,
    });
  }
  ${EntityNameInCamelCase}.${fieldName} = [...new${fieldName}];
  
  `;
  };


  const imagepropsContent = entity.properties
    .filter((a) => a.isImage)
    .map((a) => {
      return ImageUploadContentforCreateFuncttion(a.name);
    })
    .join(" ");
    const imagepropsContentForUpdate = entity.properties
    .filter((a) => a.isImage)
    .map((a) => {
      return ImageUploadContentforUpdateFuncttion(a.name);
    })
    .join(" ");
  const imageDeletepropsContent = [
    ` const ${EntityNameInCamelCase} = (await docRef.get()).data();`,
    ...entity.properties
      .filter((a) => a.isImage)
      .map((a) => {
        return ImageDeleteContent(a.name);
      }),
  ].join(" ");

  return `
  import axios from "axios";

import { firestoreInstance, storageInstance } from "../firebase.config";
const API_URL = "";
export const Fetch${EntityNameInTitleCase}s = async () => {
  return firestoreInstance
    .collection("${EntityNameInCamelCase}")
    .get()
    .then((querySnapshot) => {
      const records =
        querySnapshot &&
        querySnapshot.docs.map(function (doc) {
          return doc.data();
        });
      return { data: records };
    });
};
export const Get${EntityNameInTitleCase}ById = async (${EntityNameInCamelCase}Id) => {
  const docRef = firestoreInstance.collection("${EntityNameInCamelCase}").doc(${EntityNameInCamelCase}Id);
  return { data: (await docRef.get()).data() };
};
export const Create${EntityNameInTitleCase}Record = async (${EntityNameInCamelCase}) => {
  //Upload the images
 
  const docRef = firestoreInstance.collection("${EntityNameInCamelCase}").doc();
  const _id = docRef.id;

${imagepropsContent}



  await docRef.set({ ...${EntityNameInCamelCase}, _id });
  return { data: (await docRef.get()).data() };
};
export const Edit${EntityNameInTitleCase}Record = async (${EntityNameInCamelCase}Id, ${EntityNameInCamelCase}) => {
  const docRef = firestoreInstance.collection("${EntityNameInCamelCase}").doc(${EntityNameInCamelCase}Id);
 ${imagepropsContentForUpdate}
  await docRef.set({ ...${EntityNameInCamelCase} });
  return { data: (await docRef.get()).data() };
};
export const Delete${EntityNameInTitleCase} = async (${EntityNameInCamelCase}Id) => {
  //first Delete the images on firebase
  const docRef = firestoreInstance.collection("${EntityNameInCamelCase}").doc(${EntityNameInCamelCase}Id);


  ${imageDeletepropsContent}


  await docRef.delete();
  return { data: "Deleted" };
};

async function UploadImageToFirebase(image, path) {
  let uploadTask = storageInstance.ref(path).put(image);
  return new Promise((resolve, reject) => {
    uploadTask.on(
      "state_changed",
      function (snapshot) {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log("Upload is " + progress + "% done");
      },
      function (error) {
        reject(error); // added this line
        alert(error);
      },
      async function () {
        const downloadURL = await uploadTask.snapshot.ref.getDownloadURL();
        resolve(downloadURL); // added this line
      }
    );
  });
}

  
    `;
};
module.exports = { createFirebaseService };
