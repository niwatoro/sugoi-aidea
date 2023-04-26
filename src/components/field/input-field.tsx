import { classNames } from "@/lib/class-names";
import { FC, InputHTMLAttributes, ReactNode } from "react";
import { UseFormRegisterReturn } from "react-hook-form";
import FieldGroup from "./field-group";

type Props = {
  label: string;
  error?: string;
  currentlength?: number;
  action?: ReactNode;
  register: UseFormRegisterReturn;
} & InputHTMLAttributes<HTMLInputElement>;

const InputField: FC<Props> = ({ label, error, currentlength, action, className, register, ...props }) => {
  return (
    <FieldGroup label={label} error={error} currentlength={currentlength} action={action} maxLength={props.maxLength} required={props.required} id={register.name}>
      <input id={register.name} className={classNames("border border-slate-300 rounded-md p-2 w-full", className)} {...register} {...props} />
    </FieldGroup>
  );
};

export default InputField;
