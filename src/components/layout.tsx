import { FC, ReactNode } from "react";
import Header from "./header";

type Props = { children: ReactNode };

const Layout: FC<Props> = ({ children }) => {
  return (
    <div>
      <Header />
      <main>{children}</main>
    </div>
  );
};

export default Layout;
