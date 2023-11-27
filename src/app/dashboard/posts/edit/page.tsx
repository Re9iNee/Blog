"use client";

import Modal from "@/components/ui/modal";
import { useDisclosure } from "@nextui-org/react";
import PostForm from "../form";
import { Button } from "@/components/ui/button";

export default function App() {
  const { isOpen, onOpen, onClose, onOpenChange } = useDisclosure();

  return (
    <>
      <Button onClick={onOpen}>Edit Post</Button>
      <Modal
        isOpen={isOpen}
        onClose={onClose}
        header={"Edit Post"}
        onOpenChange={onOpenChange}
      >
        <PostForm
          initialValues={{
            title: "AME",
            summery: "AME",
            body: " AME",
            authorId: 1,
            readingTime: 8,
          }}
        />
      </Modal>
    </>
  );
}
