import Avatar from "@/components/avatar";
import { useAuth } from "@/context/auth";
import { db } from "@/firebase/client";
import { User } from "@/types/user";
import { Query, collection, getDocs, query, where } from "firebase/firestore";
import { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import ReactLoading from "react-loading";

type UserContextType = User | null | undefined;

const MyPage: NextPage = () => {
  const [user, setUser] = useState<UserContextType>();
  const authUser = useAuth();
  const [isMe, setIsMe] = useState(false);

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

  useEffect(() => {
    if (authUser && user) {
      setIsMe(authUser.id === user.id);
    }
  }, [authUser, user]);

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

  return (
    <div className="w-full mt-10">
      <div className="flex gap-x-10">
        <div className="w-36 h-36">
          <Avatar src={user.photoUrl} expands />
        </div>
        <div>
          <div className="font-bold text-2xl">{user.name}</div>
          <div>{user.bio}</div>
        </div>
      </div>
    </div>
  );
};

export default MyPage;
