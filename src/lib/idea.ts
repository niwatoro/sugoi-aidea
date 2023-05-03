import { db } from "@/firebase/client";
import { Idea } from "@/types/idea";
import { collectionGroup, doc, getDoc, getDocs, orderBy, query, setDoc, updateDoc } from "firebase/firestore";

export const createIdea = (uid: string, idea: Idea) => {
  const ref = doc(db, `users/${uid}/ideas/${idea.id}`);
  setDoc(ref, idea);
};

export const getIdea = async (uid: string, iid: string) => {
  const ref = doc(db, `users/${uid}/ideas/${iid}`);
  const snap = await getDoc(ref);
  const idea = snap.data() as Idea;
  return idea;
};

export const getIdeas = async () => {
  const ideaRef = collectionGroup(db, "ideas");
  const q = query(ideaRef, orderBy("updatedAt", "desc"));
  const snap = await getDocs(q);
  const ideas = snap.docs.map((doc) => doc.data() as Idea);
  return ideas;
};

export const updateIdea = (uid: string, iid: string, data: Partial<Omit<Idea, "id" | "createdAt">>): Promise<void> => {
  const ref = doc(db, `users/${uid}/ideas/${iid}`);
  return updateDoc(ref, { ...data, updatedAt: Date.now() });
};
