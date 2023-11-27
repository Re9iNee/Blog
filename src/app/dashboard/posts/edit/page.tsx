"use client";

import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure,
} from "@nextui-org/react";
import PostForm from "../form";

export default function App() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  return (
    <>
      <Button onPress={onOpen} color='primary'>
        Open Modal
      </Button>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} placement='top-center'>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className='flex flex-col gap-1'>Log in</ModalHeader>
              <ModalBody>
                <PostForm
                  initialValues={{
                    title: "AME",
                    summery: "AME",
                    body: " AME",
                    authorId: 1,
                    readingTime: 8,
                  }}
                />
              </ModalBody>
              <ModalFooter />
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
