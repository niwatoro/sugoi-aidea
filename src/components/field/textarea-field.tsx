import { classNames } from "@/lib/class-names";
import { FC, ReactNode } from "react";
import { UseFormRegisterReturn } from "react-hook-form";
import TextareaAutosize, { TextareaAutosizeProps } from "react-textarea-autosize";
import FieldGroup from "./field-group";

type Props = {
  label: string;
  error?: string;
  currentlength?: number;
  action?: ReactNode;
  register: UseFormRegisterReturn;
} & TextareaAutosizeProps;

const TextareaField: FC<Props> = ({ label, error, currentlength, action, register, className, ...props }) => {
  return (
    <FieldGroup label={label} error={error} currentlength={currentlength} action={action} maxLength={props.maxLength} required={props.required} id={register.name}>
      <TextareaAutosize id={register.name} className={classNames("flex-1 border rounded p-2 w-full border-slate-200", className)} {...register} {...props} />
    </FieldGroup>
  );
};

export default TextareaField;
