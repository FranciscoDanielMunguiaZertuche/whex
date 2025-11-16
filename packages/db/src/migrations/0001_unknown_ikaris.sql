CREATE TABLE "goal_milestone" (
	"id" text PRIMARY KEY NOT NULL,
	"goal_id" text NOT NULL,
	"title" text NOT NULL,
	"order" integer NOT NULL,
	"is_completed" boolean DEFAULT false NOT NULL,
	"completed_at" timestamp,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "focus_session" (
	"id" text PRIMARY KEY NOT NULL,
	"user_id" text NOT NULL,
	"task_id" text,
	"duration_minutes" integer NOT NULL,
	"completed" boolean DEFAULT false NOT NULL,
	"started_at" timestamp NOT NULL,
	"completed_at" timestamp,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "project" (
	"id" text PRIMARY KEY NOT NULL,
	"user_id" text NOT NULL,
	"name" text NOT NULL,
	"icon" text DEFAULT '📊',
	"color" text DEFAULT '#3B82F6',
	"status" text DEFAULT 'active' NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "unlocked_reward" (
	"id" text PRIMARY KEY NOT NULL,
	"user_id" text NOT NULL,
	"reward_type" text NOT NULL,
	"reward_key" text NOT NULL,
	"streak_milestone" integer NOT NULL,
	"unlocked_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "user_streak" (
	"id" text PRIMARY KEY NOT NULL,
	"user_id" text NOT NULL,
	"streak_type" text NOT NULL,
	"current_streak" integer DEFAULT 0 NOT NULL,
	"longest_streak" integer DEFAULT 0 NOT NULL,
	"last_activity_date" timestamp,
	"freezes_available" integer DEFAULT 0 NOT NULL,
	"is_vacation_mode" boolean DEFAULT false NOT NULL,
	"vacation_mode_start" timestamp,
	"vacation_mode_end" timestamp,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "user" ADD COLUMN "north_star" text;--> statement-breakpoint
ALTER TABLE "user" ADD COLUMN "core_values" text;--> statement-breakpoint
ALTER TABLE "user" ADD COLUMN "peak_energy_hours" text;--> statement-breakpoint
ALTER TABLE "user" ADD COLUMN "working_hours_start" integer DEFAULT 9;--> statement-breakpoint
ALTER TABLE "user" ADD COLUMN "working_hours_end" integer DEFAULT 17;--> statement-breakpoint
ALTER TABLE "user" ADD COLUMN "ai_personality" text DEFAULT 'balanced';--> statement-breakpoint
ALTER TABLE "user" ADD COLUMN "week_start_day" integer DEFAULT 1;--> statement-breakpoint
ALTER TABLE "user" ADD COLUMN "subscription_tier" text DEFAULT 'free';--> statement-breakpoint
ALTER TABLE "goal" ADD COLUMN "current_value" integer;--> statement-breakpoint
ALTER TABLE "goal" ADD COLUMN "target_value" integer;--> statement-breakpoint
ALTER TABLE "goal" ADD COLUMN "streak_count" integer DEFAULT 0;--> statement-breakpoint
ALTER TABLE "task" ADD COLUMN "project_id" text;--> statement-breakpoint
ALTER TABLE "task" ADD COLUMN "parent_task_id" text;--> statement-breakpoint
ALTER TABLE "goal_milestone" ADD CONSTRAINT "goal_milestone_goal_id_goal_id_fk" FOREIGN KEY ("goal_id") REFERENCES "public"."goal"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "focus_session" ADD CONSTRAINT "focus_session_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "project" ADD CONSTRAINT "project_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "unlocked_reward" ADD CONSTRAINT "unlocked_reward_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "user_streak" ADD CONSTRAINT "user_streak_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "task" ADD CONSTRAINT "task_project_id_project_id_fk" FOREIGN KEY ("project_id") REFERENCES "public"."project"("id") ON DELETE set null ON UPDATE no action;