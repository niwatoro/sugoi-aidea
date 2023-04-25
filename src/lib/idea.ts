import { db } from "@/firebase/client";
import { Idea } from "@/types/idea";
import { User } from "@/types/user";
import { collection, doc, getDocs, setDoc } from "firebase/firestore";

export const createIdea = (uid: string, idea: Idea) => {
  const ref = doc(db, `users/${uid}/ideas/${idea.id}`);
  setDoc(ref, idea);
};

export const getIdeas = async (users: User[]) => {
  const uids = users.map((user) => user.id);

  const ideas: Idea[] = [];
  for (const uid of uids) {
    const ideaRef = collection(db, `users/${uid}/ideas`);
    const ideaSnap = await getDocs(ideaRef);
    ideaSnap.forEach((doc) => {
      const idea = doc.data() as Idea;
      ideas.push(idea);
    });
  }
  return ideas;
};
