import { User } from "@/types/user";
import { FC } from "react";
import Button from "./button";

type Props = {
  isMe: boolean;
  user: User;
};
const UserCard: FC<Props> = ({ isMe, user }) => {
  const creationDate = new Date(user.createdAt);

  return (
    <div className="w-full rounded-md border border-slate-300 bg-white overflow-hidden">
      <div className="h-48 flex justify-between">
        <div className="flex">
          <img className="h-full" src={user.photoUrl} />
          <div className="flex flex-col p-5">
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
      </div>
      {isMe && (
        <div className="w-full border-t border-slate-300 bg-slate-50 py-3 px-6 flex justify-end items-center">
          <Button>プロフィールを編集</Button>
        </div>
      )}
    </div>
  );
};

export default UserCard;
