import {
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Modal as NextUiModal,
} from "@nextui-org/react";
import { ReactNode, memo } from "react";

type Props = {
  isOpen: boolean;
  header: ReactNode;
  children: ReactNode;
  onOpenChange: () => void;
};
function Modal({ isOpen, children, onOpenChange, header }: Props) {
  return (
    <NextUiModal
      isOpen={isOpen}
      isDismissable={false}
      placement='top-center'
      onOpenChange={onOpenChange}
    >
      <ModalContent className='max-h-[90vh] overflow-scroll'>
        {() => (
          <>
            <ModalHeader className='flex flex-col gap-1'>{header}</ModalHeader>
            <ModalBody>{children}</ModalBody>
            <ModalFooter />
          </>
        )}
      </ModalContent>
    </NextUiModal>
  );
}

export default memo(Modal);
