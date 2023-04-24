import { FC, ReactNode } from "react";

type Props = {
  id: string;
  label: string;
  children: ReactNode;
  error?: string;
  currentlength?: number;
  action?: ReactNode;
  maxLength?: number;
  required?: boolean;
};

const FieldGroup: FC<Props> = ({ id, label, children, error, currentlength, action, maxLength, required }) => {
  return (
    <div>
      <div>
        <label htmlFor={id}>
          {label}
          {required && <sup className="text-red-500">*</sup>}
        </label>
      </div>
      <div className="flex">
        {children}
        {action}
      </div>
      <div>
        {error && <p className="text-red-500 text-sm">{error}</p>}
        {maxLength && (
          <p className="text-slate-500">
            {currentlength || 0}/{maxLength}
          </p>
        )}
      </div>
    </div>
  );
};

export default FieldGroup;
