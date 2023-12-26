import {
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Modal as NextUiModal,
  useDisclosure,
} from "@nextui-org/react";
import { ReactNode } from "react";

type Props = {
  isOpen: boolean;
  header: ReactNode;
  children: ReactNode;
  onOpenChange: () => void;
};
export default function Modal({
  isOpen,
  children,
  onOpenChange,
  header,
}: Props) {
  useDisclosure;
  return (
    <NextUiModal
      isOpen={isOpen}
      isDismissable={true}
      placement='top-center'
      onOpenChange={onOpenChange}
    >
      <ModalContent>
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
