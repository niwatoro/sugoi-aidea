import { statusItems } from "@/types/idea";
import { FC, useState } from "react";
import Button, { ButtonOnLoading } from "../button";
import Select, { ListItemProps } from "../select";
import Card from "./card";

type Props = {
  title: string;
  description: string;
  subtitle: string;
  onSubmit: (value: string) => void;
  defaultValue: string;
  error?: string;
};
const SettingSelectCard: FC<Props> = ({ title, description, subtitle, onSubmit, defaultValue, error }) => {
  const [value, setValue] = useState<ListItemProps>(statusItems.find((item) => item.id === defaultValue) ?? statusItems[0]);
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
                  onSubmit(value.id);
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
        <div className="whitespace-pre-line">
          {description.split("¥n").map((t, index) => (
            <span key={index}>
              {t}
              <br />
            </span>
          ))}
        </div>
        <Select items={statusItems} value={value} onChange={(v) => setValue(v)} />
      </div>
    </Card>
  );
};

export default SettingSelectCard;
