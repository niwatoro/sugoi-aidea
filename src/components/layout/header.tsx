import { useAuth } from "@/context/auth";
import { login } from "@/lib/auth";
import Link from "next/link";
import { FC, useState } from "react";
import Button, { ButtonOnLoading } from "../button";
import UserMenu from "../menu/user-menu";

const Header: FC = () => {
  const user = useAuth();
  const [isWaiting, setIsWaiting] = useState(false);

  const signIn = () => {
    setIsWaiting(true);

    login()
      .catch((error) => console.error(error?.message))
      .finally(() => setIsWaiting(false));
  };

  return (
    <header className="h-16 flex items-center justify-between px-8 border-b border-gray-200 bg-white">
      <Link href={"/"}>
        <div className="font-logo text-xl">Sugodea</div>
      </Link>
      <div>{user === null ? !isWaiting ? <Button onClick={signIn}>ログイン</Button> : <ButtonOnLoading /> : <UserMenu />}</div>
    </header>
  );
};

export default Header;
