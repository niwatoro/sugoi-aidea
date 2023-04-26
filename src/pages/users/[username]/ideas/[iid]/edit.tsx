import SettingCard from "@/components/card/setting-card";
import SettingSelectCard from "@/components/card/setting-select-card";
import SettingTextareaImageCard from "@/components/card/setting-textarea-image-card";
import Loading from "@/components/loading";
import UserGuard from "@/guards/user-guard";
import { getIdea, updateIdea } from "@/lib/idea";
import { getUserByUsername } from "@/lib/user";
import { Idea } from "@/types/idea";
import { User } from "@/types/user";
import { uploadImage } from "@/utils/storage";
import { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import isURL from "validator/lib/isURL";

type UserContextType = User | null | undefined;
const Edit: NextPage = () => {
  const router = useRouter();
  const username = router.query.username;
  const iid = router.query.iid;

  if (iid === null) {
    router.push("/");
    return null;
  }

  const [idea, setIdea] = useState<Idea>();
  const [user, setUser] = useState<UserContextType>();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    if (username !== undefined && iid !== undefined) {
      getUserByUsername(username.toString()).then((user) => setUser(user));
    }
  }, []);

  useEffect(() => {
    if (user !== undefined && user !== null && iid !== undefined) {
      getIdea(user.id, iid.toString()).then((idea) => setIdea(idea));
    }
  }, [user]);

  return (
    <UserGuard>
      {(authUser) => {
        if (idea === undefined || user === undefined) {
          return <Loading />;
        }

        if (idea === null || user === null || authUser.id !== user.id) {
          router.push("/");
          return null;
        }

        return (
          <div className="flex flex-col gap-y-5">
            <SettingCard
              title="概要"
              subtitle="50文字以内にしてください"
              description="アイデアを超簡潔に説明してください"
              onSubmit={handleSubmit((data) => {
                updateIdea(user.id, idea.id, {
                  title: data.title,
                });
              })}
              register={register("title", {
                required: "概要を入力してください",
                validate: (value) => value.length <= 50 || "50文字を超えています",
              })}
              defaultValue={idea.title}
              error={errors.title?.message?.toString()}
            />
            <SettingSelectCard
              title="実現段階"
              subtitle="アイデアはどこまで形になっていますか？"
              description="絵に描いた餅🖼️　まだ触れるものは何も作っていない¥n実証実験中🧪　　ユーザー体験を想像/実感できるプレトタイプを作った¥nリリース済🚀　　既に顧客へ売り出している"
              onSubmit={(data) => {
                updateIdea(user.id, idea.id, {
                  status: data as "brainstorm" | "pretotype" | "released",
                });
              }}
              defaultValue={idea.status}
              error={errors.title?.message?.toString()}
            />
            <SettingTextareaImageCard
              title="説明"
              subtitle="1000文字以内にしてください"
              description="アイデアを1000文字と画像3枚で説明してください"
              onSubmit={handleSubmit((data) => {
                updateIdea(user.id, idea.id, {
                  description: data.description,
                });
              })}
              submitImages={(images) => {
                const thumbnails: string[] = [];
                images.forEach(async (image, index) => {
                  if (image === null) return;
                  const url = isURL(image) ? image : await uploadImage(`users/${user.id}/ideas/${iid}/${index}`, image);
                  thumbnails.push(url);

                  if (thumbnails.length === images.length) {
                    updateIdea(user.id, idea.id, {
                      thumbnails: thumbnails,
                    });
                  }
                });
              }}
              register={register("description", {
                required: "説明を入力してください",
                validate: (value) => value.length <= 1000 || "1000文字を超えています",
              })}
              defaultValue={idea.description}
              defaultImages={idea.thumbnails}
              error={errors.description?.message?.toString()}
            />
          </div>
        );
      }}
    </UserGuard>
  );
};

export default Edit;
