import { db } from "@/firebase/client";
import { User } from "@/types/user";
import { doc, updateDoc } from "firebase/firestore";

export const updateUser = (id: string, data: Partial<Omit<User, "id" | "createdAt">>): Promise<void> => {
  const ref = doc(db, `users/${id}`);
  return updateDoc(ref, data);
};
