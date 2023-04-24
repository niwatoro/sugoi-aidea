import { classNames } from "@/lib/class-names";
import { PhotoIcon, XMarkIcon } from "@heroicons/react/24/solid";
import { FC, useEffect, useState } from "react";
import CropModal from "../modal/cropper";

type Props = {
  setter: (value: string | undefined) => void;
  error?: boolean;
  defaultImage?: string;
  size: {
    width: number;
    height: number;
  };
  aspect: number;
};

const ImageField: FC<Props> = ({ setter, error, defaultImage, size, aspect }) => {
  const [image, setImage] = useState<string | undefined>(defaultImage);
  const [targetImage, setTargetImage] = useState<string>();

  const onCrap = (croppedImage: string) => {
    setImage(croppedImage);
  };

  const removeImage = () => {
    setImage(undefined);
  };

  useEffect(() => {
    setter(image);
  }, [image]);

  return (
    <>
      <label className={classNames("inline-block relative cursor-pointer overflow-hidden rounded-lg shadow-lg w-40", error && "ring-2 ring-red-500")}>
        <input
          type="file"
          className="hidden"
          accept="image/png, image/jpeg"
          onChange={(e) => {
            const target = e.currentTarget;
            const file = target.files?.[0];
            const reader = new FileReader();

            reader.onload = () => {
              setTargetImage(reader.result as string);
              target.value = "";
            };
            reader.readAsDataURL(file as Blob);
          }}
        />
        {image ? <img src={image} alt="" className="w-40" /> : <div className="bg-gray-300 w-40 aspect-square" />}
        <div className="absolute w-40 inset-0 flex items-center justify-center bg-black bg-opacity-10">
          <PhotoIcon className="w-10 text-white opacity-20" />
        </div>
        {image && (
          <button
            className="absolute top-0 right-0 w-10 h-10 p-3 text-white"
            onClick={(e) => {
              removeImage();
              e.preventDefault();
            }}
          >
            <XMarkIcon />
          </button>
        )}
      </label>
      <CropModal src={targetImage!} size={size} aspect={aspect} onCrop={onCrap} onClose={() => setTargetImage(undefined)} />
    </>
  );
};

export default ImageField;
