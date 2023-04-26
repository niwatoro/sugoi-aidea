import { createIdea } from "@/lib/idea";
import { Idea, statusItems } from "@/types/idea";
import { User } from "@/types/user";
import { generateRandomString } from "@/utils/generate-random-string";
import { uploadImage } from "@/utils/storage";
import { PhotoIcon } from "@heroicons/react/24/solid";
import { FC, useState } from "react";
import { useForm } from "react-hook-form";
import Button from "../button";
import ImageField from "../field/image-field";
import InputField from "../field/input-field";
import TextareaField from "../field/textarea-field";
import Select, { ListItemProps } from "../select";
import Card from "./card";

type Props = {
  authUser: User;
};
const NewIdeaCard: FC<Props> = ({ authUser }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [status, setStatus] = useState<ListItemProps>(statusItems[0]);
  const [images, setImages] = useState<(string | null)[]>([null, null, null]);

  const [showsAddImage, setShowsAddImage] = useState(false);

  return (
    <form
      onSubmit={handleSubmit((data) => {
        const iid = generateRandomString(10);

        const thumbnails: string[] = [];
        images.forEach(async (image, index) => {
          if (image === null) return;
          const url = await uploadImage(`users/${authUser.id}/ideas/${iid}/${index}`, image);
          thumbnails.push(url);
        });

        const date = Date.now();
        const idea: Idea = {
          id: iid,
          title: data.title,
          description: data.description ?? "",
          status: status.id as Idea["status"],
          createdAt: date,
          updatedAt: date,
          inventor: authUser.id,
          members: [authUser.id],
          thumbnails: thumbnails,
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
            placeholder="アイデアを50文字以内で簡潔に説明してください"
            error={errors.title?.message?.toString()}
          />
          <Select value={status} onChange={(newStatus) => setStatus(newStatus)} items={statusItems} />
          <TextareaField
            label=""
            register={register("description", {
              required: "必ず入力してください",
              validate: (v) => v.length <= 1000 || "1000文字以内で入力してください",
            })}
            placeholder="アイデアについて思う存分語ってみましょう"
            error={errors.description?.message?.toString()}
          />
          {showsAddImage ? (
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
          ) : (
            <button className="w-10 h-10 border border-slate-300 rounded-full p-2" onClick={() => setShowsAddImage(true)}>
              <PhotoIcon />
            </button>
          )}
        </div>
      </Card>
    </form>
  );
};

export default NewIdeaCard;
