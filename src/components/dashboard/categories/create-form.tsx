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
import { Category } from "@prisma/client";

import { createCategory } from "@/service/category.service";
import { CreateCategorySchema } from "@/types/schemas/category-schema";
import { useState } from "react";

function CreateCategoryForm() {
  const [isPending, setIsPending] = useState<boolean>(false);

  const form = useForm<Category>({
    defaultValues: {
      name: "",
    },
    resolver: zodResolver(CreateCategorySchema),
  });

  async function onSubmit(values: Category) {
    setIsPending(true);

    // if its successful it would redirect to categories page, so no need to update isPending state
    await createCategory(values).catch(() => {
      setIsPending(false);
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: "Failed to Create a Category.",
      });
    });
  }

  return (
    <Form {...form}>
      <form
        className='space-y-8'
        name='create-category-form'
        data-cy='create-category-form'
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <FormField
          name='name'
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input
                  data-cy='name'
                  placeholder='Enter category name'
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type='submit' data-cy='submit-btn' aria-disabled={isPending}>
          {isPending && <Loader2 className='mr-2 h-4 w-4 animate-spin' />}
          Create Category
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

export default CreateCategoryForm;
