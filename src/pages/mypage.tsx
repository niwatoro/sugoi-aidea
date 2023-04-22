import UserGuard from "@/guards/user-guard";
import { NextPage } from "next";

const MyPage: NextPage = () => {
  return <UserGuard>{(user) => <div>{user.name}</div>}</UserGuard>;
};

export default MyPage;
