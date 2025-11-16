import {
  boolean,
  integer,
  pgTable,
  text,
  timestamp,
} from "drizzle-orm/pg-core";
import { user } from "./auth";

export const goal = pgTable("goal", {
  id: text("id").primaryKey(),
  userId: text("user_id")
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),
  title: text("title").notNull(),
  description: text("description"),
  type: text("type").notNull(), // 'purpose', 'annual', 'quarterly', 'monthly', 'weekly', 'milestone', 'habit', 'numeric'
  status: text("status").notNull().default("active"), // 'active', 'completed', 'archived'
  parentGoalId: text("parent_goal_id"), // For goal hierarchy
  targetDate: timestamp("target_date"),
  completedAt: timestamp("completed_at"),
  progress: integer("progress").notNull().default(0), // 0-100
  currentValue: integer("current_value"), // For numeric goals (e.g., $5000 of $10000)
  targetValue: integer("target_value"), // For numeric goals
  streakCount: integer("streak_count").default(0), // For habit goals
  isPrivate: boolean("is_private").notNull().default(false),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

export const goalMilestone = pgTable("goal_milestone", {
  id: text("id").primaryKey(),
  goalId: text("goal_id")
    .notNull()
    .references(() => goal.id, { onDelete: "cascade" }),
  title: text("title").notNull(),
  order: integer("order").notNull(),
  isCompleted: boolean("is_completed").notNull().default(false),
  completedAt: timestamp("completed_at"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const goalReview = pgTable("goal_review", {
  id: text("id").primaryKey(),
  goalId: text("goal_id")
    .notNull()
    .references(() => goal.id, { onDelete: "cascade" }),
  userId: text("user_id")
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),
  reviewType: text("review_type").notNull(), // 'weekly', 'monthly', 'quarterly', 'annual'
  notes: text("notes"),
  achievements: text("achievements"),
  challenges: text("challenges"),
  adjustments: text("adjustments"),
  aiSummary: text("ai_summary"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});
