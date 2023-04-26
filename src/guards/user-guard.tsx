import Loading from "@/components/loading";
import { useAuth } from "@/context/auth";
import { login } from "@/lib/auth";
import { User } from "@/types/user";
import { useRouter } from "next/router";
import { FC, ReactNode, useState } from "react";

type Props = {
  children: ((user: User) => ReactNode) | ReactNode;
};

const UserGuard: FC<Props> = ({ children }) => {
  const user = useAuth();
  const router = useRouter();
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  if (user === null) {
    if (router.pathname !== "/") {
      router.push("/");
    }
    if (isLoggingIn) {
      setIsLoggingIn(true);

      login()
        .catch((error) => console.error(error?.message))
        .finally(() => setIsLoggingIn(false));
    }
    return null;
  }

  if (user === undefined) {
    return <Loading />;
  }

  if (typeof children == "function") {
    return <>{children(user)}</>;
  } else {
    return <>{children}</>;
  }
};

export default UserGuard;
