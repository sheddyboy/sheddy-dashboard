"use server";
import { db } from "@/db";
import { faker } from "@faker-js/faker";
import { SupabaseClient, User } from "@supabase/supabase-js";

export async function getUsers() {
  try {
    const data = await db.query.Profiles.findMany();
    return data;
  } catch (error) {
    throw new Error(JSON.stringify(error));
  }
}

export async function createDummyUsers(
  number: number,
  supabase: SupabaseClient<any, "public", any>,
) {
  const userDetails = Array.from({ length: number }).map(() => {
    const name = faker.person.firstName();
    return {
      name,
      email: faker.internet.email({ firstName: name }),
      password: "test@test.com",
    };
  });
  let arrayOfUsers: User[] = [];
  for (let { email, password, name } of userDetails) {
    const {
      data: { user },
      error,
    } = await supabase.auth.signUp({
      email,
      password,
      options: { data: { name } },
    });
    user && arrayOfUsers.push(user);
    error && console.log("error(createDummyUsers):", error);
  }
  return arrayOfUsers;
}
