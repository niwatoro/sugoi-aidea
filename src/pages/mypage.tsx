import Avatar from "@/components/avatar";
import UserGuard from "@/guards/user-guard";
import { NextPage } from "next";

const MyPage: NextPage = () => {
  return (
    <UserGuard>
      {(user) => (
        <div className="w-full mt-10">
          <div className="flex gap-x-10">
            <div className="w-36 h-36">
              <Avatar src={user.photoUrl} expands />
            </div>
            <div>
              <div className="font-bold text-2xl">{user.name}</div>
              <div>{user.bio}</div>
            </div>
          </div>
        </div>
      )}
    </UserGuard>
  );
};

export default MyPage;
