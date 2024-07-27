"use client";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { useForm } from "react-hook-form";

import { toast } from "@/components/ui/use-toast";
import { PostSelect } from "@/types/post.type";

import {
  MultiSelector,
  MultiSelectorContent,
  MultiSelectorInput,
  MultiSelectorItem,
  MultiSelectorList,
  MultiSelectorTrigger,
} from "@/components/ui/multi-select";
import { updateCategoryById } from "@/service/category.service";
import { CategoryUpsertType, CategoryModel } from "@/types/category.type";
import { CreateCategorySchema } from "@/types/schemas/category-schema";
import Image from "next/image";
import { useState } from "react";

type Props = {
  posts: PostSelect[];
  initialValues: CategoryModel;
};
function EditCategoryForm({ initialValues, posts: allPosts }: Props) {
  const [isPending, setIsPending] = useState<boolean>(false);
  const updateCategoryWithId = updateCategoryById.bind(null, initialValues.id);

  const { posts, ...rest } = initialValues;

  const form = useForm<CategoryUpsertType>({
    mode: "onChange",
    defaultValues: { ...rest, posts: posts.map((post) => String(post.id)) },
    resolver: zodResolver(CreateCategorySchema),
  });

  const onSubmit = async (values: CategoryUpsertType) => {
    setIsPending(true);

    // if its successful it would redirect to posts page, so no need to update isPending state
    await updateCategoryWithId(values).catch(() => {
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
        className="space-y-8"
        name="edit-category-form"
        data-cy="edit-category-form"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <FormField
          name="name"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input
                  data-cy="name"
                  placeholder="Enter category name"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          name="posts"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Select Posts</FormLabel>
              <MultiSelector
                values={field.value}
                onValuesChange={field.onChange}
              >
                <MultiSelectorTrigger>
                  <MultiSelectorInput placeholder="Select people to invite" />
                </MultiSelectorTrigger>
                <MultiSelectorContent>
                  <MultiSelectorList>
                    {allPosts.map((post) => (
                      <MultiSelectorItem key={post.id} value={String(post.id)}>
                        <div className="flex items-center space-x-2">
                          <Image
                            width={32}
                            height={32}
                            alt={post.title}
                            src={post.mainImageUrl ?? ""}
                            className="h-8 w-8 rounded-full"
                          />
                          <span>{post.title}</span>
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

        <Button type="submit" data-cy="submit-btn" aria-disabled={isPending}>
          {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          Update Post
        </Button>

        {/* hide on production */}
        {process.env.NODE_ENV === "development" && (
          <Button
            className="m-8"
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

export default EditCategoryForm;
