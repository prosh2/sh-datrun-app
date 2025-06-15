import { createAppUserFromJSON, ProfileForm } from "@/components/model/User";
import { db, storage } from "@/lib/firebase";
import { User } from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";

export async function uploadImageAsync(uri: string, pathInStorage: string) {
  // Why are we using XMLHttpRequest? See:
  // https://github.com/expo/expo/issues/2402#issuecomment-443726662
  console.log("[storage][write] uploading image");
  const blob: Blob = (await new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.onload = function () {
      resolve(xhr.response);
    };
    xhr.onerror = function (e) {
      console.log(e);
      reject(new TypeError("Network request failed"));
    };
    xhr.responseType = "blob";
    xhr.open("GET", uri, true);
    xhr.send(null);
  })) as Blob;
  try {
    const fileRef = ref(storage, pathInStorage);
    await uploadBytes(fileRef, blob);
    return await getDownloadURL(fileRef);
  } catch (error) {
    console.log(error);
    return null;
  }
}

export async function uploadProfilePictureToDB(
  collection: string,
  user_id: string,
  downloadURL: string,
) {
  await setDoc(
    doc(db, collection, user_id),
    {
      photoURL: downloadURL,
    },
    { merge: true },
  );
}
export async function uploadProfileDetailsToDB(
  collection: string,
  user_id: string,
  profile: ProfileForm,
) {
  try {
    await setDoc(
      doc(db, collection, user_id),
      {
        ...profile,
      },
      { merge: true },
    );
  } catch (error) {
    console.log(error);
  }
}

export const userExistsInDB = async (user_id: string) => {
  const docRef = doc(db, "users", user_id);
  const docSnap = await getDoc(docRef);
  if (docSnap.exists()) {
    return true;
  } else {
    console.log("No such document!");
    return false;
  }
};

export const writeUserToDB = async (user: User) => {
  const userInfo = createAppUserFromJSON(user);
  await setDoc(
    doc(db, "users", user.uid),
    JSON.parse(JSON.stringify(userInfo)),
  );
};
