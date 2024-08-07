"use server";
import * as schema from "@/db/schema";
import { db } from "@/db";
import { and, eq } from "drizzle-orm";

export async function getTask(taskSlug: string) {
  try {
    const data = await db.query.Tasks.findFirst({
      where: eq(schema.Tasks.slug, taskSlug),

      with: {
        objectives: { columns: { name: true, value: true, id: true } },
        comments: {
          columns: { comment: true, id: true },
          with: { user: { columns: { name: true, profilePicture: true } } },
        },
        priority: { columns: { id: true, name: true } },
        status: { columns: { id: true, name: true } },
        assignee: { columns: { id: true, name: true, profilePicture: true } },
        project: { columns: { name: true, id: true } },
      },
    });
    if (!data) throw new Error("not found");
    return data;
  } catch (error) {
    throw new Error(JSON.stringify(error));
  }
}

export async function getTasks() {
  try {
    const data = await db.query.Tasks.findMany();
    return data;
  } catch (error) {
    throw new Error(JSON.stringify(error));
  }
}

export async function getTaskByProjectAndStatus(
  projectId: number,
  statusId: number,
) {
  try {
    const data = await db.query.Tasks.findMany({
      where: and(
        eq(schema.Tasks.projectId, projectId),
        eq(schema.Tasks.statusId, statusId),
      ),
      with: {
        priority: true,
        status: true,
        project: { with: { profileProjects: true } },
      },
    });
    return data;
  } catch (error) {
    throw new Error(JSON.stringify(error));
  }
}
