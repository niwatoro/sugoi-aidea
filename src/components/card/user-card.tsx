import { User } from "@/types/user";
import Link from "next/link";
import { useRouter } from "next/router";
import { FC } from "react";
import Button from "../button";
import Card from "./card";

type Props = {
  isMe: boolean;
  user: User;
};
const UserCard: FC<Props> = ({ isMe, user }) => {
  const creationDate = new Date(user.createdAt);
  const router = useRouter();

  return (
    <Link href={`/users/${user.username}`}>
      <Card
        showsSidebar
        sidebar={
          isMe ? (
            <div className="flex justify-end items-center">
              <Link href="/settings/profile">
                <Button>プロフィールを編集</Button>
              </Link>
            </div>
          ) : (
            <div className="flex justify-between items-center">
              <div>メーラーが起動します</div>
              <Button onClick={() => router.push(`mailto:${user.email}?subject=スゴデアから連絡`)}>連絡する</Button>
            </div>
          )
        }
      >
        <div className="h-48 flex">
          <img className="h-full" src={user.photoUrl} />
          <div className="flex flex-col px-5 py-8">
            <div className="font-extrabold text-2xl">{user.name}</div>
            <div className="text-slate-500 flex-1 flex flex-col">
              <div>@{user.username}</div>
              <div className="text-black flex flex-1 items-center">{user.bio}</div>
              <div>
                {creationDate.getFullYear()}年{creationDate.getMonth()}月から利用中
              </div>
            </div>
          </div>
        </div>
      </Card>
    </Link>
  );
};

export default UserCard;
