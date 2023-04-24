import * as Slider from "@radix-ui/react-slider";
import "cropperjs/dist/cropper.css";
import { FC, useRef } from "react";
import Cropper, { ReactCropperElement } from "react-cropper";
import Button from "../button";
import Modal from "./modal";

type Props = {
  src: string;
  aspect: number;
  onCrop: (img: string) => void;
  onClose: () => void;
  size: {
    width: number;
    height: number;
  };
};

const CropModal: FC<Props> = ({ src, aspect, onCrop, onClose, size }) => {
  const cropperRef = useRef<HTMLImageElement>(null);

  let cropper: Cropper;
  let initialZoom: number;

  const onInit = () => {
    const imageElement = cropperRef.current as ReactCropperElement;
    cropper = imageElement.cropper;

    const imageData = cropper.getImageData();
    initialZoom ||= imageData.width / imageData.naturalWidth;
  };

  const crop = () => {
    onCrop(cropper.getCroppedCanvas(size).toDataURL());
    onClose();
  };

  const changeZoom = ([value]: number[]) => {
    const zoom = initialZoom * (1 + value / 100);
    cropper.zoomTo(zoom);
  };

  return (
    <Modal isOpen={Boolean(src)} onClose={onClose}>
      <div className="overflow-hidden">
        <Cropper src={src} style={{ width: 400, height: 400 }} aspectRatio={aspect} guides={false} ref={cropperRef} ready={onInit} cropBoxMovable={false} cropBoxResizable={false} toggleDragModeOnDblclick={false} center={false} viewMode={3} dragMode="move" autoCropArea={1} zoomOnWheel={false} />
      </div>
      <Slider.Root className="w-full flex items-center relative" onValueChange={changeZoom}>
        <Slider.Track className="rounded-full relative bg-gray-400 block h-1 w-full overflow-hidden">
          <Slider.Range className="bg-blue-400 absolute block h-full" />
        </Slider.Track>
        <Slider.Thumb className="w-5 h-5 shadow rounded-full bg-blue-400 block" />
      </Slider.Root>
      <div className="mt-3">
        <Button onClick={crop}>切り取り</Button>
      </div>
    </Modal>
  );
};

export default CropModal;
