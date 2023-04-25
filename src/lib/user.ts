import { db } from "@/firebase/client";
import { User } from "@/types/user";
import { collection, doc, getDocs, updateDoc } from "firebase/firestore";

export const updateUser = (id: string, data: Partial<Omit<User, "id" | "createdAt">>): Promise<void> => {
  const ref = doc(db, `users/${id}`);
  return updateDoc(ref, data);
};

export const getUsers = async () => {
  const userRef = collection(db, "users");
  const userSnap = await getDocs(userRef);
  const users = userSnap.docs.map((doc) => doc.data() as User);
  return users;
};
