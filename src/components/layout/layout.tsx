import { FC, ReactNode } from "react";
import Footer from "./footer";
import Header from "./header";

type Props = { children: ReactNode };

const Layout: FC<Props> = ({ children }) => {
  return (
    <div className="bg-slate-100">
      <Header />
      <main className="w-screen min-h-screen flex justify-center">
        <div className="w-[800px] py-8">{children}</div>
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
