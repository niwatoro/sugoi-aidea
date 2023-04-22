import Link from "next/link";
import { FC } from "react";

const Header: FC = () => {
  return (
    <header>
      <h1>
        <Link href={"/"}>
          <div className="font-logo">SUGOI-AIDEA</div>
        </Link>
      </h1>
    </header>
  );
};

export default Header;
