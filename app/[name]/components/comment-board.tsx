"use client";

import { useUser } from "@clerk/nextjs";
import { Loader2 } from "lucide-react";
import { usePathname } from "next/navigation";
import { useOptimistic, useRef } from "react";
import { useFormStatus } from "react-dom";
import TimeAgo from "react-timeago";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import type { Comment } from "@/lib/drizzle/schema";
import { typedBoolean } from "@/lib/utils";

import { insert } from "../actions/insert";

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <Button disabled={pending} form="comment-form" type="submit">
      {pending ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          Submitting
        </>
      ) : (
        "Submit"
      )}
    </Button>
  );
}

type CommentBoardProps = {
  comments: Comment[];
};

export function CommentBoard(props: CommentBoardProps) {
  const { comments } = props;

  const pathname = usePathname();
  const { isLoaded, isSignedIn, user } = useUser();

  const formDisabled = !isLoaded || !isSignedIn;
  const pokemonName = pathname.slice(1);

  const formRef = useRef<HTMLFormElement>(null);
  const [optimisticComments, addOptimisticComment] = useOptimistic<
    Omit<Comment, "id">[],
    string
  >(comments, (state, newComment) => {
    if (!user) return state;

    const userNames = [user.firstName, user.lastName].filter(typedBoolean);
    const userName = userNames.length ? userNames.join(" ") : "Unknown";

    return [
      ...state,
      {
        createdAt: new Date(),
        pokemonName,
        content: newComment,
        userId: user.id,
        userName,
      },
    ];
  });

  return (
    <div className="space-y-4 pt-6">
      {optimisticComments.map((c, ix) => (
        <Card key={ix}>
          <CardHeader>
            <CardDescription>{c.userName}</CardDescription>
          </CardHeader>
          <CardContent>{c.content}</CardContent>
          <CardFooter>
            <TimeAgo
              className="text-sm text-muted-foreground"
              date={c.createdAt}
            />
          </CardFooter>
        </Card>
      ))}
      <Card>
        <CardHeader>
          <CardTitle>Add Comment</CardTitle>
        </CardHeader>
        <CardContent>
          <form
            action={async (formData: FormData) => {
              addOptimisticComment(formData.get("comment") as string);

              formData.set("pokemon", pokemonName);
              await insert(formData);
              formRef.current?.reset();
            }}
            className="w-full space-y-4"
            id="comment-form"
            ref={formRef}
          >
            <div className="grid w-full gap-2">
              <Label htmlFor="comment">Content</Label>
              <Textarea
                className="resize-none"
                disabled={formDisabled}
                id="comment"
                maxLength={255}
                minLength={10}
                name="comment"
                placeholder="Type something here ..."
                required
              />
              {formDisabled && (
                <p className="text-sm text-muted-foreground">
                  Please login to use the discussions function.
                </p>
              )}
            </div>
            <SubmitButton />
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
