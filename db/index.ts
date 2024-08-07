import { config } from "dotenv";
import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import * as schema from "@/db/schema";

config({ path: ".env.local" });

const client = postgres(process.env.NEXT_PUBLIC_SUPABASE_DB_URL!, {
  prepare: false,
});
export const db = drizzle(client, { schema });
