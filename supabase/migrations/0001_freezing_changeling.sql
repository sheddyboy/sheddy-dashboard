ALTER TABLE "statuses" DROP CONSTRAINT "statuses_slug_unique";--> statement-breakpoint
ALTER TABLE "statuses" ADD COLUMN "project_id" integer NOT NULL;--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "statuses" ADD CONSTRAINT "statuses_project_id_projects_id_fk" FOREIGN KEY ("project_id") REFERENCES "public"."projects"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
ALTER TABLE "statuses" DROP COLUMN IF EXISTS "slug";