import UserCard from "@/components/card/user-card";
import Loading from "@/components/loading";
import UserGuard from "@/guards/user-guard";
import { getUserByUsername } from "@/lib/user";
import { User } from "@/types/user";
import { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

type UserContextType = User | null | undefined;

const MyPage: NextPage = () => {
  const [user, setUser] = useState<UserContextType>();

  const router = useRouter();
  const username = router.query.username;

  useEffect(() => {
    if (username !== undefined) {
      getUserByUsername(username.toString()).then((user) => setUser(user));
    }
  }, [username]);

  if (user === null) {
    if (router.pathname !== "/") {
      router.push("/");
    }
    return null;
  }

  if (user === undefined) {
    return <Loading />;
  }

  return <UserGuard>{(authUser) => <UserCard isMe={authUser.id === user.id} user={user} />}</UserGuard>;
};

export default MyPage;
