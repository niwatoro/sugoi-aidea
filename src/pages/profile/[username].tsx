import UserCard from "@/components/card/user-card";
import { db } from "@/firebase/client";
import UserGuard from "@/guards/user-guard";
import { User } from "@/types/user";
import { Query, collection, getDocs, query, where } from "firebase/firestore";
import { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import ReactLoading from "react-loading";

type UserContextType = User | null | undefined;

const MyPage: NextPage = () => {
  const [user, setUser] = useState<UserContextType>();

  const router = useRouter();
  const username = router.query.username;

  const fetchUser = async () => {
    const usersRef = collection(db, "users");
    const q: Query = query(usersRef, where("username", "==", username));
    const snap = await getDocs(q);
    if (snap.empty) {
      router.push("/");
      return;
    }
    const appUser = snap.docs[0].data() as User;
    setUser(appUser);
  };

  useEffect(() => {
    if (username !== undefined) {
      fetchUser();
    }
  }, [username]);

  if (user === null) {
    if (router.pathname !== "/") {
      router.push("/");
    }
    return null;
  }

  if (user === undefined) {
    return (
      <div className="h-screen flex flex-col justify-center">
        <ReactLoading color="black" type="spinningBubbles" />
      </div>
    );
  }

  return <UserGuard>{(authUser) => <UserCard isMe={authUser.id === user.id} user={user} />}</UserGuard>;
};

export default MyPage;
