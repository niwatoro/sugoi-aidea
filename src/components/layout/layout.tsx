import { FC, ReactNode } from "react";
import Footer from "./footer";
import Header from "./header";

type Props = { children: ReactNode };

const Layout: FC<Props> = ({ children }) => {
  return (
    <div>
      <Header />
      <main className="w-screen min-h-screen bg-gray-50 flex justify-center">
        <div className="w-[800px]">{children}</div>
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
