import IdeaCard from "@/components/card/idea-card";
import NewIdeaCard from "@/components/card/new-idea-card";
import { useAuth } from "@/context/auth";
import { getIdeas } from "@/lib/idea";
import { getUsers } from "@/lib/user";
import { Idea } from "@/types/idea";
import { User } from "@/types/user";
import { NextPage } from "next";
import Head from "next/head";
import { useEffect, useState } from "react";

const Home: NextPage = () => {
  const authUser = useAuth();
  const [users, setUsers] = useState<User[]>([]);
  const [ideas, setIdeas] = useState<Idea[]>([]);

  useEffect(() => {
    getUsers().then((users) => setUsers(users));
  }, []);

  useEffect(() => {
    const uids = users.map((user) => user.id);
    const allUsersIdeas: Idea[] = [];
    for (const user of users) {
      getIdeas(user).then((userIdeas) => {
        allUsersIdeas.push(...userIdeas);
        if (allUsersIdeas.length === uids.length) {
          setIdeas(allUsersIdeas);
        }
      });
    }
  }, [users]);

  return (
    <>
      <Head>
        <title>スゴデア | 思いついたすごいアイデアを投稿できるSNS</title>
      </Head>
      <div className="flex flex-col gap-y-6">
        {authUser && <NewIdeaCard authUser={authUser} />}
        {ideas.map((idea, index) => {
          const user = users.find((user) => user.id === idea.inventor)!;
          return <IdeaCard key={index} idea={idea} user={user} isMe={authUser?.id === user.id} />;
        })}
      </div>
    </>
  );
};

export default Home;
