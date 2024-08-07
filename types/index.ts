import { Table } from "drizzle-orm";
import * as schema from "@/db/schema";

type SchemaTypes<TSchema extends Record<string, Table | any>> = {
  [key in keyof TSchema & string as TSchema[key] extends Table
    ? Capitalize<key>
    : never]: TSchema[key]["$inferSelect"];
} & {
  [key in keyof TSchema & string as TSchema[key] extends Table
    ? `New${Capitalize<key>}`
    : never]: TSchema[key]["$inferInsert"];
};

export type DatabaseSchema = SchemaTypes<typeof schema>;
