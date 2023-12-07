"use client";

import { Button } from "@/components/ui/button";
import { useState } from "react";

function TestPage() {
  const [activeIndex, setActiveIndex] = useState<number>(0);

  return (
    <div className='min-h-screen flex flex-col gap-4 bg-yellow-100 items-start'>
      <h1>Test Page</h1>
      <pre>{activeIndex}</pre>

      <div className='flex gap-4'>
        <Button onClick={() => setActiveIndex((prev) => prev + 1)}>
          Increment +
        </Button>
        <Button onClick={() => setActiveIndex(0)}>Reset</Button>
      </div>
    </div>
  );
}

export default TestPage;
