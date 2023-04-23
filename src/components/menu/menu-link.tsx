import Link from "next/link";
import { ReactNode } from "react";

const MenuLink = ({ href, children, ...rest }: { href: string; children: ReactNode }) => {
  return (
    <Link href={href}>
      <div {...rest}>{children}</div>
    </Link>
  );
};

export default MenuLink;
