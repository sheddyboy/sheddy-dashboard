"use server";
import { db } from "@/db";
import { eq } from "drizzle-orm";
import * as schema from "@/db/schema";

export async function getProjects() {
  try {
    const data = await db.query.Projects.findMany({
      with: {
        profileProjects: {
          with: {
            profile: true,
          },
        },
        tasks: { columns: { id: true } },
      },
    });
    return data;
  } catch (error) {
    throw new Error(JSON.stringify(error));
  }
}

export async function getProjectDetails(id: number) {
  try {
    const data = await db.query.Projects.findFirst({
      where: eq(schema.Projects.id, id),
      with: {
        profileProjects: {
          with: {
            profile: true,
          },
        },
        statuses: true,
      },
    });
    if (!data) {
      throw new Error();
    }
    return data;
  } catch (error) {
    throw new Error(JSON.stringify(error));
  }
}
