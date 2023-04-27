import UserCard from "@/components/card/user-card";
import Loading from "@/components/loading";
import { useAuth } from "@/context/auth";
import { getUserByUsername } from "@/lib/user";
import { User } from "@/types/user";
import { NextPage } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

type UserContextType = User | null | undefined;

const MyPage: NextPage = () => {
  const [user, setUser] = useState<UserContextType>();
  const authUser = useAuth();

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

  return (
    <>
      <Head>
        <title>スゴデア | {user.name}</title>
        <meta name="description" content={`${user.name}のページ ${user.bio}`} />
      </Head>
      <UserCard isMe={authUser?.id === user.id} user={user} />
    </>
  );
};

export default MyPage;
