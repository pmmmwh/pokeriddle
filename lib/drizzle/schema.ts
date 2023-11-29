import type { InferInsertModel, InferSelectModel } from "drizzle-orm";
import { index, pgTable, serial, text, timestamp } from "drizzle-orm/pg-core";

export const comments = pgTable(
  "comments",
  {
    id: serial("id").primaryKey(),
    createdAt: timestamp("createdAt").defaultNow().notNull(),
    pokemonName: text("pokemonName").notNull(),
    content: text("content").notNull(),
    userId: text("userId").notNull(),
    userName: text("userName").notNull(),
  },
  (table) => ({
    pokemonNameIndex: index("pokemon_name_idx").on(table.pokemonName),
  }),
);

export type Comment = InferSelectModel<typeof comments>;
export type NewComment = InferInsertModel<typeof comments>;
