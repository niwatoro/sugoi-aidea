import { useAuth } from "@/context/auth";
import { login } from "@/lib/auth";
import { classNames } from "@/lib/class-names";
import Link from "next/link";
import { useRouter } from "next/router";
import { FC, ReactNode, useState } from "react";
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
    <header className="fixed z-30 w-full border-b border-slate-200 bg-white">
      <div className="h-full flex items-center justify-between px-8 py-2">
        <Link href={"/"}>
          <div className="font-logo text-xl">Sugodea</div>
        </Link>
        <div className="flex items-center h-full">{user === null ? !isWaiting ? <Button onClick={signIn}>ログイン</Button> : <ButtonOnLoading /> : <UserMenu />}</div>
      </div>
      <div className="flex gap-x-3 bg-slate-50 border-t border-slate-200 px-8">
        <HeaderLink href="/">アイデア</HeaderLink>
        <HeaderLink href="/users">ユーザー</HeaderLink>
      </div>
    </header>
  );
};

type HeaderLinkProps = {
  children: ReactNode;
  href: string;
};
const HeaderLink: FC<HeaderLinkProps> = ({ children, href }) => {
  const router = useRouter();
  return (
    <div className={classNames("h-full w-28 py-1 px-3 flex justify-center items-center border-b-2", router.pathname === href ? "border-black" : "border-transparent")}>
      <Link href={href} className="hover:bg-slate-200 w-full h-full p-1 flex justify-center items-center rounded-sm">
        {children}
      </Link>
    </div>
  );
};

export default Header;
