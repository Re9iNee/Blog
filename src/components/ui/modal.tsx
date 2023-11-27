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
      onOpenChange={onOpenChange}
      placement='top-center'
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
