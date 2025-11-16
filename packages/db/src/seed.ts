import dotenv from "dotenv";
import { drizzle } from "drizzle-orm/node-postgres";
import path from "node:path";
import { user } from "./schema/auth";
import { event } from "./schema/events";
import { goal, goalMilestone } from "./schema/goals";
import { conversation, message } from "./schema/messages";
import {
	focusSession,
	project,
	unlockedReward,
	userStreak,
} from "./schema/projects";
import { task, taskTag, taskToTag } from "./schema/tasks";

dotenv.config({
	path: path.resolve(__dirname, "../../../apps/server/.env"),
});

const db = drizzle(process.env.DATABASE_URL || "");

const seedUser = async () => {
  const [testUser] = await db
    .insert(user)
    .values({
      id: "test-user-1",
      name: "Alex Chen",
      email: "alex@example.com",
      emailVerified: true,
      image: null,
      createdAt: new Date(),
      updatedAt: new Date(),
    })
    .returning();
  return testUser;
};

const seedGoals = async (userId: string) => {
  const goals = await db
    .insert(goal)
    .values([
      {
        id: "goal-1",
        userId,
        title: "Build a sustainable lifestyle business",
        description:
          "Create multiple income streams while maintaining work-life balance and personal health",
        type: "purpose",
        status: "active",
        parentGoalId: null,
        targetDate: null,
        completedAt: null,
        progress: 35,
        isPrivate: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: "goal-2",
        userId,
        title: "Launch SaaS product to 100 paying customers",
        description:
          "Complete MVP and reach first 100 paying customers by Q4 2025",
        type: "annual",
        status: "active",
        parentGoalId: "goal-1",
        targetDate: new Date("2025-12-31"),
        completedAt: null,
        progress: 45,
        isPrivate: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: "goal-3",
        userId,
        title: "Ship core features for beta launch",
        description:
          "Complete authentication, dashboard, and AI integration for beta",
        type: "monthly",
        status: "active",
        parentGoalId: "goal-2",
        targetDate: new Date("2025-11-30"),
        completedAt: null,
        progress: 60,
        isPrivate: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: "goal-4",
        userId,
        title: "Run 3x per week consistently",
        description: "Maintain fitness routine with 5K runs 3 times weekly",
        type: "weekly",
        status: "active",
        parentGoalId: null,
        targetDate: null,
        completedAt: null,
        progress: 70,
        isPrivate: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ])
    .returning();
  return goals;
};

const seedTasks = async (userId: string) => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);

  // biome-ignore lint/style/noMagicNumbers: Magic numbers acceptable in seed data for time calculations
  const tasks = await db
    .insert(task)
    .values([
      {
        id: "task-1",
        userId,
        goalId: "goal-3",
        projectId: "project-1",
        parentTaskId: null,
        title: "Implement user authentication flow",
        description:
          "Complete OAuth integration with Google and GitHub providers",
        status: "in_progress",
        priority: "high",
        isPriorityTask: true,
        dueDate: today,
        scheduledFor: new Date(today.getTime() + 9 * 60 * 60 * 1000), // 9am today
        estimatedMinutes: 120,
        actualMinutes: null,
        completedAt: null,
        isRecurring: false,
        recurringPattern: null,
        isPrivate: false,
        aiParsedFrom: null,
        source: "manual",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: "task-2",
        userId,
        goalId: "goal-3",
        projectId: "project-1",
        parentTaskId: null,
        title: "Design dashboard wireframes",
        description:
          "Create low-fi wireframes for main dashboard views in Figma",
        status: "todo",
        priority: "high",
        isPriorityTask: true,
        dueDate: today,
        scheduledFor: new Date(today.getTime() + 14 * 60 * 60 * 1000), // 2pm today
        estimatedMinutes: 90,
        actualMinutes: null,
        completedAt: null,
        isRecurring: false,
        recurringPattern: null,
        isPrivate: false,
        aiParsedFrom: "need to sketch out the dashboard layout before coding",
        source: "ai_chat",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: "task-3",
        userId,
        goalId: "goal-2",
        projectId: "project-2",
        parentTaskId: null,
        title: "Schedule investor call with Sarah",
        description: "Follow up on last week's intro and schedule 30min call",
        status: "todo",
        priority: "high",
        isPriorityTask: true,
        dueDate: today,
        scheduledFor: null,
        estimatedMinutes: 15,
        actualMinutes: null,
        completedAt: null,
        isRecurring: false,
        recurringPattern: null,
        isPrivate: false,
        aiParsedFrom: "remind me to call Sarah about investment",
        source: "ai_chat",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: "task-4",
        userId,
        goalId: null,
        projectId: "project-1",
        parentTaskId: null,
        title: "Review pull requests from team",
        description: "Code review for authentication and API endpoints PRs",
        status: "todo",
        priority: "medium",
        isPriorityTask: false,
        dueDate: today,
        scheduledFor: null,
        estimatedMinutes: 45,
        actualMinutes: null,
        completedAt: null,
        isRecurring: false,
        recurringPattern: null,
        isPrivate: false,
        aiParsedFrom: null,
        source: "manual",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: "task-5",
        userId,
        goalId: "goal-4",
        projectId: "project-3",
        parentTaskId: null,
        title: "Morning run (5K)",
        description: "Usual route through the park",
        status: "completed",
        priority: "medium",
        isPriorityTask: false,
        dueDate: today,
        scheduledFor: new Date(today.getTime() + 6 * 60 * 60 * 1000), // 6am today
        estimatedMinutes: 30,
        actualMinutes: 28,
        completedAt: new Date(today.getTime() + 6.5 * 60 * 60 * 1000),
        isRecurring: true,
        recurringPattern: JSON.stringify({
          frequency: "weekly",
          days: ["mon", "wed", "fri"],
        }),
        isPrivate: true,
        aiParsedFrom: null,
        source: "manual",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: "task-6",
        userId,
        goalId: null,
        projectId: "project-2",
        parentTaskId: null,
        title: "Prepare Q4 financial projections",
        description: "Update revenue forecast and burn rate model",
        status: "todo",
        priority: "medium",
        isPriorityTask: false,
        dueDate: tomorrow,
        scheduledFor: null,
        estimatedMinutes: 120,
        actualMinutes: null,
        completedAt: null,
        isRecurring: false,
        recurringPattern: null,
        isPrivate: false,
        aiParsedFrom: null,
        source: "manual",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ])
    .returning();
  return tasks;
};

const seedEvents = async (userId: string) => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  // biome-ignore lint/style/noMagicNumbers: Magic numbers acceptable in seed data for time calculations
  const events = await db
    .insert(event)
    .values([
      {
        id: "event-1",
        userId,
        taskId: "task-1",
        title: "Deep work: Authentication implementation",
        description: "Time-blocked focus session for OAuth integration",
        location: null,
        startTime: new Date(today.getTime() + 9 * 60 * 60 * 1000), // 9am
        endTime: new Date(today.getTime() + 11 * 60 * 60 * 1000), // 11am
        allDay: false,
        isPrivate: false,
        isTimeBlocked: true,
        eventType: "focus_time",
        calendarSource: "manual",
        externalEventId: null,
        attendees: null,
        meetingLink: null,
        reminderMinutes: 15,
        status: "confirmed",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: "event-2",
        userId,
        taskId: null,
        title: "Team standup",
        description: "Daily sync with engineering team",
        location: null,
        startTime: new Date(today.getTime() + 10 * 60 * 60 * 1000), // 10am
        endTime: new Date(today.getTime() + 10.25 * 60 * 60 * 1000), // 10:15am
        allDay: false,
        isPrivate: false,
        isTimeBlocked: false,
        eventType: "meeting",
        calendarSource: "google",
        externalEventId: "google-event-123",
        attendees: JSON.stringify(["team@example.com"]),
        meetingLink: "https://meet.google.com/abc-defg-hij",
        reminderMinutes: 10,
        status: "confirmed",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: "event-3",
        userId,
        taskId: "task-2",
        title: "Design work: Dashboard wireframes",
        description: "Time-blocked for UI/UX work",
        location: null,
        startTime: new Date(today.getTime() + 14 * 60 * 60 * 1000), // 2pm
        endTime: new Date(today.getTime() + 15.5 * 60 * 60 * 1000), // 3:30pm
        allDay: false,
        isPrivate: false,
        isTimeBlocked: true,
        eventType: "focus_time",
        calendarSource: "manual",
        externalEventId: null,
        attendees: null,
        meetingLink: null,
        reminderMinutes: 15,
        status: "confirmed",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: "event-4",
        userId,
        taskId: null,
        title: "Lunch with mentor",
        description: "Monthly check-in at downtown cafe",
        location: "Blue Bottle Coffee, 5th Ave",
        startTime: new Date(today.getTime() + 12 * 60 * 60 * 1000), // 12pm
        endTime: new Date(today.getTime() + 13 * 60 * 60 * 1000), // 1pm
        allDay: false,
        isPrivate: true,
        isTimeBlocked: false,
        eventType: "event",
        calendarSource: "manual",
        externalEventId: null,
        attendees: JSON.stringify(["mentor@example.com"]),
        meetingLink: null,
        reminderMinutes: 30,
        status: "confirmed",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ])
    .returning();
  return events;
};

const seedConversation = async (userId: string) => {
  const [conv] = await db
    .insert(conversation)
    .values({
      id: "conv-1",
      userId,
      title: "Getting started with Whex",
      lastMessageAt: new Date(),
      createdAt: new Date(),
      updatedAt: new Date(),
    })
    .returning();

  if (!conv) {
    throw new Error("Failed to create conversation");
  }

  const messages = await db
    .insert(message)
    .values([
      {
        id: "msg-1",
        conversationId: conv.id,
        userId,
        role: "user",
        content:
          "Hi! I need help organizing my week. I have a product launch coming up and feeling overwhelmed.",
        aiModel: null,
        tokenCount: null,
        contextIncluded: null,
        responseTimeMs: null,
        createdAt: new Date(Date.now() - 60_000),
      },
      {
        id: "msg-2",
        conversationId: conv.id,
        userId,
        role: "assistant",
        content:
          "I understand you're feeling overwhelmed with your product launch. Let's break this down together. Based on your goals, you're working toward 100 paying customers by year-end. What are the most critical tasks for this week's launch?",
        aiModel: "gpt-4o",
        tokenCount: 156,
        contextIncluded: JSON.stringify(["goals", "tasks", "calendar"]),
        responseTimeMs: 1450,
        createdAt: new Date(Date.now() - 45_000),
      },
      {
        id: "msg-3",
        conversationId: conv.id,
        userId,
        role: "user",
        content:
          "I need to finish the authentication, design the dashboard, and talk to that investor Sarah introduced me to.",
        aiModel: null,
        tokenCount: null,
        contextIncluded: null,
        responseTimeMs: null,
        createdAt: new Date(Date.now() - 30_000),
      },
      {
        id: "msg-4",
        conversationId: conv.id,
        userId,
        role: "assistant",
        content:
          "Perfect. I've identified your three priority tasks for today:\n\n1. **Implement authentication** (High priority, 2h)\n2. **Design dashboard wireframes** (High priority, 1.5h)\n3. **Schedule call with Sarah** (High priority, 15min)\n\nI've time-blocked the first two in your calendar at 9am and 2pm. The call to Sarah should just take a few minutes - want me to suggest when to fit that in?",
        aiModel: "gpt-4o",
        tokenCount: 198,
        contextIncluded: JSON.stringify(["goals", "tasks", "calendar"]),
        responseTimeMs: 1620,
        createdAt: new Date(Date.now() - 15_000),
      },
    ])
    .returning();
  return { conv, messages };
};

const seedTags = async (userId: string) => {
  const tags = await db
    .insert(taskTag)
    .values([
      {
        id: "tag-1",
        userId,
        name: "Engineering",
        color: "#3B82F6",
        createdAt: new Date(),
      },
      {
        id: "tag-2",
        userId,
        name: "Design",
        color: "#8B5CF6",
        createdAt: new Date(),
      },
      {
        id: "tag-3",
        userId,
        name: "Business",
        color: "#10B981",
        createdAt: new Date(),
      },
      {
        id: "tag-4",
        userId,
        name: "Health",
        color: "#EF4444",
        createdAt: new Date(),
      },
    ])
    .returning();

  // Link tags to tasks
  await db.insert(taskToTag).values([
    { taskId: "task-1", tagId: "tag-1" },
    { taskId: "task-2", tagId: "tag-2" },
    { taskId: "task-3", tagId: "tag-3" },
    { taskId: "task-4", tagId: "tag-1" },
    { taskId: "task-5", tagId: "tag-4" },
    { taskId: "task-6", tagId: "tag-3" },
  ]);
  return tags;
};

const seedProjects = async (userId: string) => {
  const projects = await db
    .insert(project)
    .values([
      {
        id: "project-1",
        userId,
        name: "Whex SaaS MVP",
        icon: "🚀",
        color: "#3B82F6",
        status: "active",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: "project-2",
        userId,
        name: "Marketing & Growth",
        icon: "📈",
        color: "#10B981",
        status: "active",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: "project-3",
        userId,
        name: "Personal Development",
        icon: "💪",
        color: "#EF4444",
        status: "active",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ])
    .returning();
  return projects;
};

const seedMilestones = async () => {
  const milestones = await db
    .insert(goalMilestone)
    .values([
      {
        id: "milestone-1",
        goalId: "goal-2",
        title: "Complete MVP feature set",
        order: 1,
        isCompleted: true,
        completedAt: new Date("2025-01-15"),
        createdAt: new Date(),
      },
      {
        id: "milestone-2",
        goalId: "goal-2",
        title: "Launch beta to 10 test users",
        order: 2,
        isCompleted: true,
        completedAt: new Date("2025-03-01"),
        createdAt: new Date(),
      },
      {
        id: "milestone-3",
        goalId: "goal-2",
        title: "Reach first 50 paying customers",
        order: 3,
        isCompleted: false,
        completedAt: null,
        createdAt: new Date(),
      },
      {
        id: "milestone-4",
        goalId: "goal-2",
        title: "Hit 100 customers milestone",
        order: 4,
        isCompleted: false,
        completedAt: null,
        createdAt: new Date(),
      },
    ])
    .returning();
  return milestones;
};

const seedFocusSessions = async (userId: string) => {
  const yesterday = new Date();
  // biome-ignore lint/style/noMagicNumbers: Magic numbers acceptable in seed data for time calculations
  yesterday.setDate(yesterday.getDate() - 1);
  yesterday.setHours(9, 0, 0, 0);

  const sessions = await db
    .insert(focusSession)
    .values([
      {
        id: "session-1",
        userId,
        taskId: "task-1",
        // biome-ignore lint/style/noMagicNumbers: Magic numbers acceptable in seed data for time calculations
        durationMinutes: 90,
        completed: true,
        startedAt: yesterday,
        // biome-ignore lint/style/noMagicNumbers: Magic numbers acceptable in seed data for time calculations
        completedAt: new Date(yesterday.getTime() + 90 * 60 * 1000),
        createdAt: yesterday,
      },
      {
        id: "session-2",
        userId,
        taskId: "task-2",
        // biome-ignore lint/style/noMagicNumbers: Magic numbers acceptable in seed data for time calculations
        durationMinutes: 60,
        completed: true,
        // biome-ignore lint/style/noMagicNumbers: Magic numbers acceptable in seed data for time calculations
        startedAt: new Date(yesterday.getTime() + 120 * 60 * 1000),
        // biome-ignore lint/style/noMagicNumbers: Magic numbers acceptable in seed data for time calculations
        completedAt: new Date(yesterday.getTime() + 180 * 60 * 1000),
        // biome-ignore lint/style/noMagicNumbers: Magic numbers acceptable in seed data for time calculations
        createdAt: new Date(yesterday.getTime() + 120 * 60 * 1000),
      },
    ])
    .returning();
  return sessions;
};

const seedStreaks = async (userId: string) => {
  const streaks = await db
    .insert(userStreak)
    .values([
      {
        id: "streak-1",
        userId,
        streakType: "priority",
        // biome-ignore lint/style/noMagicNumbers: Magic numbers acceptable in seed data for time calculations
        currentStreak: 7,
        // biome-ignore lint/style/noMagicNumbers: Magic numbers acceptable in seed data for time calculations
        longestStreak: 14,
        lastActivityDate: new Date(),
        freezesAvailable: 2,
        isVacationMode: false,
        vacationModeStart: null,
        vacationModeEnd: null,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: "streak-2",
        userId,
        streakType: "habit",
        // biome-ignore lint/style/noMagicNumbers: Magic numbers acceptable in seed data for time calculations
        currentStreak: 21,
        // biome-ignore lint/style/noMagicNumbers: Magic numbers acceptable in seed data for time calculations
        longestStreak: 28,
        lastActivityDate: new Date(),
        freezesAvailable: 1,
        isVacationMode: false,
        vacationModeStart: null,
        vacationModeEnd: null,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ])
    .returning();

  // Unlock some rewards based on streaks
  await db.insert(unlockedReward).values([
    {
      id: "reward-1",
      userId,
      rewardType: "theme",
      rewardKey: "ocean_blue_theme",
      // biome-ignore lint/style/noMagicNumbers: Magic numbers acceptable in seed data for time calculations
      streakMilestone: 7,
      unlockedAt: new Date(),
    },
    {
      id: "reward-2",
      userId,
      rewardType: "report",
      rewardKey: "performance_analysis",
      // biome-ignore lint/style/noMagicNumbers: Magic numbers acceptable in seed data for time calculations
      streakMilestone: 21,
      unlockedAt: new Date(),
    },
  ]);

  return streaks;
};

const main = async () => {
  try {
    console.log("🌱 Starting database seeding...");
    const testUser = await seedUser();
    if (!testUser) {
      throw new Error("Failed to create test user");
    }
    console.log("✅ User seeded");
    await seedGoals(testUser.id);
    console.log("✅ Goals seeded");
    await seedProjects(testUser.id);
    console.log("✅ Projects seeded");
    await seedMilestones();
    console.log("✅ Milestones seeded");
    await seedTasks(testUser.id);
    console.log("✅ Tasks seeded");
    await seedEvents(testUser.id);
    console.log("✅ Events seeded");
    await seedConversation(testUser.id);
    console.log("✅ Conversation seeded");
    await seedTags(testUser.id);
    console.log("✅ Tags seeded");
    await seedFocusSessions(testUser.id);
    console.log("✅ Focus sessions seeded");
    await seedStreaks(testUser.id);
    console.log("✅ Streaks seeded");
    console.log("\n✅ Database seeded successfully!");
    process.exit(0);
  } catch (error) {
    console.error("❌ Seeding failed:", error);
    process.exit(1);
  }
};

main();
