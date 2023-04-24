import SettingCard from "@/components/card/setting-card";
import { db } from "@/firebase/client";
import UserGuard from "@/guards/user-guard";
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
              onSubmit={handleSubmit((data) => console.log(data))}
              registerReturn={register("username", {
                required: "ユーザー名を入力してください",
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
              description="Sugodeaであなたを表す名前空間に使われます"
              subtitle="48文字以下にしてください"
              onSubmit={handleSubmit((data) => console.log(data))}
              registerReturn={register("name", {
                required: "名前を入力してください",
                validate: (value) => value.length <= 48 || "48文字を超えています",
              })}
              defaultValue={user.name}
              error={errors.name?.message?.toString()}
            />
            <SettingCard
              title="メールアドレス"
              description="Sugodeaであなたを表す名前空間に使われます"
              subtitle="48文字以下にしてください"
              onSubmit={handleSubmit((data) => console.log(data))}
              registerReturn={register("email", {
                required: "ユーザー名を入力してください",
                validate: (value) => isEmail(value) || "メールアドレスが正しくありません",
              })}
              defaultValue={user.email}
              error={errors.email?.message?.toString()}
            />
            <SettingCard
              title="自己紹介"
              description="Sugodeaであなたを表す名前空間に使われます"
              subtitle="100文字以下にしてください"
              onSubmit={handleSubmit((data) => console.log(data))}
              registerReturn={register("bio", {
                required: "ユーザー名を入力してください",
                validate: (value) => value.length <= 200 || "100文字を超えています",
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
