import { User } from "@/types/user";
import Link from "next/link";
import { FC } from "react";
import Button from "../button";
import Card from "./card";

type Props = {
  isMe: boolean;
  user: User;
};
const UserCard: FC<Props> = ({ isMe, user }) => {
  const creationDate = new Date(user.createdAt);

  return (
    <Card
      showsSidebar={isMe}
      sidebar={
        <div className="flex justify-end items-center">
          <Link href="/settings/profile">
            <Button>プロフィールを編集</Button>
          </Link>
        </div>
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
  );
};

export default UserCard;
