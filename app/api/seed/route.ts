import { NextRequest, NextResponse } from "next/server";
import { SupabaseClient, User } from "@supabase/supabase-js";
import { faker } from "@faker-js/faker";
import { createClient } from "@/utils/supabase/server";
import { drizzle, PostgresJsDatabase } from "drizzle-orm/postgres-js";
import * as schema from "@/db/schema";
import postgres from "postgres";
import { slugify } from "@/utils";

export async function GET(req: NextRequest) {
  try {
    const client = postgres(process.env.NEXT_PUBLIC_SUPABASE_DB_URL!, {
      prepare: false,
    });
    const supabase = createClient();
    await deleteDummyUsers(supabase);
    const users = await createDummyUsers(10, supabase);
    const db = drizzle(client, { schema });
    const priorities = await createDummyPriorities(db);
    const projects = await createDummyProjects(db, 10);
    if (!projects) throw new Error("projects is null");
    const statuses = await createDummyStatuses(db, projects);
    await createDummyProfilesProjects(db, users, projects);
    priorities &&
      statuses &&
      (await createDummyTasks(users, db, priorities, statuses).then(
        async (tasks) => {
          if (tasks) {
            await createDummyObjectives(db, tasks);
            await createDummyComments(db, tasks, users);
          }
        },
      ));

    return NextResponse.json("done");
  } catch (error) {
    return NextResponse.json({ error: JSON.stringify(error) });
  }
}

async function createDummyUsers(
  number: number,
  supabase: SupabaseClient<any, "public", any>,
) {
  const userDetails = Array.from({ length: number }).map(() => {
    const name = faker.person.firstName();
    const profilePicture = faker.image.avatar();
    return {
      name,
      email: faker.internet.email({ firstName: name }),
      password: "test@test.com",
      profilePicture,
    };
  });
  let arrayOfUsers: User[] = [];
  for (let { email, password, name, profilePicture } of userDetails) {
    const {
      data: { user },
      error,
    } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { name, avatar_url: profilePicture, picture: profilePicture },
      },
    });
    user && arrayOfUsers.push(user);
    error && console.log("error(createDummyUsers):", error);
  }
  return arrayOfUsers;
}

async function deleteDummyUsers(supabase: SupabaseClient<any, "public", any>) {
  const {
    data: { users },
    error: listUsersError,
  } = await supabase.auth.admin.listUsers();

  for (let { id } of users) {
    const { data, error: deleteUserError } =
      await supabase.auth.admin.deleteUser(id);
    deleteUserError && console.log("deleteUserError:", deleteUserError);
  }
  listUsersError && console.log("listUsersError:", listUsersError);
}

async function createDummyPriorities(db: PostgresJsDatabase<typeof schema>) {
  try {
    const data = await db
      .insert(schema.Priorities)
      .values([
        { name: "Low", slug: "low" },
        { name: "Medium", slug: "medium" },
        { name: "High", slug: "high" },
      ])
      .returning({ id: schema.Priorities.id });
    return data;
  } catch (error) {
    console.log("createDummyPriorities(insert error)", error);
    return null;
  }
}

async function createDummyStatuses(
  db: PostgresJsDatabase<typeof schema>,
  projects: { id: number }[],
) {
  try {
    const data: { projectId: number; statusIds: number[] }[] = [];
    for (const { id } of projects) {
      const statusIds = await db
        .insert(schema.Statuses)
        .values([
          { name: "TO DO", projectId: id },
          { name: "IN QA", projectId: id },
          { name: "DONE", projectId: id },
        ])
        .returning({ id: schema.Statuses.id });
      data.push({ projectId: id, statusIds: statusIds.map(({ id }) => id) });
    }
    return data;
  } catch (error) {
    console.log("createDummyStatuses(insert error)", error);
    return null;
  }
}

async function createDummyObjectives(
  db: PostgresJsDatabase<typeof schema>,
  tasks: { id: number }[],
) {
  try {
    const objectives: { id: number }[] = [];

    for (let task of tasks) {
      for (
        let i = 0;
        i < faker.helpers.rangeToNumber({ min: 1, max: 5 });
        i++
      ) {
        const objectiveName = faker.lorem.sentence({ min: 3, max: 5 });

        const data = await db
          .insert(schema.Objectives)
          .values({
            name: objectiveName,
            slug: faker.helpers.slugify(objectiveName),
            taskId: task.id,
            value: faker.datatype.boolean(),
          })
          .returning({ id: schema.Objectives.id });
        objectives.push(data[0]);
      }
    }

    return objectives;
  } catch (error) {
    console.log("createDummyObjectives(insert error)", error);
    return null;
  }
}

async function createDummyProjects(
  db: PostgresJsDatabase<typeof schema>,
  number: number,
) {
  try {
    const projects: { id: number }[] = [];
    for (let i = 0; i < number; i++) {
      const projectName = faker.word.words({ count: 2 });
      const slug = slugify(projectName);
      const data = await db
        .insert(schema.Projects)
        .values({
          name: projectName,
          slug,
          image: faker.image.urlPicsumPhotos(),
        })
        .returning({ id: schema.Projects.id });

      projects.push(data[0]);
    }
    return projects;
  } catch (error) {
    console.log("createDummyProjects(insert error)", error);
    return null;
  }
}

async function createDummyProfilesProjects(
  db: PostgresJsDatabase<typeof schema>,
  users: User[],
  projects: { id: number }[],
) {
  try {
    const profilesProjects: { profileId: string; projectId: number }[] = [];
    for (let { id } of projects) {
      for (let user of faker.helpers.arrayElements(users, { min: 4, max: 7 })) {
        const data = await db
          .insert(schema.ProfileProjects)
          .values({
            profileId: user.id,
            projectId: id,
          })
          .returning({
            profileId: schema.ProfileProjects.profileId,
            projectId: schema.ProfileProjects.projectId,
          });
        profilesProjects.push(data[0]);
      }
    }
    return profilesProjects;
  } catch (error) {
    console.log("createDummyProfilesProjects(insert error)", error);
    return null;
  }
}

async function createDummyComments(
  db: PostgresJsDatabase<typeof schema>,
  tasks: { id: number }[],
  users: User[],
) {
  try {
    const comments: { id: number }[] = [];

    for (let task of tasks) {
      for (
        let i = 0;
        i < faker.helpers.rangeToNumber({ min: 1, max: 5 });
        i++
      ) {
        const comment = faker.lorem.sentence({ min: 3, max: 5 });

        const data = await db
          .insert(schema.Comments)
          .values({
            comment: comment,
            userId: faker.helpers.arrayElement(users).id,
            taskId: task.id,
          })
          .returning({ id: schema.Comments.id });
        comments.push(data[0]);
      }
    }

    return comments;
  } catch (error) {
    console.log("createDummyComments(insert error)", error);
    return null;
  }
}

async function createDummyTasks(
  users: User[],
  db: PostgresJsDatabase<typeof schema>,
  priorities: { id: number }[],
  statuses: {
    projectId: number;
    statusIds: number[];
  }[],
  // projects: { id: number }[],
) {
  try {
    const tasks: { id: number }[] = [];
    for (let user of users) {
      for (
        let i = 0;
        i < faker.helpers.rangeToNumber({ min: 1, max: 5 });
        i++
      ) {
        const taskName = faker.lorem.sentence({ min: 3, max: 5 });
        const status = faker.helpers.arrayElement(statuses);
        const data = await db
          .insert(schema.Tasks)
          .values({
            name: taskName,
            slug: slugify(taskName),
            isCompleted: faker.datatype.boolean(),
            assigneeUserId: faker.helpers.arrayElement(users).id,
            projectId: status.projectId,
            dueDate: faker.date.soon(),
            priorityId: faker.helpers.arrayElement(priorities).id,
            statusId: faker.helpers.arrayElement(status.statusIds),
            description: faker.lorem.words(20),
            taskCreatorUserId: user.id,
            attachments: faker.helpers.multiple(faker.image.urlLoremFlickr),
          })
          .returning({ id: schema.Tasks.id });
        tasks.push(data[0]);
      }
    }
    return tasks;
  } catch (error) {
    console.log("createDummyTasks(insert error)", error);
    return null;
  }
}
