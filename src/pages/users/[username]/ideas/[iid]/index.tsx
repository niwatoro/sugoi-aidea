import IdeaCard from "@/components/card/idea-card";
import Loading from "@/components/loading";
import { useAuth } from "@/context/auth";
import { getIdea } from "@/lib/idea";
import { getUserByUsername } from "@/lib/user";
import { Idea } from "@/types/idea";
import { User } from "@/types/user";
import { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

type UserContextType = User | null | undefined;
type IdeaContextType = Idea | null | undefined;

const IdeaPage: NextPage = () => {
  const [idea, setIdea] = useState<IdeaContextType>();
  const [user, setUser] = useState<UserContextType>();
  const authUser = useAuth();

  const router = useRouter();
  const username = router.query.username;
  const iid = router.query.iid;

  useEffect(() => {
    if (username !== undefined && iid !== undefined) {
      getUserByUsername(username.toString()).then((user) => setUser(user));
    }
  }, [username]);

  useEffect(() => {
    if (user !== undefined && user !== null && iid !== undefined) {
      getIdea(user.id, iid.toString()).then((idea) => setIdea(idea));
    }
  }, [user]);

  if (user === null || idea === null) {
    if (router.pathname !== "/") {
      router.push("/");
    }
    return null;
  }

  if (user === undefined || idea === undefined) {
    return <Loading />;
  }

  return <IdeaCard isMe={authUser?.id === user.id} user={user} idea={idea} />;
};

export default IdeaPage;
