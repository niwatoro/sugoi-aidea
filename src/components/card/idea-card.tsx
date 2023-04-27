import { classNames } from "@/lib/class-names";
import { Idea, statusItems } from "@/types/idea";
import { User } from "@/types/user";
import Link from "next/link";
import { FC, useState } from "react";
import Avatar from "../avatar";
import Button from "../button";
import ImageModal from "../modal/image-modal";
import Card from "./card";

type Props = {
  idea: Idea;
  user: User;
  isMe: boolean;
};
const IdeaCard: FC<Props> = ({ idea, user, isMe }) => {
  const status = statusItems.find((item) => item.id === idea.status);

  const creationDate = new Date(idea.createdAt);
  const updateDate = new Date(idea.updatedAt);

  const [isOpens, setIsOpens] = useState([false, false, false]);

  return (
    <Link href={`/users/${user.username}/ideas/${idea.id}`}>
      <Card
        key={idea.id}
        showsSidebar={isMe}
        sidebar={
          <div className="flex justify-end">
            <Link href={`/users/${user.username}/ideas/${idea.id}/edit`}>
              <Button>編集</Button>
            </Link>
          </div>
        }
      >
        <div className="p-8 flex flex-col gap-y-3">
          <div className="flex items-center gap-x-3">
            <div className="font-extrabold text-2xl">{idea.title}</div>
            <div className={classNames("border rounded-full w-32 min-w-[128px] p-1 text-sm text-center", status?.id === "brainstorm" && "border-yellow-500 text-yellow-500", status?.id === "pretotype" && "border-green-500 text-green-500", status?.id === "released" && "border-red-500 text-red-500")}>{status?.name}</div>
          </div>
          <Link href={`/users/${user.username}`} className="flex items-center gap-x-2 hover:bg-slate-200 rounded-sm p-1">
            <div className="w-12 h-12">
              <Avatar expands src={user.photoUrl} />
            </div>
            {user.name}
          </Link>
          <div className="flex-1 flex flex-col gap-y-3">
            <div>{idea.description}</div>
            {idea.thumbnails.length > 0 && (
              <div className="h-80 w-full flex gap-x-3">
                {idea.thumbnails.map((thumbnail, index) => (
                  <div key={index} className="h-full max-w-[calc(33%-8px)]">
                    <button className="h-full" onClick={() => setIsOpens((opens) => opens.map((open, i) => (i === index ? true : false)))}>
                      <img key={index} src={thumbnail} className="object-contain h-full w-full" />
                    </button>
                    <ImageModal isOpen={isOpens[index]} onClose={() => setIsOpens((opens) => opens.map(() => false))} src={thumbnail} />
                  </div>
                ))}
              </div>
            )}
            <div className="text-slate-500 flex flex-col">
              <div>
                {creationDate.getFullYear()}年{creationDate.getMonth()}月{creationDate.getDate()}日作成
              </div>
              <div>
                {updateDate.getFullYear()}年{updateDate.getMonth()}月{updateDate.getDate()}日更新
              </div>
            </div>
          </div>
        </div>
      </Card>
    </Link>
  );
};

export default IdeaCard;
