import { boolean, pgTable, text, timestamp } from "drizzle-orm/pg-core";
import { user } from "./auth";
import { task } from "./tasks";

export const emailThread = pgTable("email_thread", {
  id: text("id").primaryKey(),
  userId: text("user_id")
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),
  taskId: text("task_id").references(() => task.id, { onDelete: "set null" }),
  externalThreadId: text("external_thread_id").notNull(), // Gmail/Outlook thread ID
  subject: text("subject").notNull(),
  participants: text("participants").notNull(), // JSON array of email addresses
  snippet: text("snippet"), // Preview text
  lastMessageAt: timestamp("last_message_at").notNull(),
  aiPriority: text("ai_priority").notNull().default("medium"), // 'low', 'medium', 'high', 'urgent'
  aiSummary: text("ai_summary"), // AI-generated summary
  aiActionItems: text("ai_action_items"), // JSON array of extracted action items
  isInInbox: boolean("is_in_inbox").notNull().default(true), // Show in Today inbox
  isDismissed: boolean("is_dismissed").notNull().default(false),
  requiresResponse: boolean("requires_response").notNull().default(false),
  emailSource: text("email_source").notNull(), // 'gmail', 'outlook'
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

export const communicationItem = pgTable("communication_item", {
  id: text("id").primaryKey(),
  userId: text("user_id")
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),
  taskId: text("task_id").references(() => task.id, { onDelete: "set null" }),
  itemType: text("item_type").notNull(), // 'slack', 'teams', 'sms', 'whatsapp', 'other'
  externalId: text("external_id"),
  title: text("title").notNull(),
  content: text("content"),
  sender: text("sender").notNull(),
  receivedAt: timestamp("received_at").notNull(),
  aiPriority: text("ai_priority").notNull().default("medium"),
  aiSummary: text("ai_summary"),
  isInInbox: boolean("is_in_inbox").notNull().default(true),
  isDismissed: boolean("is_dismissed").notNull().default(false),
  requiresResponse: boolean("requires_response").notNull().default(false),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});
