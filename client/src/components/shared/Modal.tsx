import { Dialog } from '@headlessui/react';
import { ReactNode } from 'react';

interface ModalProp {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  title: string;
  children: ReactNode;
}

// reusable modal component wrapper
function Modal({ isOpen, setIsOpen, title, children }: ModalProp) {
  return (
    <Dialog
      open={isOpen}
      onClose={() => setIsOpen(false)}
      className="relative z-50"
    >
      {/* backdrop */}
      <div className="fixed inset-0 bg-slate-800/80" aria-hidden="true" />

      <div className="fixed inset-0 flex items-center justify-center mb-64">
        <Dialog.Panel className="mx-auto max-w-sm rounded bg-white p-4">
          <Dialog.Title className="text-center text-xl">{title}</Dialog.Title>
          {children}
        </Dialog.Panel>
      </div>
    </Dialog>
  );
}

export default Modal;
