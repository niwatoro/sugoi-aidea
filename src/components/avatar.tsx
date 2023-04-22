import { FC } from "react";

type Props = { src: string };

const Avatar: FC<Props> = ({ src }) => {
  if (src) {
    return <img src={src} className="w-8 h-8 rounded-full" />;
  } else {
    return <div className="w-8 h-8 rounded-full bg-gray-300" />;
  }
};

export default Avatar;
