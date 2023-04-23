import { Dialog, Transition } from "@headlessui/react";
import { FC, Fragment, ReactNode } from "react";

type Props = {
  children: ReactNode;
  isOpen: boolean;
  onClose: () => void;
};

const Modal: FC<Props> = ({ children, isOpen, onClose }) => {
  return (
    <Transition show={isOpen} as={Fragment}>
      <Dialog as="div" className="fixed z-10 overflow-y-auto" onClose={onClose}>
        <div className="min-h-screen">
          <Transition.Child as={Fragment} enter="ease-out duration-300" enterFrom="opacity-0" enterTo="opacity-100" leave="ease-in duration-200" leaveFrom="opacity-100" leaveTo="opacity-0">
            <Dialog.Overlay className="fixed"></Dialog.Overlay>
          </Transition.Child>
          <span className="inline-block h-screen align-middle" aria-hidden="true">
            &#8203;
          </span>
          <Transition.Child as={Fragment} enter="ease-out duration-300" enterFrom="opacity-0 scale-95" enterTo="opacity-100 scale-100" leave="ease-in duration-200" leaveFrom="opacity-100 scale-100" leaveTo="opacity-0 scale-95">
            <div className="inline-block w-full transition-all transform bg-white shadow-xl">{children}</div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition>
  );
};

export default Modal;
