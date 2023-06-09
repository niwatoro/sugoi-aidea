import { FC, useState } from "react";
import Button, { ButtonOnLoading } from "../button";
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
  const [isProcessing, setIsProcessing] = useState(false);

  return (
    <Card
      showsSidebar
      sidebar={
        <div className="flex justify-between items-center">
          <div>{subtitle}</div>
          {isProcessing ? (
            <ButtonOnLoading />
          ) : (
            <Button
              onClick={() => {
                if (value) {
                  setIsProcessing(true);
                  try {
                    onSubmit(value);
                  } finally {
                    setIsProcessing(false);
                  }
                }
              }}
            >
              保存
            </Button>
          )}
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
