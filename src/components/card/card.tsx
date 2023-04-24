import { FC, ReactNode } from "react";

type Props = {
  children: ReactNode;
  showsSidebar?: boolean;
  sidebar?: ReactNode;
};
const Card: FC<Props> = ({ children, showsSidebar, sidebar }) => {
  return (
    <div className="w-full rounded-md border border-slate-200 bg-white overflow-hidden">
      {children}
      {showsSidebar && <div className="w-full border-t border-slate-200 bg-slate-50 py-3 px-8">{sidebar}</div>}
    </div>
  );
};

export default Card;
