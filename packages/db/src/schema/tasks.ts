import {
  boolean,
  integer,
  pgTable,
  text,
  timestamp,
} from "drizzle-orm/pg-core";
import { user } from "./auth";
import { goal } from "./goals";
import { project } from "./projects";

export const task = pgTable("task", {
  id: text("id").primaryKey(),
  userId: text("user_id")
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),
  goalId: text("goal_id").references(() => goal.id, { onDelete: "set null" }),
  projectId: text("project_id").references(() => project.id, {
    onDelete: "set null",
  }),
  parentTaskId: text("parent_task_id"), // For subtasks
  title: text("title").notNull(),
  description: text("description"),
  status: text("status").notNull().default("todo"), // 'todo', 'in_progress', 'completed', 'cancelled'
  priority: text("priority").notNull().default("medium"), // 'low', 'medium', 'high'
  isPriorityTask: boolean("is_priority_task").notNull().default(false), // Max 3 per day
  dueDate: timestamp("due_date"),
  scheduledFor: timestamp("scheduled_for"), // Time-blocked in calendar
  estimatedMinutes: integer("estimated_minutes"),
  actualMinutes: integer("actual_minutes"),
  completedAt: timestamp("completed_at"),
  isRecurring: boolean("is_recurring").notNull().default(false),
  recurringPattern: text("recurring_pattern"), // JSON string for recurrence rules
  isPrivate: boolean("is_private").notNull().default(false),
  aiParsedFrom: text("ai_parsed_from"), // Original natural language input
  source: text("source").notNull().default("manual"), // 'manual', 'ai_chat', 'email', 'calendar'
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

export const taskTag = pgTable("task_tag", {
  id: text("id").primaryKey(),
  userId: text("user_id")
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),
  name: text("name").notNull(),
  color: text("color").notNull().default("#6B7280"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const taskToTag = pgTable("task_to_tag", {
  taskId: text("task_id")
    .notNull()
    .references(() => task.id, { onDelete: "cascade" }),
  tagId: text("tag_id")
    .notNull()
    .references(() => taskTag.id, { onDelete: "cascade" }),
});
