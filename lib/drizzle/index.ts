import { neon, neonConfig } from "@neondatabase/serverless";
import { eq } from "drizzle-orm";
import { drizzle } from "drizzle-orm/neon-http";

import type { Comment, NewComment } from "./schema";
import { comments } from "./schema";

neonConfig.fetchConnectionCache = true;

const sql = neon(process.env.DRIZZLE_DATABASE_URL!);
export const db = drizzle(sql);

export function insertComment(comment: NewComment): Promise<Comment[]> {
  return db.insert(comments).values(comment).returning();
}

export function getCommentsForPokemon(pokemon: string): Promise<Comment[]> {
  return db
    .select()
    .from(comments)
    .where(eq(comments.pokemonName, pokemon))
    .orderBy(comments.createdAt);
}
