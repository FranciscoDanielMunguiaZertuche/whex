import {
  boolean,
  integer,
  pgTable,
  text,
  timestamp,
} from "drizzle-orm/pg-core";

const DEFAULT_WORK_START = 9;
const DEFAULT_WORK_END = 17;
const DEFAULT_WEEK_START = 1;

export const user = pgTable("user", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull().unique(),
  emailVerified: boolean("email_verified").notNull(),
  image: text("image"),
  northStar: text("north_star"), // Purpose statement from onboarding
  coreValues: text("core_values"), // JSON array of values
  peakEnergyHours: text("peak_energy_hours"), // JSON array like ["9", "10", "11"]
  workingHoursStart: integer("working_hours_start").default(DEFAULT_WORK_START), // 9am
  workingHoursEnd: integer("working_hours_end").default(DEFAULT_WORK_END), // 5pm
  aiPersonality: text("ai_personality").default("balanced"), // 'supportive', 'balanced', 'direct'
  weekStartDay: integer("week_start_day").default(DEFAULT_WEEK_START), // 0=Sunday, 1=Monday
  subscriptionTier: text("subscription_tier").default("free"), // 'free', 'premium'
  createdAt: timestamp("created_at").notNull(),
  updatedAt: timestamp("updated_at").notNull(),
});
export const session = pgTable("session", {
  id: text("id").primaryKey(),
  expiresAt: timestamp("expires_at").notNull(),
  token: text("token").notNull().unique(),
  createdAt: timestamp("created_at").notNull(),
  updatedAt: timestamp("updated_at").notNull(),
  ipAddress: text("ip_address"),
  userAgent: text("user_agent"),
  userId: text("user_id")
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),
});

export const account = pgTable("account", {
  id: text("id").primaryKey(),
  accountId: text("account_id").notNull(),
  providerId: text("provider_id").notNull(),
  userId: text("user_id")
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),
  accessToken: text("access_token"),
  refreshToken: text("refresh_token"),
  idToken: text("id_token"),
  accessTokenExpiresAt: timestamp("access_token_expires_at"),
  refreshTokenExpiresAt: timestamp("refresh_token_expires_at"),
  scope: text("scope"),
  password: text("password"),
  createdAt: timestamp("created_at").notNull(),
  updatedAt: timestamp("updated_at").notNull(),
});

export const verification = pgTable("verification", {
  id: text("id").primaryKey(),
  identifier: text("identifier").notNull(),
  value: text("value").notNull(),
  expiresAt: timestamp("expires_at").notNull(),
  createdAt: timestamp("created_at"),
  updatedAt: timestamp("updated_at"),
});
