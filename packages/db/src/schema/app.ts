import { relations } from "drizzle-orm";
import {
  boolean,
  integer,
  json,
  pgEnum,
  pgTable,
  primaryKey,
  text,
  timestamp,
} from "drizzle-orm/pg-core";
import { user } from "./auth";

// Enums
export const taskStatusEnum = pgEnum("task_status", [
  "todo",
  "in_progress",
  "completed",
]);
export const goalStatusEnum = pgEnum("goal_status", [
  "active",
  "completed",
  "archived",
]);
export const goalTypeEnum = pgEnum("goal_type", [
  "milestone",
  "habit",
  "numeric",
]);
export const reviewTypeEnum = pgEnum("review_type", [
  "weekly",
  "monthly",
  "quarterly",
]);
export const roleEnum = pgEnum("message_role", ["user", "assistant", "system"]);
export const aiPersonalityEnum = pgEnum("ai_personality", [
  "supportive",
  "balanced",
  "direct",
]);
export const calendarDensityEnum = pgEnum("calendar_density", [
  "minimal",
  "standard",
  "detailed",
]);
export const subscriptionPlanEnum = pgEnum("subscription_plan", [
  "free",
  "premium",
]);
export const energyLevelEnum = pgEnum("energy_level", [
  "low",
  "medium",
  "high",
]);

// User Profile & Settings
export const userSettings = pgTable("user_settings", {
  userId: text("user_id")
    .primaryKey()
    .references(() => user.id, { onDelete: "cascade" }),
  theme: text("theme").default("system"),
  weekStartDay: integer("week_start_day").default(1), // 0 = Sunday, 1 = Monday
  workingHoursStart: text("working_hours_start").default("09:00"),
  workingHoursEnd: text("working_hours_end").default("17:00"),
  peakEnergyStart: text("peak_energy_start"),
  peakEnergyEnd: text("peak_energy_end"),
  timezone: text("timezone"),
  calendarDensity: calendarDensityEnum("calendar_density").default("standard"),
  aiPersonality: aiPersonalityEnum("ai_personality").default("balanced"),
  onboardingCompleted: boolean("onboarding_completed").default(false).notNull(),

  // Gamification & Streaks
  streakCount: integer("streak_count").default(0).notNull(),
  lastCompletedDate: timestamp("last_completed_date"),
  streakFreezes: integer("streak_freezes").default(0).notNull(),
  vacationModeStart: timestamp("vacation_mode_start"),
  vacationModeEnd: timestamp("vacation_mode_end"),

  // Subscription
  subscriptionPlan: subscriptionPlanEnum("subscription_plan")
    .default("free")
    .notNull(),

  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const userPurpose = pgTable("user_purpose", {
  userId: text("user_id")
    .primaryKey()
    .references(() => user.id, { onDelete: "cascade" }),
  northStar: text("north_star"),
  values: json("values").$type<string[]>(), // Array of strings
  evolutionHistory:
    json("evolution_history").$type<
      { date: string; northStar: string; values: string[] }[]
    >(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

// Projects
export const project = pgTable("project", {
  id: text("id").primaryKey(),
  userId: text("user_id")
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),
  name: text("name").notNull(),
  color: text("color"),
  icon: text("icon"),
  sortOrder: integer("sort_order").default(0),
  isArchived: boolean("is_archived").default(false).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

// Goals
export const goal = pgTable("goal", {
  id: text("id").primaryKey(),
  userId: text("user_id")
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),
  title: text("title").notNull(),
  description: text("description"),
  status: goalStatusEnum("status").default("active").notNull(),
  type: goalTypeEnum("type").default("milestone").notNull(),
  deadline: timestamp("deadline"),
  progress: integer("progress").default(0).notNull(), // 0-100

  // Numeric/Habit Goal Fields
  targetValue: integer("target_value"),
  currentValue: integer("current_value"),
  metricUnit: text("metric_unit"),
  streak: integer("streak").default(0),

  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const milestone = pgTable("milestone", {
  id: text("id").primaryKey(),
  goalId: text("goal_id")
    .notNull()
    .references(() => goal.id, { onDelete: "cascade" }),
  title: text("title").notNull(),
  isCompleted: boolean("is_completed").default(false).notNull(),
  sortOrder: integer("sort_order").default(0),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

// Tasks
export const task = pgTable("task", {
  id: text("id").primaryKey(),
  userId: text("user_id")
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),
  projectId: text("project_id").references(() => project.id, {
    onDelete: "set null",
  }),
  goalId: text("goal_id").references(() => goal.id, { onDelete: "set null" }),
  title: text("title").notNull(),
  notes: text("notes"),
  status: taskStatusEnum("status").default("todo").notNull(),
  isPriority: boolean("is_priority").default(false).notNull(),
  dueDate: timestamp("due_date"),
  isAllDay: boolean("is_all_day").default(false).notNull(),
  duration: integer("duration"), // in minutes

  // Advanced Task Features
  recurrenceRule: text("recurrence_rule"), // RRule string
  originalTaskId: text("original_task_id"), // For recurring instances
  energyLevel: energyLevelEnum("energy_level"),
  estimatedDuration: integer("estimated_duration"), // in minutes
  isPrivate: boolean("is_private").default(false).notNull(),

  completedAt: timestamp("completed_at"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const taskRelations = relations(task, ({ one, many }) => ({
  project: one(project, {
    fields: [task.projectId],
    references: [project.id],
  }),
  goal: one(goal, {
    fields: [task.goalId],
    references: [goal.id],
  }),
  originalTask: one(task, {
    fields: [task.originalTaskId],
    references: [task.id],
    relationName: "recurring_instances",
  }),
  recurringInstances: many(task, {
    relationName: "recurring_instances",
  }),
  subtasks: many(subtask),
  tags: many(taskTags),
}));

export const subtask = pgTable("subtask", {
  id: text("id").primaryKey(),
  taskId: text("task_id")
    .notNull()
    .references(() => task.id, { onDelete: "cascade" }),
  title: text("title").notNull(),
  isCompleted: boolean("is_completed").default(false).notNull(),
  sortOrder: integer("sort_order").default(0),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

// Tags
export const tag = pgTable("tag", {
  id: text("id").primaryKey(),
  userId: text("user_id")
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),
  name: text("name").notNull(),
  color: text("color"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const taskTags = pgTable(
  "task_tags",
  {
    taskId: text("task_id")
      .notNull()
      .references(() => task.id, { onDelete: "cascade" }),
    tagId: text("tag_id")
      .notNull()
      .references(() => tag.id, { onDelete: "cascade" }),
  },
  (t) => ({
    pk: primaryKey({ columns: [t.taskId, t.tagId] }),
  })
);

// Calendar Events
export const event = pgTable("event", {
  id: text("id").primaryKey(),
  userId: text("user_id")
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),
  title: text("title").notNull(),
  startTime: timestamp("start_time").notNull(),
  endTime: timestamp("end_time").notNull(),
  isAllDay: boolean("is_all_day").default(false).notNull(),
  location: text("location"),
  notes: text("notes"),
  externalId: text("external_id"),
  provider: text("provider"), // 'google', 'outlook', 'apple'
  isPrivate: boolean("is_private").default(false).notNull(),

  // Meeting Details
  meetingUrl: text("meeting_url"),
  attendees:
    json("attendees").$type<
      { name: string; email: string; status: string }[]
    >(),
  recurrenceRule: text("recurrence_rule"),

  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

// Chat
export const conversation = pgTable("conversation", {
  id: text("id").primaryKey(),
  userId: text("user_id")
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),
  title: text("title"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const message = pgTable("message", {
  id: text("id").primaryKey(),
  conversationId: text("conversation_id")
    .notNull()
    .references(() => conversation.id, { onDelete: "cascade" }),
  role: roleEnum("role").notNull(),
  content: text("content").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// Reviews
export const review = pgTable("review", {
  id: text("id").primaryKey(),
  userId: text("user_id")
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),
  type: reviewTypeEnum("type").notNull(),
  periodStart: timestamp("period_start").notNull(),
  periodEnd: timestamp("period_end").notNull(),
  content: json("content"), // Structured review data
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// AI Assistants
export const aiAssistant = pgTable("ai_assistant", {
  id: text("id").primaryKey(),
  userId: text("user_id")
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),
  name: text("name").notNull(),
  type: text("type").notNull(), // 'email_digest', 'meeting_prep', etc.
  isEnabled: boolean("is_enabled").default(true).notNull(),
  config: json("config"), // Custom prompts, settings
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

// Relations
export const userRelations = relations(user, ({ one, many }) => ({
  settings: one(userSettings, {
    fields: [user.id],
    references: [userSettings.userId],
  }),
  purpose: one(userPurpose, {
    fields: [user.id],
    references: [userPurpose.userId],
  }),
  projects: many(project),
  goals: many(goal),
  tasks: many(task),
  tags: many(tag),
  events: many(event),
  conversations: many(conversation),
  reviews: many(review),
  assistants: many(aiAssistant),
}));

export const projectRelations = relations(project, ({ many }) => ({
  tasks: many(task),
}));

export const goalRelations = relations(goal, ({ many }) => ({
  milestones: many(milestone),
  tasks: many(task),
}));

export const milestoneRelations = relations(milestone, ({ one }) => ({
  goal: one(goal, {
    fields: [milestone.goalId],
    references: [goal.id],
  }),
}));

export const subtaskRelations = relations(subtask, ({ one }) => ({
  task: one(task, {
    fields: [subtask.taskId],
    references: [task.id],
  }),
}));

export const tagRelations = relations(tag, ({ many }) => ({
  tasks: many(taskTags),
}));

export const taskTagsRelations = relations(taskTags, ({ one }) => ({
  task: one(task, {
    fields: [taskTags.taskId],
    references: [task.id],
  }),
  tag: one(tag, {
    fields: [taskTags.tagId],
    references: [tag.id],
  }),
}));

export const conversationRelations = relations(conversation, ({ many }) => ({
  messages: many(message),
}));

export const messageRelations = relations(message, ({ one }) => ({
  conversation: one(conversation, {
    fields: [message.conversationId],
    references: [conversation.id],
  }),
}));
