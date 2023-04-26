import { FC, FormEvent, useState } from "react";
import { UseFormRegisterReturn } from "react-hook-form";
import Button, { ButtonOnLoading } from "../button";
import InputField from "../field/input-field";
import Card from "./card";

type Props = {
  title: string;
  description: string;
  subtitle: string;
  onSubmit: (e: FormEvent<HTMLFormElement>) => void;
  register: UseFormRegisterReturn;
  defaultValue: string;
  error?: string;
};
const SettingCard: FC<Props> = ({ title, description, subtitle, onSubmit, register, defaultValue, error }) => {
  const [isProcessing, setIsProcessing] = useState(false);

  return (
    <form
      onSubmit={(e) => {
        setIsProcessing(true);
        try {
          onSubmit(e);
        } finally {
          setIsProcessing(false);
        }
      }}
    >
      <Card
        showsSidebar
        sidebar={
          <div className="flex justify-between items-center">
            <div>{subtitle}</div>
            {isProcessing ? <ButtonOnLoading /> : <Button type="submit">保存</Button>}
          </div>
        }
      >
        <div className="p-8 flex flex-col gap-y-3">
          <div className="font-bold text-2xl">{title}</div>
          <div>{description}</div>
          <InputField label="" error={error} register={register} defaultValue={defaultValue} />
        </div>
      </Card>
    </form>
  );
};

export default SettingCard;
