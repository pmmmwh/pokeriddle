CREATE TABLE IF NOT EXISTS "comments" (
	"id" serial PRIMARY KEY NOT NULL,
	"createdAt" timestamp DEFAULT now() NOT NULL,
	"pokemonName" text NOT NULL,
	"content" text NOT NULL,
	"userId" text NOT NULL,
	"userName" text NOT NULL
);
--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "pokemon_name_idx" ON "comments" ("pokemonName");