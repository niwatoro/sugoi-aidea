import { FC } from "react";
import Button from "../button";
import Modal from "./modal";

type Props = {
  src: string;
  isOpen: boolean;
  onClose: () => void;
};
const ImageModal: FC<Props> = ({ src, isOpen, onClose }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <img src={src} className="object-contain h-full w-full" />
      <div className="w-full mt-3 justify-end flex">
        <Button onClick={onClose}>閉じる</Button>
      </div>
    </Modal>
  );
};

export default ImageModal;
