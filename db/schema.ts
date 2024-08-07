import { relations, sql } from "drizzle-orm";
import {
  boolean,
  date,
  integer,
  pgSchema,
  pgTable,
  serial,
  text,
  timestamp,
  uuid,
} from "drizzle-orm/pg-core";

const authSchema = pgSchema("auth");

export const Users = authSchema.table("users", {
  id: uuid("id").primaryKey(),
});

export const Profiles = pgTable("profiles", {
  id: uuid("id")
    .primaryKey()
    .references(() => Users.id, { onDelete: "cascade" }),
  name: text("name"),
  profilePicture: text("profile_picture"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at", { mode: "date", precision: 3 })
    .defaultNow()
    .notNull()
    .$onUpdate(() => new Date()),
});

export const profileRelations = relations(Profiles, ({ one, many }) => ({
  tasksCreated: many(Tasks, { relationName: "tasks_created" }),
  tasksAssigned: many(Tasks, { relationName: "tasks_assigned" }),
  comments: many(Comments),
  profileProjects: many(ProfileProjects),
}));

export const Projects = pgTable("projects", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  slug: text("slug").notNull().unique(),
  image: text("image"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at", { mode: "date", precision: 3 })
    .defaultNow()
    .notNull()
    .$onUpdate(() => new Date()),
});

export const projectsRelations = relations(Projects, ({ one, many }) => ({
  tasks: many(Tasks),
  profileProjects: many(ProfileProjects),
  statuses: many(Statuses),
}));

export const ProfileProjects = pgTable("profiles_projects", {
  profileId: uuid("profile_id")
    .notNull()
    .references(() => Profiles.id, { onDelete: "cascade" }),
  projectId: integer("project_id")
    .notNull()
    .references(() => Projects.id, { onDelete: "cascade" }),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at", { mode: "date", precision: 3 })
    .defaultNow()
    .notNull()
    .$onUpdate(() => new Date()),
});

export const profileProjectsRelations = relations(
  ProfileProjects,
  ({ one, many }) => ({
    project: one(Projects, {
      fields: [ProfileProjects.projectId],
      references: [Projects.id],
    }),
    profile: one(Profiles, {
      fields: [ProfileProjects.profileId],
      references: [Profiles.id],
    }),
  }),
);

export const Tasks = pgTable("tasks", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  slug: text("slug").notNull().unique(),
  isCompleted: boolean("is_completed").notNull().default(false),
  assigneeUserId: uuid("assignee").references(() => Profiles.id, {
    onDelete: "set null",
  }),
  projectId: integer("project_id").references(() => Projects.id, {
    onDelete: "cascade",
  }),
  taskCreatorUserId: uuid("task_creator").references(() => Profiles.id, {
    onDelete: "set null",
  }),
  dueDate: date("due_date", { mode: "date" }),
  priorityId: integer("priority_id").references(() => Priorities.id, {
    onDelete: "set null",
  }),
  statusId: integer("status_id").references(() => Statuses.id, {
    onDelete: "set null",
  }),
  description: text("description"),
  attachments: text("attachments")
    .array()
    .notNull()
    .default(sql`'{}'::text[]`),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at", { mode: "date", precision: 3 })
    .defaultNow()
    .notNull()
    .$onUpdate(() => new Date()),
});

export const tasksRelations = relations(Tasks, ({ one, many }) => ({
  objectives: many(Objectives),
  comments: many(Comments),
  assignee: one(Profiles, {
    fields: [Tasks.assigneeUserId],
    references: [Profiles.id],
  }),
  taskCreator: one(Profiles, {
    fields: [Tasks.taskCreatorUserId],
    references: [Profiles.id],
  }),
  status: one(Statuses, {
    fields: [Tasks.statusId],
    references: [Statuses.id],
  }),
  priority: one(Priorities, {
    fields: [Tasks.priorityId],
    references: [Priorities.id],
  }),
  project: one(Projects, {
    fields: [Tasks.projectId],
    references: [Projects.id],
  }),
}));

export const Objectives = pgTable("objectives", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  slug: text("slug").notNull().unique(),
  value: boolean("value").notNull().default(false),
  taskId: integer("task_id")
    .references(() => Tasks.id, { onDelete: "cascade" })
    .notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at", { mode: "date", precision: 3 })
    .defaultNow()
    .notNull()
    .$onUpdate(() => new Date()),
});

export const objectivesRelations = relations(Objectives, ({ one, many }) => ({
  task: one(Tasks, { fields: [Objectives.taskId], references: [Tasks.id] }),
}));

export const Comments = pgTable("comments", {
  id: serial("id").primaryKey(),
  userId: uuid("user_id")
    .references(() => Profiles.id, { onDelete: "cascade" })
    .notNull(),
  comment: text("comment").notNull(),
  taskId: integer("task_id")
    .references(() => Tasks.id, { onDelete: "cascade" })
    .notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at", { mode: "date", precision: 3 })
    .defaultNow()
    .notNull()
    .$onUpdate(() => new Date()),
});

export const commentsRelations = relations(Comments, ({ one, many }) => ({
  task: one(Tasks, { fields: [Comments.taskId], references: [Tasks.id] }),
  user: one(Profiles, { fields: [Comments.userId], references: [Profiles.id] }),
}));

export const Priorities = pgTable("priorities", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  slug: text("slug").notNull().unique(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at", { mode: "date", precision: 3 })
    .defaultNow()
    .notNull()
    .$onUpdate(() => new Date()),
});

export const prioritiesRelations = relations(Priorities, ({ one, many }) => ({
  tasks: many(Tasks),
}));

export const Statuses = pgTable("statuses", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  projectId: integer("project_id")
    .references(() => Projects.id, { onDelete: "cascade" })
    .notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at", { mode: "date", precision: 3 })
    .defaultNow()
    .notNull()
    .$onUpdate(() => new Date()),
});

export const statusesRelations = relations(Statuses, ({ one, many }) => ({
  project: one(Projects, {
    fields: [Statuses.projectId],
    references: [Projects.id],
  }),
  tasks: many(Tasks),
}));
