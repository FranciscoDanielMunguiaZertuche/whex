# Database Schema Alignment with PRD

## Overview
The database schema has been aligned with the comprehensive Product Requirements Document (PRD). This document details all tables, their purpose, and how they support the features outlined in the PRD.

## Schema Summary

### Total Tables: 21
- **Authentication:** 4 tables (user, session, account, verification)
- **Goals & Milestones:** 3 tables (goal, goalMilestone, goalReview)
- **Tasks:** 3 tables (task, taskTag, taskToTag)
- **Projects:** 1 table (project)
- **Calendar:** 2 tables (event, eventRecurrence)
- **AI Chat:** 3 tables (conversation, message, aiContext)
- **Communications:** 2 tables (emailThread, communicationItem)
- **Progress Tracking:** 3 tables (focusSession, userStreak, unlockedReward)

---

## Table Definitions

### 1. Authentication Tables

#### `user`
**Purpose:** User profiles with AI preferences and work patterns

**Key Fields:**
- `id`, `name`, `email`, `emailVerified`, `image` - Standard auth fields
- `northStar` - User's life purpose statement (PRD: Purpose-driven foundation)
- `coreValues` - JSON array of user values (PRD: Values alignment)
- `peakEnergyHours` - JSON array of high-energy time blocks (PRD: Energy-aware scheduling)
- `workingHoursStart`, `workingHoursEnd` - Work schedule bounds (PRD: Working hours respect)
- `aiPersonality` - AI mentor tone ('coach', 'mentor', 'friend')
- `weekStartDay` - Calendar week start preference (1-7)
- `subscriptionTier` - 'free' or 'premium' (PRD: Tiered model)

**PRD Alignment:**
- ✅ Purpose & Values (Section: Core Concepts)
- ✅ Energy-aware scheduling (Section: Calendar Intelligence)
- ✅ AI personality customization (Section: AI Mentor)
- ✅ Subscription tiers (Section: Pricing)

#### `session`, `account`, `verification`
**Purpose:** Better Auth session management and OAuth providers

---

### 2. Goals System

#### `goal`
**Purpose:** Hierarchical goal system from life purpose to weekly goals

**Key Fields:**
- `type` - 'purpose', 'annual', 'quarterly', 'monthly', 'weekly', 'milestone', 'habit', 'numeric'
- `status` - 'active', 'completed', 'archived'
- `parentGoalId` - Creates goal hierarchy (PRD: Hierarchical goals)
- `progress` - 0-100 completion percentage
- `currentValue`, `targetValue` - For numeric goals (e.g., $5000 of $10000 revenue)
- `streakCount` - For habit tracking (PRD: Habit goals)
- `isPrivate` - Exclude from AI context

**PRD Alignment:**
- ✅ Hierarchical goal structure (Section: Goals & Progress)
- ✅ Multiple goal types including habits and numeric (Section: Goal Types)
- ✅ Privacy controls (Section: Privacy-First)

#### `goalMilestone`
**Purpose:** Break down goals into ordered checkpoints

**Key Fields:**
- `goalId` - Parent goal reference
- `order` - Sequence of milestone
- `isCompleted` - Completion status
- `completedAt` - Timestamp

**PRD Alignment:**
- ✅ Goal milestones for complex goals (Section: Goals & Progress)

#### `goalReview`
**Purpose:** Structured weekly/monthly/quarterly reviews

**Key Fields:**
- `reviewType` - 'weekly', 'monthly', 'quarterly', 'annual'
- `notes`, `achievements`, `challenges`, `adjustments` - Review content
- `aiSummary` - AI-generated review summary (PRD: AI-powered reviews)

**PRD Alignment:**
- ✅ Structured review system (Section: Weekly/Monthly Reviews)
- ✅ AI-assisted reflection (Section: AI Mentor)

---

### 3. Task System

#### `task`
**Purpose:** Daily tasks with AI parsing, time-blocking, and project links

**Key Fields:**
- `goalId` - Link to parent goal
- `projectId` - Link to project (NEW: PRD alignment)
- `parentTaskId` - For subtasks (NEW: PRD alignment)
- `status` - 'todo', 'in_progress', 'completed', 'cancelled'
- `priority` - 'low', 'medium', 'high'
- `isPriorityTask` - Maximum 3 per day (PRD: Priority task limit)
- `scheduledFor` - Time-blocked calendar slot
- `estimatedMinutes`, `actualMinutes` - Time tracking
- `isRecurring`, `recurringPattern` - Recurring tasks
- `aiParsedFrom` - Original natural language input (PRD: Natural language capture)
- `source` - 'manual', 'ai_chat', 'email', 'calendar'
- `isPrivate` - Exclude from AI context

**PRD Alignment:**
- ✅ Priority task limit (max 3/day) (Section: Today Screen)
- ✅ Natural language task capture (Section: Quick Add)
- ✅ Time-blocking integration (Section: Calendar)
- ✅ Subtask support via parentTaskId (Section: Task Management)
- ✅ Project organization (Section: Projects)

#### `taskTag`
**Purpose:** Custom tags for task organization (e.g., #urgent, #waiting)

#### `taskToTag`
**Purpose:** Many-to-many relationship between tasks and tags

---

### 4. Projects

#### `project`
**Purpose:** Organizational containers separate from goals (NEW: PRD alignment)

**Key Fields:**
- `name` - Project name (e.g., "Whex SaaS MVP", "Marketing & Growth")
- `icon` - Emoji icon
- `color` - Hex color for visual grouping
- `status` - 'active', 'archived'

**PRD Alignment:**
- ✅ Projects as organizational containers (Section: Task Management)
- ✅ Visual project grouping (Section: UI/UX)

**Use Case:** Tasks can belong to both a Goal (strategic alignment) and a Project (organizational grouping)

---

### 5. Calendar System

#### `event`
**Purpose:** Calendar events with external sync and time-blocking

**Key Fields:**
- `taskId` - Link to associated task (time-blocked task)
- `startTime`, `endTime`, `allDay` - Event timing
- `isTimeBlocked` - Indicates task time-blocking vs external event
- `eventType` - 'focus_time', 'meeting', 'personal', 'travel'
- `calendarSource` - 'manual', 'google', 'outlook', 'apple'
- `externalEventId` - For two-way calendar sync (PRD: External calendar sync)
- `meetingLink`, `attendees` - Meeting details
- `isPrivate` - Exclude from AI context

**PRD Alignment:**
- ✅ Time-blocking for priority tasks (Section: Calendar Intelligence)
- ✅ External calendar sync (Google/Outlook/Apple) (Section: Integrations)
- ✅ Meeting details and links (Section: Event Management)

#### `eventRecurrence`
**Purpose:** Recurring event patterns (daily standup, weekly review)

---

### 6. AI Chat System

#### `conversation`
**Purpose:** AI Mentor chat sessions with metadata

**Key Fields:**
- `title` - Conversation summary
- `isArchived` - Archive old conversations
- `lastMessageAt` - For sorting

**PRD Alignment:**
- ✅ AI Mentor chat interface (Section: Chat Tab)

#### `message`
**Purpose:** Individual messages in conversations

**Key Fields:**
- `conversationId` - Parent conversation
- `role` - 'user' or 'assistant'
- `content` - Message text
- `aiModel` - 'gpt-4o', 'gpt-4.5-preview', 'claude-opus-4.1' (PRD: Multiple AI models)
- `tokensUsed` - Token tracking for usage limits
- `actionTaken` - JSON of actions (e.g., {"type": "create_task", "taskId": "..."})

**PRD Alignment:**
- ✅ Multi-model AI support (Section: AI Mentor)
- ✅ Action tracking (task creation, goal updates) (Section: AI Actions)
- ✅ Token usage tracking (Section: Free vs Premium)

#### `aiContext`
**Purpose:** Snapshots of user context for AI conversations

**Key Fields:**
- `conversationId` - Associated conversation
- `contextType` - 'full', 'partial', 'goals_only', 'schedule_only'
- `contextData` - JSON snapshot of relevant user data
- `tokenCount` - Size of context

**PRD Alignment:**
- ✅ Context-aware AI (Section: Full-Context AI)
- ✅ Privacy controls (exclude private items) (Section: Privacy-First)

---

### 7. Communications

#### `emailThread`
**Purpose:** Email threads from connected accounts

**Key Fields:**
- `source` - 'gmail', 'outlook'
- `externalThreadId` - For syncing
- `subject`, `snippet` - Email preview
- `participants` - JSON array of email addresses
- `aiPriority` - 'high', 'medium', 'low' (PRD: AI email triage)
- `aiSummary` - AI-generated summary (PRD: AI email summaries)
- `isActionable` - Requires response/action
- `actionType` - 'reply_needed', 'info_only', 'task_suggested'

**PRD Alignment:**
- ✅ Email integration (Gmail/Outlook) (Section: Communications)
- ✅ AI email prioritization (Section: AI Triage)
- ✅ AI summaries (Section: AI Features)
- ✅ Action suggestions (Section: Unified Inbox)

#### `communicationItem`
**Purpose:** Other communication items (Slack, SMS, etc.)

**Similar fields to emailThread for multi-channel support**

**PRD Alignment:**
- ✅ Multi-channel communication (Section: Future: Slack, SMS)

---

### 8. Progress Tracking

#### `focusSession`
**Purpose:** Track deep work focus sessions (NEW: PRD alignment)

**Key Fields:**
- `taskId` - Associated task
- `durationMinutes` - Session length (25, 50, 90 minutes)
- `completed` - Whether session completed or interrupted
- `startedAt`, `completedAt` - Session timestamps

**PRD Alignment:**
- ✅ Focus time tracking (Section: Focus Sessions)
- ✅ Productivity analytics (Section: Performance Reports)

#### `userStreak`
**Purpose:** Track user streaks and gamification (NEW: PRD alignment)

**Key Fields:**
- `streakType` - 'priority', 'goal', 'habit'
- `currentStreak` - Current consecutive days
- `longestStreak` - All-time best
- `lastActivityDate` - For streak calculation
- `freezesAvailable` - Streak freeze tokens (PRD: Streak protection)
- `isVacationMode` - Pause streaks during vacation
- `vacationModeStart`, `vacationModeEnd` - Vacation dates

**PRD Alignment:**
- ✅ Streak system with freezes (Section: Gamification)
- ✅ Vacation mode (Section: User Experience)
- ✅ Multiple streak types (Section: Progress Tracking)

#### `unlockedReward`
**Purpose:** Rewards unlocked through streaks (NEW: PRD alignment)

**Key Fields:**
- `rewardType` - 'theme', 'report', 'trial'
- `rewardKey` - Specific reward identifier
- `streakMilestone` - Streak length that unlocked it (7, 30, 90, 365 days)

**PRD Alignment:**
- ✅ Streak-based rewards (Section: Gamification)
- ✅ Premium feature trials (Section: Monetization)

---

## Schema Completeness Checklist

### Core Features (PRD Section 3)
- ✅ User authentication with Better Auth
- ✅ AI Mentor chat with message history
- ✅ Hierarchical goal system (purpose → annual → quarterly → monthly → weekly)
- ✅ Task management with priority limits
- ✅ Calendar with time-blocking
- ✅ Email/communication integration
- ✅ Natural language task capture

### Advanced Features (PRD Section 4)
- ✅ Goal milestones and subtasks
- ✅ Habit and numeric goal types
- ✅ Project organization
- ✅ Focus session tracking
- ✅ Streak system with rewards
- ✅ AI context management
- ✅ Privacy controls (isPrivate fields)
- ✅ External calendar sync (externalEventId)
- ✅ Email prioritization and summaries

### User Experience (PRD Section 5)
- ✅ User preferences (AI personality, work hours, energy patterns)
- ✅ Subscription tiers
- ✅ Vacation mode
- ✅ Week start preference
- ✅ Custom tags

### Technical Requirements (PRD Section 8)
- ✅ All tables have proper foreign keys with cascade deletes
- ✅ Timestamps (createdAt, updatedAt) on all primary tables
- ✅ Privacy flags where needed (isPrivate)
- ✅ JSON fields for flexible data (coreValues, contextData, etc.)
- ✅ Status fields for state management
- ✅ External sync support (externalEventId, externalThreadId)

---

## Migration Status

### Generated Migrations
1. `0000_sparkling_terror.sql` - Initial schema (auth, goals, tasks, events, messages, communications)
2. `0001_unknown_ikaris.sql` - PRD alignment (projects, milestones, focus sessions, streaks, user profile fields)

### Applied to Database
✅ All migrations applied successfully via `bun db:push`

### Seed Data
✅ Comprehensive seed script includes:
- Test user (alex@example.com) with profile data
- 4 hierarchical goals (purpose → annual → monthly → weekly)
- 3 projects (SaaS MVP, Marketing, Personal)
- 4 goal milestones
- 6 tasks linked to goals and projects
- 4 calendar events
- AI conversation with 4 messages
- 4 task tags
- 2 focus sessions
- 2 user streaks (priority: 7 days, habit: 21 days)
- 2 unlocked rewards (theme at 7 days, report at 21 days)

---

## Next Steps for API Development

### Priority 1: Update Existing Routers
1. **Task Router** - Add project filtering, subtask queries
2. **Goal Router** - Add milestone operations
3. **Event Router** - Add time-blocking helpers

### Priority 2: Create New Routers
1. **Project Router** - CRUD operations, task listing
2. **Focus Session Router** - Start/complete sessions, analytics
3. **Streak Router** - Get current streaks, freeze management, rewards
4. **Communication Router** - Email/message listing, AI triage

### Priority 3: Mobile UI Updates
1. **Today Screen** - Add project badges, subtask display
2. **Chat Screen** - Integrate with conversation/message tables
3. **You Screen** - Display streaks and unlocked rewards
4. **Calendar Screen** - Show time-blocked tasks, focus sessions

---

## Schema Design Decisions

### Why Projects AND Goals?
- **Goals** = Strategic alignment ("What am I working toward?")
- **Projects** = Organizational grouping ("What bucket does this belong in?")
- A task can be part of "Launch SaaS product" (goal) AND "Marketing & Growth" (project)

### Why Separate Focus Sessions?
- Enables productivity analytics (total focus time, focus consistency)
- Supports streak calculations
- Tracks interruptions vs completions
- Foundation for AI coaching ("You focused for 3 hours yesterday, great job!")

### Why Streak System with Freezes?
- PRD explicitly mentions gamification and streak protection
- Prevents discouragement from breaking streaks during travel/illness
- Vacation mode maintains engagement without pressure
- Rewards create dopamine loops for habit formation

### Why AI Context Table?
- Snapshots prevent context drift in long conversations
- Token tracking for cost management
- Privacy: Rebuild context excluding private items
- Performance: Pre-computed context vs real-time queries

---

## Performance Considerations

### Indexes (Future Enhancement)
Add indexes for common queries:
- `task(userId, status, isPriorityTask, dueDate)` - Today screen
- `goal(userId, parentGoalId, status)` - Goal hierarchy
- `event(userId, startTime, endTime)` - Calendar queries
- `message(conversationId, createdAt)` - Chat history
- `userStreak(userId, streakType, lastActivityDate)` - Streak calculations

### Query Optimization
- Use Drizzle's `with` for goal hierarchy (recursive CTE)
- Paginate message history and communication items
- Cache user preferences (northStar, coreValues, etc.)
- Lazy-load AI context only when needed

---

## Conclusion

The database schema is now **fully aligned with the PRD** and includes all 21 tables necessary to support:
- 5-level hierarchical goals with milestones
- Project-based task organization with subtasks
- AI-powered chat with full context awareness
- Calendar intelligence with time-blocking
- Email/communication triage
- Focus session tracking
- Streak system with rewards and vacation mode
- User preferences for AI personalization
- Privacy controls throughout
- External integrations (Google Calendar, Gmail, Outlook)

All seed data has been successfully loaded and the schema is ready for API development and mobile UI implementation.
