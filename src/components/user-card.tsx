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
    <div className="w-[800px] p-5">
      <div className="w-full h-48 flex justify-between rounded-md border border-gray-200 bg-white overflow-hidden">
        <div className="flex">
          <img className="h-full" src={user.photoUrl} />
          <div className="flex flex-col p-5">
            <div className="font-extrabold text-2xl">{user.name}</div>
            <div className="text-gray-500 flex-1 flex flex-col">
              <div>@{user.username}</div>
              <div className="text-black flex flex-1 items-center">{user.bio}</div>
              <div>
                {creationDate.getFullYear()}年{creationDate.getMonth()}月から利用中
              </div>
            </div>
          </div>
        </div>
        {isMe && (
          <div className="p-5">
            <Button>編集</Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserCard;
