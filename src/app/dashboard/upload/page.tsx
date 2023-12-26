"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Uploader } from "@/components/ui/uploader";
import { toast } from "@/components/ui/use-toast";
import Link from "next/link";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { FaCheck, FaRegCopy } from "react-icons/fa6";

function DashboardPostPage() {
  const [links, setLinks] = useState<string[]>([]);
  const [copied, setCopied] = useState<string | undefined>();

  const copyTextToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  const copyClickHandler = (link: string) => {
    setCopied(link);
    copyTextToClipboard(link);

    setTimeout(() => {
      setCopied(undefined);
    }, 3000);
  };

  const form = useForm({
    mode: "onChange",
  });

  const onUploadFinished = (url: string) => {
    setLinks((prev) => [...prev, url]);

    toast({
      title: "File uploaded",
      description: (
        <Link
          href={url}
          target='_blank'
          className='font-medium text-blue-600 dark:text-blue-500 hover:underline'
        >
          Link
        </Link>
      ),
    });
  };

  return (
    <div className='h-full flex-1 flex-col space-y-8 p-8 md:flex'>
      <div className='flex items-center justify-between space-y-2'>
        <div>
          <h2 className='text-2xl font-bold tracking-tight'>Upload Center!</h2>
          <p className='text-muted-foreground'>
            You can upload images, files etc.
          </p>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>File</CardTitle>
          <CardDescription>
            Supports every file, make sure not to upload any ransomware,
            although that is my job not to let you.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form
              name='upload-form'
              data-cy='upload-form'
              className='space-y-8'
            >
              <FormField
                name='file'
                control={form.control}
                render={() => {
                  return (
                    <FormItem>
                      <FormLabel>File</FormLabel>
                      <FormControl>
                        <Uploader onUploadFinished={onUploadFinished} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  );
                }}
              />
            </form>
          </Form>
        </CardContent>
        <CardFooter className='flex-col items-start gap-4'>
          {links.map((link) => (
            <div key={link} className='inline-flex gap-4 items-center'>
              <Link href={link} className='text-blue-500'>
                {link}
              </Link>
              <Button variant='outline' onClick={() => copyClickHandler(link)}>
                {copied === link ? <FaCheck /> : <FaRegCopy />}
              </Button>
            </div>
          ))}
        </CardFooter>
      </Card>
    </div>
  );
}

export default DashboardPostPage;
