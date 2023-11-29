"use server";

import { currentUser } from "@clerk/nextjs";
import { revalidateTag } from "next/cache";

import { insertComment } from "@/lib/drizzle";
import { typedBoolean } from "@/lib/utils";

export async function insert(formData: FormData) {
  const user = await currentUser();
  if (!user) {
    throw new Error("You must be logged in to add comments");
  }

  const pokemonName = formData.get("pokemon");
  if (typeof pokemonName !== "string" || !pokemonName) {
    throw new Error("Pokemon is invalid");
  }

  const content = formData.get("comment");
  if (typeof content !== "string" || !content) {
    throw new Error("Comment is invalid");
  }

  const userNames = [user.firstName, user.lastName].filter(typedBoolean);
  const userName = userNames.length ? userNames.join(" ") : "Unknown";

  await insertComment({
    content,
    pokemonName,
    userId: user.id,
    userName,
  });
  revalidateTag("comments");
}
