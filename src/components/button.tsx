import { ButtonHTMLAttributes, FC, ReactNode } from "react";

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  children: ReactNode;
};

const Button: FC<Props> = ({ children, ...props }) => {
  return (
    <button className="bg-black text-white py-2 px-4 rounded-md" {...props}>
      {children}
    </button>
  );
};

export default Button;
