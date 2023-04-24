import SettingCard from "@/components/card/setting-card";
import SettingImageCard from "@/components/card/setting-image-card";
import { db } from "@/firebase/client";
import UserGuard from "@/guards/user-guard";
import { updateUser } from "@/lib/user";
import { uploadImage } from "@/utils/storage";
import { Query, collection, getDocs, query, where } from "firebase/firestore";
import { NextPage } from "next";
import { useForm } from "react-hook-form";
import isEmail from "validator/lib/isEmail";

const Settings: NextPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  return (
    <UserGuard>
      {(user) => {
        return (
          <div className="flex flex-col gap-y-5">
            <SettingCard
              title="ユーザー名"
              description="Sugodeaであなたを表す名前空間に使われます"
              subtitle="48文字以下にしてください"
              onSubmit={handleSubmit((data) =>
                updateUser(user.id, {
                  username: data.username,
                })
              )}
              register={register("username", {
                required: "ユーザー名を入力してください",
                pattern: {
                  value: /^[a-zA-Z0-9_]+$/,
                  message: "ユーザー名には英数字とアンダースコア(_)のみ使えます",
                },
                validate: async (value) => {
                  if (value.length > 48) return "48文字を超えています";
                  if (value === user.username) return true;

                  const usersRef = collection(db, "users");
                  const q: Query = query(usersRef, where("username", "==", value));
                  const snap = await getDocs(q);
                  if (!snap.empty) return "このユーザー名は既に使われています";

                  return true;
                },
              })}
              defaultValue={user.username}
              error={errors.username?.message?.toString()}
            />
            <SettingCard
              title="名前"
              description="本名もしくは好きな名前を入力してください"
              subtitle="32文字以下にしてください"
              onSubmit={handleSubmit((data) =>
                updateUser(user.id, {
                  name: data.name,
                })
              )}
              register={register("name", {
                required: "名前を入力してください",
                validate: (value) => value.length <= 32 || "32文字を超えています",
              })}
              defaultValue={user.name}
              error={errors.name?.message?.toString()}
            />
            <SettingImageCard
              title="プロフィール画像"
              description="下の画像をクリックするとプロフィール画像を変更できます"
              subtitle="やっぱり画像があると親しみやすくなります"
              onSubmit={(value) => {
                uploadImage(`users/${user.id}/avatar`, value)
                  .then((url) =>
                    updateUser(user.id, {
                      photoUrl: url,
                    })
                  )
                  .catch((err) => console.log(err));
              }}
              defaultValue={user.photoUrl}
              error={errors.avatar?.message?.toString()}
            />
            <SettingCard
              title="メールアドレス"
              description="Sugodeaにログインする時に使います"
              subtitle="更新する前にメールアドレスの確認を行います"
              onSubmit={handleSubmit((data) =>
                updateUser(user.id, {
                  email: data.email,
                })
              )}
              register={register("email", {
                required: "ユーザー名を入力してください",
                validate: (value) => isEmail(value) || "メールアドレスが正しくありません",
              })}
              defaultValue={user.email}
              error={errors.email?.message?.toString()}
            />
            <SettingCard
              title="自己紹介"
              description="あなたを100文字以内で簡潔に表してください"
              subtitle="100文字以内にしてください"
              onSubmit={handleSubmit((data) =>
                updateUser(user.id, {
                  bio: data.bio,
                })
              )}
              register={register("bio", {
                required: "ユーザー名を入力してください",
                validate: (value) => value.length <= 100 || "100文字を超えています",
              })}
              defaultValue={user.bio ?? ""}
              error={errors.bio?.message?.toString()}
            />
          </div>
        );
      }}
    </UserGuard>
  );
};

export default Settings;
