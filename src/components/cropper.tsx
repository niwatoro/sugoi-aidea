import * as Slider from "@radix-ui/react-slider";
import { FC, useRef } from "react";
import Cropper, { ReactCropperElement } from "react-cropper";
import Button from "./button";
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
        <Slider.Track>
          <Slider.Range />
        </Slider.Track>
        <Slider.Thumb />
        <Button onClick={crop}>決める</Button>
      </Slider.Root>
    </Modal>
  );
};
