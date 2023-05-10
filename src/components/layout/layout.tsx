import { FC, ReactNode } from "react";
import Footer from "./footer";
import { GoogleAnalytics } from "./google-analytics";
import Header from "./header";

type Props = { children: ReactNode };

const Layout: FC<Props> = ({ children }) => {
  return (
    <div className="bg-slate-200">
      <Header />
      <GoogleAnalytics gaTrackingId={process.env.GA_TRACKING_ID!} />
      <main className="w-screen min-h-screen flex justify-center pt-24">
        <div className="w-[800px] py-8">{children}</div>
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
