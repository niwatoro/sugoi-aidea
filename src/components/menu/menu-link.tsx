import Link from "next/link";
import { ReactNode, forwardRef } from "react";

const MenuLink = forwardRef(({ href, children, ...rest }: { href: string; children: ReactNode }) => {
  return (
    <Link href={href}>
      <div {...rest}>{children}</div>
    </Link>
  );
});

export default MenuLink;
