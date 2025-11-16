import { drizzle } from "drizzle-orm/node-postgres";
import { account, session, user, verification } from "./schema/auth";
import { communicationItem, emailThread } from "./schema/communications";
import { event, eventRecurrence } from "./schema/events";
import { goal, goalMilestone, goalReview } from "./schema/goals";
import { aiContext, conversation, message } from "./schema/messages";
import {
  focusSession,
  project,
  unlockedReward,
  userStreak,
} from "./schema/projects";
import { task, taskTag, taskToTag } from "./schema/tasks";

const schema = {
  user,
  session,
  account,
  verification,
  goal,
  goalMilestone,
  goalReview,
  project,
  task,
  taskTag,
  taskToTag,
  event,
  eventRecurrence,
  conversation,
  message,
  aiContext,
  emailThread,
  communicationItem,
  focusSession,
  userStreak,
  unlockedReward,
};

export const db = drizzle(process.env.DATABASE_URL || "", { schema });

// biome-ignore lint/performance/noBarrelFile: Required for central export point
export { account, session, user, verification } from "./schema/auth";
export { communicationItem, emailThread } from "./schema/communications";
export { event, eventRecurrence } from "./schema/events";
export { goal, goalMilestone, goalReview } from "./schema/goals";
export { aiContext, conversation, message } from "./schema/messages";
export {
  focusSession,
  project,
  unlockedReward,
  userStreak,
} from "./schema/projects";
export { task, taskTag, taskToTag } from "./schema/tasks";
