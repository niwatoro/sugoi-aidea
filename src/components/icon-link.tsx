import Link from "next/link";
import { FC, ReactNode } from "react";

type Props = {
  href: string;
  icon: ReactNode;
};

const IconLink: FC<Props> = ({ href, icon }) => {
  return (
    <Link href={href} target="_blank">
      {icon}
    </Link>
  );
};

export default IconLink;
