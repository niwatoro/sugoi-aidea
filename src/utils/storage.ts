import { storage } from "@/firebase/client";
import { deleteObject, getDownloadURL, ref, uploadString } from "@firebase/storage";

export const uploadImage = async (path: string, image: string): Promise<string> => {
  const storageRef = ref(storage, path);
  const task = await uploadString(storageRef, image, "data_url");
  return getDownloadURL(task.ref);
};

export const deleteImage = async (path: string): Promise<void> => {
  const storageRef = ref(storage, path);
  return deleteObject(storageRef);
};
