import { db } from "@/firebase/client";
import { Idea } from "@/types/idea";
import { User } from "@/types/user";
import { collection, doc, getDoc, getDocs, setDoc, updateDoc } from "firebase/firestore";

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

export const getIdeas = async (user: User) => {
  const ideas: Idea[] = [];
  const ideaRef = collection(db, `users/${user.id}/ideas`);
  const ideaSnap = await getDocs(ideaRef);
  ideaSnap.forEach((doc) => {
    const idea = doc.data() as Idea;
    ideas.push(idea);
  });
  return ideas;
};

export const updateIdea = (uid: string, iid: string, data: Partial<Omit<Idea, "id" | "createdAt">>): Promise<void> => {
  const ref = doc(db, `users/${uid}/ideas/${iid}`);
  return updateDoc(ref, { ...data, updatedAt: Date.now() });
};
