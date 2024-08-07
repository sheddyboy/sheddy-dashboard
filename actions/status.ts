"use server";
import { db } from "@/db";
import { eq } from "drizzle-orm";
import * as schema from "@/db/schema";
export async function getStatuses(projectId: number) {
  try {
    const data = await db.query.Statuses.findMany({
      where: eq(schema.Statuses.projectId, projectId),
    });
    return data;
  } catch (error) {
    throw new Error(JSON.stringify(error));
  }
}
