import { FC } from "react";
import ReactLoading from "react-loading";

const Loading: FC = () => {
  return (
    <div className="h-full w-full flex flex-col justify-center items-center">
      <ReactLoading color="black" type="spinningBubbles" />
    </div>
  );
};

export default Loading;
