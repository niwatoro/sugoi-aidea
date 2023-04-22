import { FC } from "react";

type Props = { src: string };

const Avatar: FC<Props> = ({ src }) => {
  if (src) {
    return <img src={src} className="w-10 h-10 rounded-full" />;
  } else {
    return <div className="w-10 h-10 rounded-full bg-gray-300" />;
  }
};

export default Avatar;
