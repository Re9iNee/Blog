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

import { Textarea } from "@/components/ui/textarea";
import { PostModel } from "@/types/post";
import { postSchema } from "./post-schema";

type Props = {
  initialValues: Partial<PostModel>;
};
function PostForm({ initialValues }: Props) {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const form = useForm<PostModel>({
    defaultValues: { ...initialValues },
    mode: "onChange",
    resolver: zodResolver(postSchema),
  });

  function onSubmit(values: PostModel) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values);
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
          name='summery'
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Summery</FormLabel>
              <FormControl>
                <Input
                  required
                  data-cy='summery'
                  placeholder='Enter post summery'
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
              <FormLabel>Content</FormLabel>
              <FormControl>
                <Textarea
                  {...field}
                  data-cy='body'
                  className='resize-y 2xl:h-96'
                  value={field.value ?? ""}
                  placeholder='Paste the content of post (Supports markdown)'
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
