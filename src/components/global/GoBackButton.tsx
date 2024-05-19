"use client";

import { cn } from "@/lib/utils";
import { ClassValue } from "clsx";
import { useRouter } from "next/navigation";
import { ReactNode } from "react";
import { Button } from "../ui/button";

export default function GoBackButton({
  children,
  className,
}: {
  children?: ReactNode;
  className?: ClassValue;
}) {
  const router = useRouter();
  const handleBack = () => {
    router.back();
  };
  return (
    <Button onClick={handleBack} variant={"outline"} className={cn(className)}>
      {children}
    </Button>
  );
}
