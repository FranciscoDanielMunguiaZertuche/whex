import {
  boolean,
  integer,
  pgTable,
  text,
  timestamp,
} from "drizzle-orm/pg-core";
import { user } from "./auth";

export const project = pgTable("project", {
  id: text("id").primaryKey(),
  userId: text("user_id")
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),
  name: text("name").notNull(),
  icon: text("icon").default("📊"),
  color: text("color").default("#3B82F6"),
  status: text("status").notNull().default("active"), // 'active', 'archived'
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

export const focusSession = pgTable("focus_session", {
  id: text("id").primaryKey(),
  userId: text("user_id")
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),
  taskId: text("task_id"),
  durationMinutes: integer("duration_minutes").notNull(),
  completed: boolean("completed").notNull().default(false),
  startedAt: timestamp("started_at").notNull(),
  completedAt: timestamp("completed_at"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const userStreak = pgTable("user_streak", {
  id: text("id").primaryKey(),
  userId: text("user_id")
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),
  streakType: text("streak_type").notNull(), // 'priority', 'goal', 'habit'
  currentStreak: integer("current_streak").notNull().default(0),
  longestStreak: integer("longest_streak").notNull().default(0),
  lastActivityDate: timestamp("last_activity_date"),
  freezesAvailable: integer("freezes_available").notNull().default(0),
  isVacationMode: boolean("is_vacation_mode").notNull().default(false),
  vacationModeStart: timestamp("vacation_mode_start"),
  vacationModeEnd: timestamp("vacation_mode_end"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

export const unlockedReward = pgTable("unlocked_reward", {
  id: text("id").primaryKey(),
  userId: text("user_id")
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),
  rewardType: text("reward_type").notNull(), // 'theme', 'report', 'trial'
  rewardKey: text("reward_key").notNull(), // e.g., 'ocean_blue_theme', 'performance_analysis'
  streakMilestone: integer("streak_milestone").notNull(), // 7, 30, 90, 365
  unlockedAt: timestamp("unlocked_at").notNull().defaultNow(),
});
