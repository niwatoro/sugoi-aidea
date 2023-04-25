import { ButtonHTMLAttributes, FC, ReactNode } from "react";
import ReactLoading from "react-loading";

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  children: ReactNode;
};

const Button: FC<Props> = ({ children, ...props }) => {
  return (
    <button className="bg-black text-white py-2 min-w-[128px] px-5 rounded-md" {...props}>
      {children}
    </button>
  );
};

export const ButtonOnLoading: FC<ButtonHTMLAttributes<HTMLButtonElement>> = ({ ...props }) => {
  return (
    <Button {...props}>
      <div className="h-6 flex justify-center">
        <div className="w-6">
          <ReactLoading type="bubbles" height={24} width={24} />
        </div>
      </div>
    </Button>
  );
};

export default Button;
