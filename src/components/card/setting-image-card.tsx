import { FC, useState } from "react";
import Button from "../button";
import ImageField from "../field/image-field";
import Card from "./card";

type Props = {
  title: string;
  description: string;
  subtitle: string;
  onSubmit: (value: string) => void;
  defaultValue: string;
  error?: string;
};
const SettingImageCard: FC<Props> = ({ title, description, subtitle, onSubmit, defaultValue, error }) => {
  const [value, setValue] = useState<string>();

  return (
    <Card
      showsSidebar
      sidebar={
        <div className="flex justify-between items-center">
          <div>{subtitle}</div>
          <Button
            onClick={() => {
              if (value) {
                onSubmit(value);
              }
            }}
          >
            保存
          </Button>
        </div>
      }
    >
      <div className="p-8 flex flex-col gap-y-3">
        <div className="font-bold text-2xl">{title}</div>
        <div>{description}</div>
        <ImageField size={{ width: 600, height: 600 }} aspect={1} error={Boolean(error)} setter={(v) => setValue(v!)} defaultImage={defaultValue} />
      </div>
    </Card>
  );
};

export default SettingImageCard;
