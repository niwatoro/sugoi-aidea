import SettingCard from "@/components/card/setting-card";
import { db } from "@/firebase/client";
import UserGuard from "@/guards/user-guard";
import { Query, collection, getDocs, query, where } from "firebase/firestore";
import { NextPage } from "next";
import { useForm } from "react-hook-form";

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
          <div>
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
          </div>
        );
      }}
    </UserGuard>
  );
};

export default Settings;
