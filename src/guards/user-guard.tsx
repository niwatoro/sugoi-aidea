import { useAuth } from "@/context/auth";
import { User } from "@/types/user";
import { useRouter } from "next/router";
import { FC, ReactNode } from "react";
import ReactLoading from "react-loading";

type Props = {
  children: ((user: User) => ReactNode) | ReactNode;
};

const UserGuard: FC<Props> = ({ children }) => {
  const user = useAuth();
  const router = useRouter();

  if (user === null) {
    if (router.pathname !== "/") {
      router.push("/");
    }
    return null;
  }

  if (user === undefined) {
    return (
      <div className="h-full w-full flex flex-col justify-center items-center">
        <ReactLoading color="black" type="spinningBubbles" />
      </div>
    );
  }

  if (typeof children == "function") {
    return <>{children(user)}</>;
  } else {
    return <>{children}</>;
  }
};

export default UserGuard;
