import "./load-env";

import { migrate } from "drizzle-orm/neon-http/migrator";

import { db } from "../lib/drizzle";

void migrate(db, { migrationsFolder: "./migrations" });
