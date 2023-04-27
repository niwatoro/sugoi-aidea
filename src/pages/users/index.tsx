import UserCard from "@/components/card/user-card";
import { useAuth } from "@/context/auth";
import { getUsers } from "@/lib/user";
import { User } from "@/types/user";
import { NextPage } from "next";
import { useEffect, useState } from "react";

const Users: NextPage = () => {
  const [users, setUsers] = useState<User[]>([]);
  const authUser = useAuth();

  useEffect(() => {
    getUsers().then((users) => setUsers(users));
  }, []);

  return (
    <div className="flex flex-col gap-y-3">
      {users.map((user, index) => (
        <UserCard key={index} isMe={authUser?.id === user.id} user={user} />
      ))}
    </div>
  );
};

export default Users;
