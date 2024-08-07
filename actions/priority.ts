"use server";
import { db } from "@/db";
export async function getPriorities() {
  try {
    const data = await db.query.Priorities.findMany();
    return data;
  } catch (error) {
    throw new Error(JSON.stringify(error));
  }
}
