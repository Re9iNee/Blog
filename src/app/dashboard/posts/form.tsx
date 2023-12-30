"use client";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { ToastAction } from "@/components/ui/toast";
import { toast } from "@/components/ui/use-toast";
import { PostModel } from "@/types/post";
import { PostStatus } from "@prisma/client";
import { FaMarkdown } from "react-icons/fa6";
import { postSchema } from "./post-schema";

type Props = {
  closeModal: () => void;
  initialValues?: Partial<PostModel>;
  actionFn: (data: PostModel, id?: number) => Promise<PostModel>;
};

const defaultValues: Partial<PostModel> = {
  authorId: 1,
  createdAt: new Date(),
  updatedAt: new Date(),
};

function PostForm({ initialValues, actionFn, closeModal }: Props) {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const form = useForm<PostModel>({
    defaultValues: { ...defaultValues, ...initialValues },
    mode: "onChange",
    resolver: zodResolver(postSchema),
  });

  function onSubmit(values: PostModel) {
    setIsLoading(true);

    actionFn(values, initialValues?.id)
      .then(() => {
        toast({
          description: `Your post has been ${
            initialValues ? "updated" : "created"
          } successfully.`,
        });
        closeModal();
      })
      .catch((err) => {
        console.log(err);
        toast({
          type: "foreground",
          variant: "destructive",
          title: "Uh oh! Something went wrong.",
          description: "There was a problem with your request.",
          action: (
            <ToastAction
              altText='Try again'
              onClick={() => form.handleSubmit(onSubmit)}
            >
              Try again
            </ToastAction>
          ),
        });
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  return (
    <Form {...form}>
      <form
        name='post-form'
        data-cy='post-form'
        className='space-y-8'
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <FormField
          name='title'
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input
                  required
                  data-cy='name'
                  placeholder='Enter post title'
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          name='readingTime'
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>time to read</FormLabel>
              <FormControl>
                <Input
                  required
                  type='number'
                  data-cy='reading-time'
                  placeholder='Enter post reading time'
                  {...field}
                />
              </FormControl>
              <FormDescription>
                Time to read the whole post content (in minutes)
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          name='summary'
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Summary</FormLabel>
              <FormControl>
                <Input
                  required
                  data-cy='summary'
                  placeholder='Enter post summary'
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          name='body'
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel className='inline-flex gap-2'>
                Content <FaMarkdown />
              </FormLabel>
              <FormControl>
                <Textarea
                  {...field}
                  data-cy='body'
                  className='resize-y 2xl:h-80'
                  value={field.value ?? ""}
                  placeholder='Paste the content of post'
                />
              </FormControl>
              <FormDescription>
                You can use{" "}
                <a
                  target='_blank'
                  href='https://stackedit.io/app#'
                  className='underline text-blue-500'
                >
                  StackEdit website
                </a>{" "}
                to see your markdown result in realtime.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name='status'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Status</FormLabel>
              <Select defaultValue={field.value} onValueChange={field.onChange}>
                <FormControl>
                  <SelectTrigger data-cy='status'>
                    <SelectValue placeholder='Select a Status' />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {Object.keys(PostStatus).map((status) => (
                    <SelectItem
                      key={status}
                      value={status}
                      data-cy={`status_${status}`}
                    >
                      {status}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button
          type='submit'
          data-cy='submit-btn'
          disabled={isLoading}
          aria-disabled={isLoading}
        >
          {isLoading && <Loader2 className='mr-2 h-4 w-4 animate-spin' />}
          {initialValues ? "Update post" : "Create post"}
        </Button>

        {/* hide on production */}
        {process.env.NODE_ENV === "development" && (
          <Button
            className='m-8'
            variant={"outline"}
            onClick={() => console.log(form.formState.errors)}
          >
            Log Error
          </Button>
        )}
      </form>
    </Form>
  );
}

export default PostForm;
