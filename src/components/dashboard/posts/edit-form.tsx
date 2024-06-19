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
import { useForm } from "react-hook-form";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/components/ui/use-toast";
import { PostModel, PostUpsertType } from "@/types/post.type";
import { PostStatus } from "@prisma/client";
import { FaMarkdown } from "react-icons/fa6";

import {
  MultiSelector,
  MultiSelectorContent,
  MultiSelectorInput,
  MultiSelectorItem,
  MultiSelectorList,
  MultiSelectorTrigger,
} from "@/components/ui/multi-select";
import { Switch } from "@/components/ui/switch";
import { Uploader } from "@/components/ui/uploader";
import { updatePost } from "@/lib/actions/post.actions";
import { getSiteUrl, makeSlugWithTitle } from "@/lib/utils";
import { AuthorField } from "@/types/author";
import { CategorySelect } from "@/types/category.type";
import { UpdatePostSchema } from "@/types/schemas/post-schema";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

type Props = {
  postId: number;
  authors: AuthorField[];
  initialValues: PostModel;
  categories: CategorySelect[];
};
function EditPostForm({
  postId,
  authors,
  initialValues,
  categories: allCategories,
}: Props) {
  const [isPending, setIsPending] = useState<boolean>(false);
  const updatePostWithId = updatePost.bind(null, postId);

  const { categories, ...rest } = initialValues;

  const form = useForm<PostUpsertType>({
    mode: "onChange",
    resolver: zodResolver(UpdatePostSchema),
    defaultValues: {
      ...rest,
      categories: categories.map((cat) => String(cat.id)),
    },
  });

  const slugInput = form.watch("slug");

  const onUploadFinished = (url: string) => {
    form.setValue("mainImageUrl", url, {
      shouldDirty: true,
      shouldTouch: true,
      shouldValidate: true,
    });

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

  const onSubmit = async (values: PostUpsertType) => {
    setIsPending(true);

    // if its successful it would redirect to posts page, so no need to update isPending state
    await updatePostWithId(values).catch(() => {
      setIsPending(false);
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: "There was a problem with your request.",
      });
    });
  };
  return (
    <Form {...form}>
      <form
        className='space-y-8'
        name='edit-post-form'
        data-cy='edit-post-form'
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <FormField
          name='title'
          control={form.control}
          render={({ field: { onChange, ...rest } }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input
                  required
                  data-cy='name'
                  onChange={(e) => {
                    form.setValue(
                      "slug",
                      makeSlugWithTitle(e.target.value) ?? ""
                    );
                    onChange(e);
                  }}
                  placeholder='Enter post title'
                  {...rest}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          name='slug'
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Slug</FormLabel>
              <FormControl>
                <Input
                  required
                  data-cy='slug'
                  placeholder='Enter post slug'
                  {...field}
                />
              </FormControl>
              <FormMessage />
              <FormDescription>
                Slug is used for navigating through posts in the webpage{" "}
                {getSiteUrl() + "/posts/" + (slugInput ?? "{slug_value}")}
              </FormDescription>
            </FormItem>
          )}
        />

        {form.getValues("mainImageUrl") && (
          <Image
            width={"288"}
            height={"160"}
            src={form.getValues("mainImageUrl")!}
            alt={form.getValues("title") + " " + "main image"}
            className='rounded-lg self-center mx-auto border-2 border-gray-200 dark:border-gray-800 aspect-video object-contain'
          />
        )}
        <FormField
          name='mainImageUrl'
          control={form.control}
          render={() => {
            return (
              <FormItem>
                <FormLabel>Main Image</FormLabel>
                <FormControl>
                  <Uploader
                    defaultValue={form.getValues("mainImageUrl") ?? ""}
                    name='mainImageUrl'
                    onUploadFinished={onUploadFinished}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            );
          }}
        />

        <FormField
          name='status'
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Status</FormLabel>
              <Select
                name='status'
                defaultValue={field.value}
                onValueChange={(val) => {
                  // switch isSlideshow value based on status of post
                  // if the post goes to draft or archived, isSlideshow will be false
                  form.setValue(
                    "isSlideshow",
                    val !== PostStatus.draft && val !== PostStatus.archived
                  );

                  return field.onChange(val);
                }}
              >
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
                      data-cy={`status-${status}`}
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
        <FormField
          name='authorId'
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Author</FormLabel>
              <Select
                name='authorId'
                onValueChange={field.onChange}
                defaultValue={String(field.value)}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder='Select an author' />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {authors.map((author) => (
                    <SelectItem key={author.id} value={String(author.id)}>
                      {author.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
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
                <Textarea
                  {...field}
                  data-cy='summary'
                  className='resize-y h-2'
                  value={field.value ?? ""}
                  placeholder='Paste the summary of post'
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
                  href='https://dillinger.io/'
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
          name='categories'
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Select Categories</FormLabel>
              <MultiSelector
                values={field.value}
                onValuesChange={field.onChange}
              >
                <MultiSelectorTrigger>
                  <MultiSelectorInput placeholder='Select people to invite' />
                </MultiSelectorTrigger>
                <MultiSelectorContent>
                  <MultiSelectorList>
                    {allCategories.map((category) => (
                      <MultiSelectorItem
                        key={category.id}
                        value={String(category.id)}
                      >
                        <div className='flex items-center space-x-2'>
                          <span>{category.name}</span>
                        </div>
                      </MultiSelectorItem>
                    ))}
                  </MultiSelectorList>
                </MultiSelectorContent>
              </MultiSelector>
              <FormMessage />
            </FormItem>
          )}
        />

        <div>
          <h3 className='mb-4 text-lg font-medium'>Post Settings</h3>
          <div className='space-y-4'>
            <FormField
              control={form.control}
              name='isSlideshow'
              render={({ field }) => (
                <FormItem className='flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm'>
                  <div className='space-y-0.5'>
                    <FormLabel>Show in Slideshow</FormLabel>
                    <FormDescription>
                      published posts can be shown in the slideshow
                    </FormDescription>
                  </div>
                  <FormControl>
                    <Switch
                      checked={field.value}
                      onCheckedChange={field.onChange}
                      disabled={
                        form.getValues("status") === PostStatus.draft ||
                        form.getValues("status") === PostStatus.archived
                      }
                    />
                  </FormControl>
                </FormItem>
              )}
            />
          </div>
        </div>

        <Button type='submit' data-cy='submit-btn' aria-disabled={isPending}>
          {isPending && <Loader2 className='mr-2 h-4 w-4 animate-spin' />}
          Update Post
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

export default EditPostForm;
