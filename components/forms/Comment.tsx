"use client";

import React from "react";
import * as zod from "zod";
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormLabel,
  FormItem,
  FormField,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { usePathname, useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";

import { CommentValidation } from "@/lib/validations/thread";
import Image from "next/image";
import { addCommentToThread } from "@/lib/actions/thread.actions";

type CommentProps = {
  threadId: string;
  currentUserImg: string;
  currentUserId: string;
};

const Comment = ({ threadId, currentUserImg, currentUserId }: CommentProps) => {
  const router = useRouter();
  const pathname = usePathname();

  const form = useForm({
    resolver: zodResolver(CommentValidation),
    defaultValues: {
      thread: "",
    },
  });

  const onSubmit = async (values: zod.infer<typeof CommentValidation>) => {
    await addCommentToThread({
      threadId,
      commentText: values.thread,
      userId: JSON.parse(currentUserId),
      path: pathname,
    });

    
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="comment-form">
        <FormField
          control={form.control}
          name="thread"
          render={({ field }) => (
            <FormItem className="flex items-center w-full gap-3">
              <FormLabel className="block relative h-[3rem] w-[3rem]">
                <Image
                  src={currentUserImg}
                  alt="Profile image"
                  fill
                  className="rounded-full object-cover block"
                />
              </FormLabel>

              <FormControl className="border-none bg-transparent flex-1">
                <Input
                  type="text"
                  placeholder="Comment"
                  className="no-focus text-light-1 outline-none"
                  {...field}
                />
              </FormControl>
            </FormItem>
          )}
        />

        <Button type="submit" className="comment-form_btn">
          Reply
        </Button>
      </form>
    </Form>
  );
};

export default Comment;
