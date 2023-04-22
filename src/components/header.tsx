import { useAuth } from "@/context/auth";
import { login } from "@/lib/auth";
import Link from "next/link";
import { FC, useState } from "react";

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
    <header className="h-16 flex items-center justify-between px-8">
      <Link href={"/"}>
        <div className="font-logo text-xl">SugoiAidea</div>
      </Link>
      <div>{user === null ? !isWaiting ? <button onClick={signIn}>ログイン</button> : null : <button>ユーザーメニュー</button>}</div>
    </header>
  );
};

export default Header;
