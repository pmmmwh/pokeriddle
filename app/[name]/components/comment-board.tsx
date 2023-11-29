"use client";

import { useUser } from "@clerk/nextjs";
import { Loader2 } from "lucide-react";
import { usePathname } from "next/navigation";
import { useRef } from "react";
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

import { insert } from "../actions/insert";

type CommentBoardProps = {
  comments: Comment[];
};

export function CommentBoard(props: CommentBoardProps) {
  const { comments } = props;

  const pathname = usePathname();
  const { isLoaded, isSignedIn } = useUser();

  const formRef = useRef<HTMLFormElement>(null);
  const { pending } = useFormStatus();

  const formDisabled = !isLoaded || !isSignedIn;

  return (
    <div className="space-y-4 pt-6">
      {comments.map((c) => (
        <Card key={c.id}>
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
              formData.set("pokemon", pathname.slice(1));
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
          </form>
        </CardContent>
        {!formDisabled && (
          <CardFooter>
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
          </CardFooter>
        )}
      </Card>
    </div>
  );
}
