import {
  boolean,
  integer,
  pgTable,
  text,
  timestamp,
} from "drizzle-orm/pg-core";
import { user } from "./auth";
import { task } from "./tasks";

export const event = pgTable("event", {
  id: text("id").primaryKey(),
  userId: text("user_id")
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),
  taskId: text("task_id").references(() => task.id, { onDelete: "set null" }),
  title: text("title").notNull(),
  description: text("description"),
  location: text("location"),
  startTime: timestamp("start_time").notNull(),
  endTime: timestamp("end_time").notNull(),
  allDay: boolean("all_day").notNull().default(false),
  isPrivate: boolean("is_private").notNull().default(false),
  isTimeBlocked: boolean("is_time_blocked").notNull().default(false), // AI-created time blocks
  eventType: text("event_type").notNull().default("event"), // 'event', 'meeting', 'focus_time', 'break'
  calendarSource: text("calendar_source"), // 'google', 'outlook', 'manual'
  externalEventId: text("external_event_id"), // For synced calendar events
  attendees: text("attendees"), // JSON array of attendee emails
  meetingLink: text("meeting_link"),
  reminderMinutes: integer("reminder_minutes"),
  status: text("status").notNull().default("confirmed"), // 'tentative', 'confirmed', 'cancelled'
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

export const eventRecurrence = pgTable("event_recurrence", {
  id: text("id").primaryKey(),
  eventId: text("event_id")
    .notNull()
    .references(() => event.id, { onDelete: "cascade" }),
  recurrencePattern: text("recurrence_pattern").notNull(), // JSON string for RRULE
  startDate: timestamp("start_date").notNull(),
  endDate: timestamp("end_date"),
  exceptions: text("exceptions"), // JSON array of exception dates
  createdAt: timestamp("created_at").notNull().defaultNow(),
});
