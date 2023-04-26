import { db } from "@/firebase/client";
import { User } from "@/types/user";
import { Query, collection, doc, getDocs, query, updateDoc, where } from "firebase/firestore";

export const getUserByUsername = async (username: string): Promise<User | null> => {
  const usersRef = collection(db, "users");
  const q: Query = query(usersRef, where("username", "==", username));
  const snap = await getDocs(q);
  if (snap.empty) {
    return null;
  }
  const appUser = snap.docs[0].data() as User;
  return appUser;
};

export const getUsers = async () => {
  const userRef = collection(db, "users");
  const userSnap = await getDocs(userRef);
  const users = userSnap.docs.map((doc) => doc.data() as User);
  return users;
};

export const updateUser = (id: string, data: Partial<Omit<User, "id" | "createdAt">>): Promise<void> => {
  const ref = doc(db, `users/${id}`);
  return updateDoc(ref, data);
};
