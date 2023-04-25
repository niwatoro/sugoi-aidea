import Avatar from "@/components/avatar";
import Button from "@/components/button";
import Card from "@/components/card/card";
import ImageField from "@/components/field/image-field";
import InputField from "@/components/field/input-field";
import TextareaField from "@/components/field/textarea-field";
import Select, { ListItemProps } from "@/components/select";
import { useAuth } from "@/context/auth";
import { createIdea, getIdeas } from "@/lib/idea";
import { getUsers } from "@/lib/user";
import { Idea, statusItems } from "@/types/idea";
import { User } from "@/types/user";
import { generateRandomString } from "@/utils/generate-random-string";
import { NextPage } from "next";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

const Home: NextPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [status, setStatus] = useState<ListItemProps>(statusItems[0]);
  const [images, setImages] = useState<(string | null)[]>([null, null, null]);

  const authUser = useAuth();
  const [users, setUsers] = useState<User[]>([]);
  const [ideas, setIdeas] = useState<Idea[]>([]);

  useEffect(() => {
    getUsers().then((users) => setUsers(users));
  }, []);

  useEffect(() => {
    getIdeas(users).then((ideas) => setIdeas(ideas));
  }, [users]);

  return (
    <div className="flex flex-col gap-y-6">
      {authUser && (
        <form
          onSubmit={handleSubmit((data) => {
            const date = Date.now();
            const id = generateRandomString(10);
            const idea: Idea = {
              id: id,
              title: data.title,
              description: data.description ?? "",
              status: status.id as Idea["status"],
              createdAt: date,
              updatedAt: date,
              inventor: authUser.id,
              members: [authUser.id],
            };
            createIdea(authUser.id, idea);
          })}
        >
          <Card
            showsSidebar
            sidebar={
              <div className="flex justify-end">
                <Button type="submit">投稿</Button>
              </div>
            }
          >
            <div className="p-8 flex flex-col gap-y-3">
              <div className="font-bold text-2xl">新しいアイデアを投稿する</div>
              <InputField
                label=""
                register={register("title", {
                  required: "必ず入力してください",
                })}
                placeholder="アイデアを50字以内で簡潔に説明してください"
                error={errors.title?.message?.toString()}
              />
              <Select value={status} onChange={(newStatus) => setStatus(newStatus)} items={statusItems} />
              <TextareaField
                label=""
                register={register("description", {
                  required: "必ず入力してください",
                })}
                placeholder="アイデアについて思う存分語ってみましょう"
                error={errors.description?.message?.toString()}
              />
              <div className="flex gap-x-3">
                {Array.from({ length: 3 }).map((_, index) => (
                  <ImageField
                    key={index}
                    setter={(v) =>
                      setImages((images) => {
                        if (v === undefined) return images.filter((_, i) => i !== index);
                        const newList = [...images];
                        newList[index] = v!;
                        return newList;
                      })
                    }
                    size={{ width: 600, height: 600 }}
                    aspect={1}
                  />
                ))}
              </div>
            </div>
          </Card>
        </form>
      )}
      {ideas.map((idea) => {
        const user = users.find((user) => user.id === idea.inventor)!;
        const creationDate = new Date(idea.createdAt);
        const updateDate = new Date(idea.updatedAt);
        return (
          <Card key={idea.id}>
            <div className="p-8 flex flex-col gap-y-3">
              <div className="font-extrabold text-2xl">{idea.title}</div>
              <Link href={`users/${user.username}`} className="flex items-center gap-x-2 hover:bg-slate-200 rounded-sm p-1">
                <div className="w-12 h-12">
                  <Avatar expands src={user.photoUrl} />
                </div>
                {user.name}
              </Link>
              <div className="text-slate-500 flex-1 flex flex-col gap-y-3">
                <div>{idea.description}</div>
                <div className="flex flex-col">
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
        );
      })}
    </div>
  );
};

export default Home;
