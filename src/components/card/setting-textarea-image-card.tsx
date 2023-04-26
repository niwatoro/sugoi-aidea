import { FC, FormEvent, useState } from "react";
import { UseFormRegisterReturn } from "react-hook-form";
import Button from "../button";
import ImageField from "../field/image-field";
import TextareaField from "../field/textarea-field";
import Card from "./card";

type Props = {
  title: string;
  description: string;
  subtitle: string;
  onSubmit: (e: FormEvent<HTMLFormElement>) => void;
  submitImages: (images: (string | null)[]) => void;
  register: UseFormRegisterReturn;
  defaultValue: string;
  defaultImages: string[];
  error?: string;
};
const SettingTextareaImageCard: FC<Props> = ({ title, description, subtitle, onSubmit, submitImages, register, defaultValue, defaultImages, error }) => {
  const [images, setImages] = useState<(string | null)[]>([null, null, null]);
  const [isProcessing, setIsProcessing] = useState(false);

  return (
    <form
      onSubmit={(e) => {
        setIsProcessing(true);
        try {
          submitImages(images);
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
            <Button type="submit">保存</Button>
          </div>
        }
      >
        <div className="p-8 flex flex-col gap-y-3">
          <div className="font-bold text-2xl">{title}</div>
          <div>{description}</div>
          <TextareaField label="" error={error} register={register} defaultValue={defaultValue} />
          <div className="flex gap-x-3">
            {Array.from({ length: 3 }).map((_, index) => (
              <ImageField
                key={index}
                setter={(v) => {
                  setImages((images) => {
                    if (v === undefined) return images.filter((_, i) => i !== index);
                    const newList = [...images];
                    newList[index] = v!;
                    return newList;
                  });
                }}
                size={{ width: 600, height: 600 }}
                aspect={1}
                noCrop
                defaultImage={defaultImages[index]}
              />
            ))}
          </div>
        </div>
      </Card>
    </form>
  );
};

export default SettingTextareaImageCard;
