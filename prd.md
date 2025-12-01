# Product Requirements Document: Unified Productivity App

**Document Status:** Final Specification  
**Last Updated:** November 1, 2025  
**Document Version:** 2.0  
**Platform:** iOS (iPhone) - Mobile First

---

## 1. Executive Summary

### 1.1 Vision
To create the world's most intelligent productivity companion that eliminates cognitive overload and context-switching. An AI-powered app that unifies life orchestration (purpose, goals, values) with daily execution (tasks, calendar, communications), delivered through a proactive, conversational interface.

### 1.2 The Problem
Modern knowledge workers face two critical challenges:
1. **Fragmentation:** Work is scattered across email, chat, calendars, and task managers
2. **Misalignment:** Daily actions are disconnected from long-term purpose and goals

Current productivity apps are either:
- Passive lists waiting for input (traditional task managers)
- Purpose-focused but lack tactical execution tools
- Execution-focused but ignore the "why" behind the work

### 1.3 The Solution
A unified mobile app with 5 core screens that acts as both a **Cognitive Co-pilot** (handles daily execution) and **Life Architect** (maintains alignment with purpose). The AI has full context of the user's purpose, goals, schedule, notes, and communications to proactively guide decisions and eliminate low-value work.

### 1.4 Core Differentiation
- **Full-Context AI:** Knows your purpose, values, goals, calendar, tasks, and communications
- **Proactive Intelligence:** Suggests actions, optimizes schedules, and flags misalignment
- **Unified Interface:** One app for everything from life purpose to email triage
- **Conversational Control:** Natural language for all inputs and AI customization

---

## 2. Core Philosophy & Design Principles

### 2.1 Philosophy
- **Focused Flexibility:** Clear priorities + comprehensive visibility = nothing falls through cracks
- **Intelligent Simplicity:** Complex life management through deceptively simple interface
- **Proactive, Not Reactive:** Anticipate needs, don't just record them
- **Unified, Not Siloed:** Tasks, emails, meetings, and goals are all interconnected work

### 2.2 Design Principles
1. **Context-Aware:** Interface adapts to user's current mode (planning, doing, reflecting)
2. **Progressive Disclosure:** Power is hidden; surface stays clean and calm
3. **Thumb-Driven:** All core actions accessible in one-handed, bottom-screen zone
4. **Purpose-First:** Every feature must either help complete priorities OR strengthen purpose alignment

### 2.3 The Ultimate Filter
Before building any feature, we ask:
1. Does this help users complete their priority tasks?
2. Does this strengthen connection to purpose and values?
3. Does this simplify or complicate the user's day?
4. Can the AI handle this proactively?

---

## 3. Target Audience & User Personas

### Primary Persona: "The Overwhelmed Achiever"
- **Profile:** 28-45 years old, ambitious professional (manager, entrepreneur, consultant)
- **Current Behavior:** 
  - Juggles 3-5 major projects
  - 8+ meetings per day
  - Lives across email, Slack, calendar, and a task app
  - Has goals but struggles to connect daily work to them
- **Pain Point:** "I start my day anxious, drowning in messages. I know what I *should* do (my big goals) but I'm always doing what *seems* urgent. I need one app that keeps me aligned AND gets shit done."
- **Success Looks Like:** Opens one app in the morning, sees 3 clear priorities with full context, completes them feeling aligned with purpose.

### Secondary Persona: "The Intentional Organizer"
- **Profile:** 22-35 years old, freelancer, grad student, or solo entrepreneur
- **Current Behavior:**
  - Highly motivated, reads productivity books
  - Uses journals, notion, calendar, and lists
  - Nothing is connected
- **Pain Point:** "I know my purpose and I have goals, but my calendar is chaos. I want one powerful tool that manages both my 'why' and my 'what'."
- **Success Looks Like:** Completes weekly reviews, hits goal milestones, maintains streaks, feels progress.

---

## 4. Success Metrics

### 4.1 User Success Metrics
- **Retention:** Day 1 (60%), Day 7 (40%), Day 30 (25%), Day 90 (15%)
- **Purpose Connection:** % of users who complete "North Star" conversation (target: 70%)
- **Engagement:**
  - Average daily sessions: 3-5
  - Average streak length: 14 days
  - % completing weekly reviews: 40%
- **AI Adoption:**
  - % using Chat screen daily: 60%
  - % accepting AI suggestions: 50%
  - AI conversation quality rating: 4.2/5

### 4.2 Business Success Metrics
- **Free-to-Paid Conversion:** 8% within 30 days
- **Monthly Recurring Revenue (MRR):** Track growth
- **Churn Rate:** <5% monthly for paid users

### 4.3 Product Health Metrics
- **Daily Active Users (DAU)**
- **Integration Adoption:** % connecting at least one external service (target: 60%)
- **Feature Adoption:**
  - Calendar sync usage: 80%
  - Today Unified Inbox engagement: 70%
  - AI Assistants activation: 30%

---

## 5. App Navigation Structure

### 5.1 Bottom Navigation Bar (5 Tabs)
The app uses Instagram-style bottom navigation for thumb-friendly, instant context switching:

```
┌─────────────────────────────────────────┐
│ [☰]                        [Screen Title] │ ← Hamburger menu on every screen
│                                         │
│         [Current Screen Content]        │
│                                         │
│                                         │
└─────────────────────────────────────────┘
  [Chat] [Tasks] [+] [Notes] [Calendar]
```

| Tab | Icon | Label | Primary Function |
|-----|------|-------|------------------|
| 1 | 💬 | Chat | AI Mentor for guidance, planning, reflection |
| 2 | ✓ | Tasks | Unified inbox + daily priorities |
| 3 | ➕ | + | Quick capture modal (overlay) |
| 4 | 📝 | Notes | Personal notes, memories, and knowledge capture |
| 5 | 📅 | Calendar | Full calendar + task time-blocking |

**Navigation Rules:**
- Active tab is highlighted with accent color
- Tapping active tab scrolls to top
- The "+" button opens a modal overlay (doesn't navigate)
- All screens support pull-to-refresh
- Smooth transitions (<200ms) between tabs

### 5.2 Hamburger Menu (Drawer Navigation)
Accessible from every screen via the hamburger icon (☰) in the top-left corner:

```
┌─────────────────────────────────────────┐
│ ┌─────────────────────────────────────┐ │
│ │                                     │ │
│ │    🔍 Search                        │ │
│ │    ─────────────────────────       │ │
│ │    📊 Goals & Projects              │ │
│ │    🤖 AI Assistants                 │ │
│ │    ⚙️ Settings                       │ │
│ │    ❓ Help & Support                │ │
│ │                                     │ │
│ │                                     │ │
│ │                                     │ │
│ │    ─────────────────────────       │ │
│ │    ┌─────┐                         │ │
│ │    │ 👤  │  John Smith             │ │ ← Profile section at bottom
│ │    │     │  john@email.com         │ │
│ │    └─────┘  View Profile →         │ │
│ └─────────────────────────────────────┘ │
└─────────────────────────────────────────┘
```

**Drawer Contents:**
- **Search:** Universal search across tasks, notes, events, and AI chat
- **Goals & Projects:** Quick access to goal tracking and project management (also accessible on You screen)
- **AI Assistants:** Manage automation recipes and AI behaviors
- **Settings:** Preferences, integrations, notifications
- **Help & Support:** FAQs, contact, tutorials
- **Profile Section (Bottom):** User's profile picture and name displayed at the bottom of the drawer. Tapping this section navigates to the full **You** screen with purpose, values, goals, projects, reviews, and all account settings

---

## 6. Onboarding Flow

### 6.1 First Launch Experience

**Goal:** Get user to first win (add first task) in <60 seconds, then invite to deeper setup.

**Flow:**
1. **Signup Screen**
   - Email + password OR Apple/Google SSO
   - "Welcome to [App Name]" headline
   - No multi-step forms

2. **Land on Chat Screen**
   - AI Mentor appears with: *"Welcome! I'm your AI productivity companion. What's the first thing on your mind?"*
   - User types naturally (e.g., "I need to finish the report by Friday")
   - AI processes and adds to calendar/tasks

3. **First Win Confirmation**
   - AI responds: *"Added! 'Finish report' is now scheduled for Friday. ✓"*
   - Subtle animation/celebration

4. **Invitation to Deep Setup**
   - AI: *"Great start! I can help you 10x more if I know your bigger purpose and goals. Want to spend 5 minutes defining your North Star?"*
   - [Start North Star] [Maybe Later]

5. **North Star Conversation** (if user accepts)
   - Conversational, not a form
   - AI asks:
     - "What do you want your life to be about? What's your ultimate 'why'?"
     - "What are the 3-5 core values that guide your decisions?"
     - "What's one big goal you want to achieve in the next 90 days?"
   - User types freely; AI extracts structured data
   - Ends with: *"Perfect. I'll use this to keep you aligned with what matters most."*

6. **Calendar Integration Prompt**
   - AI: *"Last thing: Connect your calendar (Google/Outlook/Apple) so I can see your full day and help you optimize it."*
   - [Connect Calendar] [Skip for Now]

7. **Onboarding Complete**
   - User lands on **Tasks screen** with their first task visible
   - Tooltip: "Tap any screen in the bottom bar to explore"

### 6.2 Optional: Guided Tour
- After onboarding, a dismissible tooltip sequence highlights:
  - **Tasks:** "Your daily command center"
  - **Notes:** "Capture thoughts, memories, and ideas"
  - **Calendar:** "Drag tasks here to time-block"
  - **+:** "Quick capture anytime"
  - **☰ Menu:** "Access your profile, goals, and settings"

---

## 7. Screen-by-Screen Feature Breakdown

## SCREEN 1: Chat (AI Mentor)

### 7.1 Overview
The Chat screen is the conversational brain of the app. It's where users interact with their AI Mentor for strategic guidance, quick tactical help, and deep reflection. The AI has full context of everything: purpose, values, goals, calendar, tasks, communications, and conversation history.

### 7.2 Layout
```
┌─────────────────────────────────────────┐
│  [Profile Icon]   Chat   [Clear History]│ ← Header
├─────────────────────────────────────────┤
│                                         │
│  [AI Avatar] "Good morning! You have    │
│  3 priority tasks today. Want to        │
│  review them?"                          │
│                                         │
│                    "Yes, show me" [User]│
│                                         │
│  [AI Avatar] "Here they are:            │
│  1. Finish Q3 report                    │
│  2. Call with Sarah at 2pm              │
│  3. Review budget proposal              │
│                                         │
│  Want me to block focus time for #1?"  │
│                                         │
│  [Quick Actions: Block Time | Postpone]│
│                                         │
│                                         │
│  ↓ Scroll for history ↓                │
│                                         │
├─────────────────────────────────────────┤
│ [🎤] [Type a message...]       [Send →] │ ← Input Bar
└─────────────────────────────────────────┘
```

### 7.3 Core Features

#### 7.3.1 Full Context Awareness
The AI has access to:
- **Purpose & Values:** User's "North Star" and guiding principles
- **Goals:** All active goals, progress, and completion history
- **Calendar:** All events (including external synced calendars)
- **Tasks:** All tasks, completion patterns, overdue items
- **Communications:** (If integrated) Actionable emails and messages
- **Energy Patterns:** User's peak/low energy times (from check-ins or settings)
- **Conversation History:** Past interactions for continuity

**Technical Implementation:**
- Context is assembled server-side before each AI response
- Maximum context window: ~20k tokens (optimized for speed)
- Privacy-sensitive events (marked "Private") appear as "Busy" blocks only

#### 7.3.2 Proactive Intelligence (Examples)

**Daily Priority Generation:**
- Every evening (8:00 PM default, customizable):
  - AI sends notification: "Tomorrow's priorities are ready to review"
  - Opens Chat with: *"Based on your goals and deadlines, here are tomorrow's top 3 priorities: [List]. Does this feel right?"*

**Schedule Optimization:**
- AI notices patterns: *"You seem more productive in mornings. I noticed 'Deep Work' tasks are often scheduled after 2 PM. Want me to suggest moving them earlier?"*

**Values Alignment Check:**
- User adds a new recurring Saturday commitment
- AI: *"This conflicts with your 'Family First' value—you've been spending Saturdays with family. Are you sure about this?"*

**Pattern Recognition:**
- AI: *"You've skipped 'Gym' three Wednesdays in a row. Want to talk about what's blocking you?"*

**Purpose Evolution:**
- After several weeks of new interests/tasks:
  - AI: *"I've noticed you're spending more time on [new topic]. Is your purpose evolving? Want to revisit your North Star?"*

#### 7.3.3 Conversation Modes

The AI adapts its tone and depth based on context:

**Mode 1: Coach/Mentor (Default)**
- Strategic guidance
- Questions that provoke reflection
- Example: *"That goal is big. What's the first tiny step you could take today?"*

**Mode 2: Assistant (Quick Tactical)**
- Fast, direct answers
- Example: *"Added to your calendar. Done."*

**Mode 3: Reflective Companion (Reviews)**
- Empathetic, thoughtful
- Example: *"You completed 15 of 18 priorities this week. What made the difference on your best days?"*

**User Control:**
- Users can set AI personality in Settings: Supportive / Balanced / Direct

#### 7.3.4 Input Methods

**Text Input:**
- Natural language processing (NLP)
- Examples:
  - "Schedule a run tomorrow at 7am"
  - "What's my most important task?"
  - "Show me my progress on the Q3 goal"
  - "Why am I so behind on Project X?"

**Voice Input:**
- Tap microphone icon
- Speech-to-text (Apple Speech Framework)
- AI processes same as text

**Quick Action Buttons:**
- Context-aware buttons appear below AI messages
- Examples:
  - [Block Focus Time]
  - [Reschedule This]
  - [Mark Complete]
  - [Add to Calendar]

#### 7.3.5 Review Facilitation

**Weekly Review (Sundays, 6:00 PM default):**
- AI sends notification: "Your weekly review is ready"
- Opens Chat with pre-filled insights:
  - *"You completed 22 of 27 tasks this week (81%)"*
  - *"Your 'Launch Campaign' goal is 60% complete—great progress!"*
  - *"You missed 'Gym' twice. What got in the way?"*
  - *"How are you feeling about the week? What was a win?"*
- User adds reflections via conversation
- AI saves structured review data

**Monthly Deep Dive (Premium):**
- Last Sunday of month
- AI generates: *"Let's review October. You've been focused on [themes]. What felt aligned? What drained energy?"*
- Longer conversation (10-15 min)

**Quarterly Purpose Check (Premium):**
- AI: *"It's been 3 months. Let's revisit your North Star. Does '[Purpose]' still resonate? What's changed?"*

### 7.4 Technical Requirements

**Performance:**
- AI response time: <2 seconds (target <1.5s)
- Message send: <100ms acknowledgment
- Scroll performance: 60fps with 1000+ messages

**AI Model:**
- Free tier: GPT-4o or Claude Sonnet (cost-optimized)
- Premium: GPT-4.5-Preview or Claude Opus 4.1 (most intelligent)

**Data Storage:**
- Conversations stored encrypted
- Retention: Full history (user can export/delete)

**Privacy:**
- User can mark specific events/tasks as "Private" (excluded from AI context)
- Clear data export in Settings

---

## SCREEN 2: Tasks (Unified Inbox + Dashboard)

### 7.5 Overview
The Tasks screen is the app's home base. It answers: **"What do I need to do and know RIGHT NOW?"** It's a unified view of the user's most important tasks, AI-curated actionable emails/messages, and a smart daily briefing.

### 7.6 Layout
```
┌─────────────────────────────────────────┐
│ [☰]         Tasks     [Filter] [•••]    │ ← Header (hamburger menu)
├─────────────────────────────────────────┤
│ ┌─────────────────────────────────────┐ │
│ │ 🌅 DAILY BRIEFING          [Tap ↗]  │ │ ← AI Card
│ │ Good morning. 3 priorities, 1       │ │
│ │ overdue, 30-min gap at 2 PM.        │ │
│ └─────────────────────────────────────┘ │
│                                         │
│ ━━━ PRIORITIES (3) ━━━                 │ ← Section
│ ┌─────────────────────────────────────┐ │
│ │ ⭐ [☐] Finish Q3 Report             │ │ ← Priority Task
│ │    📊 Work  •  Due Today 5:00 PM    │ │
│ └─────────────────────────────────────┘ │
│ ┌─────────────────────────────────────┐ │
│ │ ⭐ [☐] Review budget with CFO       │ │
│ │    💼 Finance  •  2:00 PM - 2:30 PM │ │
│ └─────────────────────────────────────┘ │
│ ┌─────────────────────────────────────┐ │
│ │ ⭐ [☐] Call with Sarah re: campaign │ │
│ │    📞 Marketing  •  Tomorrow 10 AM  │ │
│ └─────────────────────────────────────┘ │
│                                         │
│ ━━━ OTHER TASKS (5) ━━━                │
│ ┌─────────────────────────────────────┐ │
│ │ [☐] Draft slides for Monday         │ │
│ │    📊 Work  •  Monday               │ │
│ └─────────────────────────────────────┘ │
│ [+ 4 more tasks...]                     │
│                                         │
│ ━━━ ACTIONABLE EMAILS (2) ━━━          │
│ ┌─────────────────────────────────────┐ │
│ │ 📧 john@company.com                 │ │ ← Email Card
│ │    "Re: Q3 Budget - needs review"   │ │
│ │    AI: Asks for feedback by Friday  │ │
│ │    [Reply] [Archive] [→ Task]       │ │
│ └─────────────────────────────────────┘ │
│                                         │
│ ━━━ AI SUGGESTIONS (1) ━━━             │
│ ┌─────────────────────────────────────┐ │
│ │ 💡 AI Suggestion                    │ │ ← AI Card
│ │ "Draft Q3 Report for Sarah?"        │ │
│ │ [✓ Add Task] [✗ Dismiss]            │ │
│ └─────────────────────────────────────┘ │
│                                         │
└─────────────────────────────────────────┘
```

### 7.7 Core Features

#### 7.7.1 AI Focus Briefing (Top Card)

**Purpose:** One-glance summary of the day.

**Content (Dynamic):**
- Time-based greeting (Morning/Afternoon/Evening)
- Priority count: "You have 3 high-priority tasks"
- Overdue alerts: "1 overdue item needs attention"
- Calendar insights: "Next meeting in 45 minutes" or "30-min gap at 2 PM"
- Energy insight (if available): "Your energy is usually highest now—good time for deep work"

**Interaction:**
- **Tap card** → Opens modal with detailed breakdown:
  - List of priorities with context
  - Calendar overview for the day
  - Wellbeing & focus analytics (e.g., "You have 3 back-to-back meetings. I've auto-suggested a 15-min break.")
- **Swipe to dismiss** → Collapses card (reappears on refresh)

**Technical:**
- Generated server-side on screen load
- Cached for 1 hour (refreshes on pull-down)
- Adapts to user timezone

#### 7.7.2 Priority Tasks Section

**Definition of Priority:**
A task is marked as "Priority" if:
1. User manually marks it (star icon)
2. AI suggests it based on:
   - Due date proximity
   - Goal importance
   - Blockers for other work

**Display:**
- Maximum 3 priorities visible (AI forces focus)
- Star icon (⭐) visual indicator
- Large, tappable cards
- Displays: Checkbox, Task Name, Project/Tag, Due Date/Time

**Interaction:**
- **Tap checkbox** → Mark complete (satisfying animation, confetti for streaks)
- **Tap card** → Navigate to Task Detail Screen (S6)
- **Swipe left** → Quick reschedule menu
- **Long press** → Quick actions (Edit, Reschedule, Mark Priority, Delete)

**AI Behavior:**
- If user completes all 3 priorities before noon, AI sends notification: *"All priorities done! Want me to suggest bonus tasks?"*

#### 7.7.3 Other Tasks Section

**Display:**
- All remaining tasks for today (not priorities)
- Collapsed by default if >5 tasks (shows first 3 + "[+ X more]")
- Same card design as priorities (minus star)

**Sorting:**
- Due date/time (earliest first)
- Then by project
- Overdue tasks appear with red flag icon

#### 7.7.4 Actionable Emails Section (AI-Curated)

**Requirement:** Email integration (Gmail/Outlook) connected.

**Purpose:** Surface emails that require action, eliminating inbox checking.

**AI Curation Logic:**
- Analyzes new emails for action items:
  - Direct questions ("Can you send...?")
  - Requests with deadlines ("Need this by Friday")
  - Meeting requests without calendar invites
- Ignores newsletters, receipts, automated emails

**Email Card Display:**
- Sender name + email
- Subject line (truncated to 1 line)
- AI-generated 1-sentence summary: *"AI: Asks for Q3 report feedback by Friday"*
- Timestamp

**Quick Actions (3 buttons):**
1. **[Reply]** → Opens in-app email composer modal (simple text + send)
2. **[Archive]** → Removes from this list, archives in email
3. **[→ Task]** → Converts email to a task (auto-populates title, due date from AI analysis)

**Technical:**
- Emails fetched every 30 minutes (configurable in Settings)
- AI processing happens server-side
- User can add email senders to "Always Show" or "Never Show" lists

#### 7.7.5 Actionable Messages Section (AI-Curated)

**Requirement:** Chat integration (Slack/Teams) connected.

**Purpose:** Same as emails—surface DMs or mentions that need action.

**Message Card Display:**
- Sender name + channel/DM indicator
- Message snippet (first line, truncated)
- AI summary: *"AI: Requested meeting availability for next week"*

**Quick Actions:**
1. **[Reply]** → Deep-links to Slack/Teams (opens native app)
2. **[Remind Me]** → Adds reminder for later
3. **[→ Task]** → Converts to task

**Technical:**
- Syncs every 30 minutes
- Only shows DMs or @mentions
- User can mute specific channels

#### 7.7.6 AI Suggestions Section

**Purpose:** Proactive task creation from detected patterns.

**Examples:**
- *"You have a 'Review Contract' email. Create task: 'Review contract for John'?"*
- *"Meeting with Sarah tomorrow. Create pre-meeting prep task?"*
- *"You've been researching [topic]. Want to add 'Deep dive on [topic]' to your goals?"*

**Display:**
- Lightbulb icon (💡)
- Brief description
- [✓ Add Task] or [✗ Dismiss] buttons

**Technical:**
- AI generates suggestions based on:
  - Email/message content
  - Calendar patterns
  - Goal context
- Limited to 1-2 per day (avoid overwhelming)

### 7.8 Header Features

**Left: Hamburger Menu (☰)**
- Tap → Opens drawer with navigation, search, and profile access

**Right: Filter Button**
- Tap → Opens filter modal:
  - Show: All / Priorities Only / By Project / By Tag
  - Date range: Today / This Week / All

**Right: ••• Menu**
- Refresh All
- Mark All Complete (for completed tasks)
- Settings

### 7.9 Technical Requirements

**Performance:**
- List scroll: 60fps even with 100+ items
- Checkbox interaction: <50ms response
- Pull-to-refresh: <1 second

**Data Sync:**
- Tasks: Real-time (WebSocket)
- Emails/Messages: Every 30 min (configurable)
- Calendar: Every 15 min

**Offline Mode:**
- All tasks and cached emails/messages viewable
- Actions (mark complete, reschedule) queued for sync

---

## SCREEN 3: Quick Add (+) Modal

### 7.10 Overview
The "+" tab doesn't navigate to a screen—it opens a modal overlay for instant capture. It's designed for speed: tap, type, done. The AI handles parsing, categorization, and scheduling.

### 7.11 Layout
```
┌─────────────────────────────────────────┐
│                                         │
│  [Blurred Background - Previous Screen] │
│                                         │
│   ┌───────────────────────────────┐    │
│   │ [X] Quick Add          [Done] │    │ ← Modal Header
│   ├───────────────────────────────┤    │
│   │                               │    │
│   │ ┌───────────────────────────┐│    │
│   │ │ [🎤]                      ││    │ ← Input Area
│   │ │ Type or speak...          ││    │
│   │ │                           ││    │
│   │ └───────────────────────────┘│    │
│   │                               │    │
│   │ ━━ AI Detected ━━            │    │
│   │ • Task: "Draft slides"       │    │
│   │ • Project: Work              │    │
│   │ • Due: Monday 9:00 AM        │    │
│   │                               │    │
│   │ [✏️ Edit Details]             │    │
│   │                               │    │
│   │ ━━ Type ━━                   │    │
│   │ [Task] [Note] [Event]        │    │ ← Type Selector
│   │                               │    │
│   └───────────────────────────────┘    │
│                                         │
│                                         │
└─────────────────────────────────────────┘
```

### 7.12 Core Features

#### 7.12.1 Instant Modal Appearance

**Trigger:** Tap "+" button in bottom nav.

**Behavior:**
- Modal slides up from bottom in <300ms
- Previous screen dims (70% opacity black overlay)
- Input field is auto-focused with keyboard open
- Tap outside modal or swipe down → Dismiss

#### 7.12.2 Natural Language Input (AI Parsing)

**User Experience:**
User types or speaks naturally. AI extracts:
- **Task title**
- **Due date/time** (if mentioned)
- **Project/tag** (if mentioned with # or inferred)
- **Type** (task, note, or event)

**Examples:**
- Input: `"Draft slides tomorrow at 5pm #Work"`
  - AI creates Task: "Draft slides" | Due: Tomorrow 5:00 PM | Project: Work

- Input: `"Meeting with John next Tuesday 2pm for 1 hour"`
  - AI creates Event: "Meeting with John" | Start: Next Tue 2:00 PM | Duration: 1 hr

- Input: `"Remember: Maria's birthday is Nov 15"`
  - AI creates Note: "Maria's birthday is Nov 15" | Reminder: Nov 15 9:00 AM

- Input: `"Finish Q3 report"`
  - AI creates Task: "Finish Q3 report" | Due: (not set) | Project: (suggests based on context)

**Technical:**
- Server-side NLP processing
- Response time: <500ms
- Fallback: If AI can't parse, creates basic task with raw text as title

#### 7.12.3 AI Detected Preview

**Display:**
After user types and pauses (1 second debounce), AI shows:
```
━━ AI Detected ━━
• Task: "Draft slides"
• Project: Work
• Due: Monday 9:00 AM
```

**User Actions:**
- **Looks good?** → Tap [Done] to save
- **Need changes?** → Tap [✏️ Edit Details] to open Task Detail Screen with pre-filled fields

#### 7.12.4 Type Selector Buttons

**Purpose:** Manual override if AI gets it wrong.

**Buttons:**
- [Task] (default)
- [Note]
- [Event]

**Behavior:**
- Tap button → Changes type, re-analyzes input for that context
- Visual: Selected button is highlighted

#### 7.12.5 Voice Input

**Trigger:** Tap microphone icon in input field.

**Behavior:**
- Records audio (Apple Speech Framework)
- Real-time transcription appears in input field
- User can edit text after speaking
- AI parses same as text input

#### 7.12.6 Task Decomposition (AI)

**Trigger:** AI detects a complex task (e.g., >4 words, vague scope).

**Behavior:**
- AI shows prompt in modal: *"This looks big. Want me to break it down into steps?"*
- [Yes] → Task is created with AI-generated sub-tasks (checklist) in Notes field
- [No] → Task created as-is

**Example:**
- Input: `"Plan product launch"`
- AI suggests:
  1. Define launch date
  2. Create marketing materials
  3. Coordinate with sales team
  4. Schedule launch event
  5. Prepare press release

### 7.13 Technical Requirements

**Performance:**
- Modal open: <300ms
- AI parsing: <500ms
- Keyboard appears instantly (no lag)

**Offline:**
- Basic task creation works offline (no AI parsing)
- Syncs when back online

---

## SCREEN 4: Calendar (Visual Time Management)

### 7.14 Overview
The Calendar screen is a full-screen, intelligent calendar combining:
- External calendar events (Google/Outlook/Apple)
- User's tasks with due dates/times
- AI-suggested optimal time blocks
- Drag-and-drop time-blocking

### 7.15 Layout (Weekly View - Default)
```
┌─────────────────────────────────────────┐
│ [<] November 2025 [>]    [Day] [Week]   │ ← Header
├─────────────────────────────────────────┤
│     Mon    Tue    Wed    Thu    Fri     │ ← Week Days
│      1      2      3      4      5      │
├──┬──┬──┬──┬──┬──┬──┬──┬──┬──┬──┬──┬──┬──┤
│8a│                                     ││
│  │  ┌────────────┐                    ││
│9a│  │ Team Sync  │  ⭐Draft Report   ││ ← Event + Task
│  │  │ 9-10am     │     9-11am        ││
│10│  └────────────┘                    ││
│  │                                     ││
│11│                ⭐Call Sarah         ││
│  │                   11-11:30am       ││
│12│  ─────────────────────────────     ││ ← Lunch Block
│1p│                                     ││
│  │     [💡 AI: Focus time?]           ││ ← AI Suggestion
│2p│     Suggested 2-4pm                ││
│  │                                     ││
│3p│                                     ││
│  │                                     ││
│4p│  ┌────────────┐                    ││
│  │  │ Budget Mtg │                    ││
│5p│  │ 4-5pm      │                    ││
│  │  └────────────┘                    ││
│6p│                                     ││
└──┴──┴──┴──┴──┴──┴──┴──┴──┴──┴──┴──┴──┴──┘
┌─────────────────────────────────────────┐
│ ━━ UNSCHEDULED TASKS (3) ━━            │ ← Tray (Bottom)
│ [🔲 Draft slides] [🔲 Review budget]   │
└─────────────────────────────────────────┘
```

### 7.16 Core Features

#### 7.16.1 Unified Calendar View

**Data Sources:**
1. **External Events:** Synced from Google/Outlook/Apple Calendar
2. **Tasks with Times:** User's tasks that have specific due dates/times
3. **AI Suggestions:** Optimal time blocks for unscheduled work

**Visual Differentiation:**
- **External Events:** Solid color blocks (uses calendar's color)
- **Tasks:** Outlined blocks with checkbox icon
- **Priority Tasks:** Star icon (⭐) + bolder border
- **AI Suggestions:** Dashed outline + lightbulb icon (💡)

**Privacy:**
- Events marked "Private" appear as gray "Busy" blocks (no title shown)

#### 7.16.2 View Toggles

**Options:**
1. **Day View:** Single day, hour-by-hour (7am-10pm)
2. **3-Day View:** Rolling 3-day view (Today + 2 days)
3. **Week View:** Monday-Sunday (default)
4. **Month View:** Traditional month calendar (tappable days navigate to Day view)

**Interaction:**
- Toggle buttons in header
- Swipe left/right to navigate days/weeks
- Pinch to zoom (changes view type)

#### 7.16.3 Time-Blocking: Unscheduled Task Tray

**Purpose:** Make it easy to assign time to tasks.

**Display:**
- Fixed tray at bottom of screen (above bottom nav)
- Horizontally scrollable list of tasks without assigned times
- Shows first 5 tasks, [+ X more] if >5

**Interaction:**
- **Drag task** from tray onto calendar → Assigns that time slot
- **Drop on occupied slot** → AI suggests nearby open times
- Task updates in real-time (syncs to database)

**AI Assistance:**
- When user starts dragging, AI highlights "optimal" open slots in green:
  - Based on task type (deep work → morning)
  - Based on user's energy patterns
  - Respects buffer times

#### 7.16.4 Creating Events/Tasks

**Method 1: Tap Empty Slot**
- Tap any open time on calendar
- Opens Quick Add modal (same as "+" button) with time pre-filled

**Method 2: Long Press + Drag**
- Long press empty slot → Creates placeholder block
- Drag to adjust duration
- Release → Opens Quick Add modal

#### 7.16.5 Editing Events/Tasks

**Drag to Reschedule:**
- Long press any event/task block
- Drag up/down to change time
- Drag left/right to change day
- Visual: Block becomes semi-transparent while dragging

**Tap to Edit:**
- Tap event/task → Opens detail screen (S6 or S7)

**Swipe Actions:**
- Swipe left on task → Reschedule menu or Delete

#### 7.16.6 AI Calendar Management

**Feature 1: Conflict Resolution**
- User schedules task over existing event → AI alert:
  - *"This conflicts with 'Team Sync'. Want me to find an open slot?"*
  - [Suggest Times] [Keep Anyway]

**Feature 2: Smart Suggestions**
- AI proactively suggests time blocks:
  - *"You have a 2-hour gap tomorrow afternoon. Want me to block it for 'Draft Report'?"*
  - [Yes, Add] [No Thanks]

**Feature 3: Focus Protection**
- When user marks a task as Priority, AI asks:
  - *"Want me to block 30 mins of focus time before this?"*
  - Adds buffer block automatically

**Feature 4: Time Estimation**
- AI learns user's actual vs. estimated task durations
- After completing tasks, AI suggests: *"You estimated 1 hour but took 1.5 hours. Update future estimates?"*

**Feature 5: Energy Mapping**
- If user has defined "Peak Hours" in Settings (e.g., 9am-12pm):
  - AI highlights those times differently
  - Suggests scheduling demanding tasks then

**Feature 6: Transition Buffers**
- AI detects back-to-back meetings in different locations
- Automatically adds 15-min travel buffer
- User can accept/dismiss

#### 7.16.7 Calendar Integration (Two-Way Sync)

**Supported Services:**
- Google Calendar
- Outlook Calendar
- Apple Calendar (iCloud)

**Sync Behavior:**
- **From External → App:** Every 15 minutes (background fetch)
- **From App → External:** Real-time (immediate push)
- **Conflict Resolution:** Last-write-wins (user warned if conflict detected)

**What Syncs:**
- Tasks with assigned times appear as calendar events in external calendar
- Title format: "🎯 [Task Name]" (emoji indicates it's from app)
- External events appear in app calendar (read-only unless edited in app)

**Setup:**
- User connects in Settings → Integrations
- OAuth2 authentication
- User selects which external calendars to sync (if multiple)

### 7.17 Header Features

**Left: Month/Year Selector**
- Tap → Opens month picker
- Navigate to any past/future month

**Right: View Toggles**
- [Day] [Week] buttons
- Active view is highlighted

**Center: Today Button**
- Always visible
- Tap → Jumps to current day/week

### 7.18 Technical Requirements

**Performance:**
- Calendar render: <500ms (1 month of events)
- Drag-and-drop: 60fps smooth animation
- Scroll: 60fps

**Data:**
- Local cache: 3 months past + 6 months future
- Background sync every 15 minutes

**Offline:**
- Full view of cached data
- User can create/edit tasks (syncs when online)
- External events are read-only

---

## SCREEN 5: Notes (Personal Knowledge Hub)

### 7.19 Overview
The Notes screen is the user's personal knowledge hub for capturing thoughts, memories, ideas, and reference information. Unlike tasks, notes are persistent content that the user wants to remember and reference over time. The AI has full context of notes to provide personalized assistance.

**Key Differentiator from Tasks:**
- **Tasks:** Action items to complete and check off
- **Notes:** Persistent information to remember and reference

### 7.20 Layout
```
┌─────────────────────────────────────────┐
│ [☰]       Notes    [Search] [+ New]    │ ← Header
├─────────────────────────────────────────┤
│                                         │
│ ━━━ PINNED (2) ━━━                     │
│ ┌─────────────────────────────────┐    │
│ │ 📌 My Core Values                │    │ ← Pinned Note
│ │ Family, Growth, Authenticity... │    │
│ │ Updated 3 days ago              │    │
│ └─────────────────────────────────┘    │
│ ┌─────────────────────────────────┐    │
│ │ 📌 Project Ideas for 2025        │    │
│ │ Mobile app, SaaS product, AI... │    │
│ │ Updated 1 week ago              │    │
│ └─────────────────────────────────┘    │
│                                         │
│ ━━━ RECENT ━━━                         │
│ ┌─────────────────────────────────┐    │
│ │ Meeting notes - Sarah call      │    │ ← Note Card
│ │ Discussed Q4 planning and...    │    │
│ │ Today 2:30 PM  •  #work          │    │
│ └─────────────────────────────────┘    │
│ ┌─────────────────────────────────┐    │
│ │ Book: Atomic Habits insights    │    │
│ │ Key takeaways from reading...   │    │
│ │ Yesterday  •  #learning          │    │
│ └─────────────────────────────────┘    │
│ ┌─────────────────────────────────┐    │
│ │ Maria's birthday - Nov 15       │    │
│ │ Gift ideas: kindle, yoga mat... │    │
│ │ Nov 1  •  #personal              │    │
│ └─────────────────────────────────┘    │
│ ┌─────────────────────────────────┐    │
│ │ Weekly reflection - Week 44     │    │
│ │ Biggest win: launched beta...   │    │
│ │ Oct 27  •  #reflection           │    │
│ └─────────────────────────────────┘    │
│                                         │
│ ━━━ FOLDERS ━━━                        │
│ 📁 Work (12)    📁 Personal (8)        │
│ 📁 Learning (5)  📁 Ideas (15)          │
│                                         │
└─────────────────────────────────────────┘
```

### 7.21 Core Features

#### 7.21.1 Note Types

**Quick Notes:**
- Simple text-based notes for fast capture
- Created via Quick Add modal or [+ New] button
- Supports markdown formatting

**Rich Notes:**
- Full rich text editor with:
  - Headings (H1, H2, H3)
  - Bold, italic, strikethrough
  - Bullet lists, numbered lists, checklists
  - Code blocks
  - Links and images
  - Tables

**Voice Notes (Premium):**
- Tap microphone to record
- Auto-transcribed by AI
- Searchable by spoken content

**AI-Generated Notes:**
- Meeting summaries (auto-created after calendar events)
- Weekly reflections (from review conversations)
- Task context notes (AI suggests relevant info)

#### 7.21.2 Organization System

**Folders:**
- User-created folders for organization
- Default folders: Work, Personal, Ideas
- Nested folders supported (1 level deep)
- Folder colors and icons

**Tags:**
- Hashtag-based tagging (#work, #learning, #personal)
- Auto-suggested based on content
- Filterable and searchable

**Pinned Notes:**
- Pin important notes to top of list
- Maximum 5 pinned notes
- Visual pushpin icon (📌)

**Sort Options:**
- Recently modified (default)
- Alphabetical
- Date created
- Manual order (drag to reorder)

#### 7.21.3 AI Integration

**Smart Search:**
- Semantic search across all notes
- "Find my notes about product launch" works even without exact keywords
- Highlights relevant passages

**AI Context:**
- AI Chat has access to all notes (unless marked Private)
- Can reference notes in conversations: *"Based on your 'Core Values' note, this aligns with your 'Growth' value"*

**AI Suggestions:**
- AI suggests related notes when creating new ones
- *"This seems related to your 'Project Ideas' note. Want to link them?"*

**Auto-Summarization (Premium):**
- Long notes get AI-generated summaries
- Summaries appear at top of note detail view

#### 7.21.4 Note Card Display

**Card Content:**
- Note title (bold, truncated to 1 line)
- First 2 lines of content (preview)
- Last modified date
- Tags (if any)
- Folder indicator (if not in root)

**Interaction:**
- **Tap:** Opens Note Detail Screen
- **Long Press:** Quick actions menu (Pin, Move, Delete)
- **Swipe Left:** Delete (with confirmation)
- **Swipe Right:** Pin/Unpin

#### 7.21.5 Note Detail Screen

**Layout:**
```
┌─────────────────────────────────────────┐
│ [<] Meeting notes - Sarah    [•••]    │
├─────────────────────────────────────────┤
│ #work  •  📁 Work                       │
│ Modified: Today 2:30 PM                 │
│                                         │
│ ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ │
│                                         │
│ Discussed Q4 planning with Sarah:       │
│                                         │
│ • Budget approved for new hire          │
│ • Launch date moved to Dec 15           │
│ • Need to finalize marketing plan       │
│                                         │
│ Action items:                           │
│ [ ] Schedule follow-up meeting          │
│ [ ] Send updated timeline               │
│ [x] Review budget spreadsheet           │
│                                         │
│                                         │
└─────────────────────────────────────────┘
┌─────────────────────────────────────────┐
│ [B] [I] [List] [Check] [Link] [Image]   │ ← Formatting Toolbar
└─────────────────────────────────────────┘
```

**[•••] Menu Options:**
- Pin/Unpin
- Move to Folder
- Add Tags
- Share Note (copy link or export)
- Mark as Private (excluded from AI)
- Delete Note

#### 7.21.6 Creating Notes

**Method 1: [+ New] Button**
- Opens blank note editor
- Title field auto-focused

**Method 2: Quick Add Modal (+)**
- Select "Note" type
- Type content
- AI parses and formats

**Method 3: From Chat**
- User says: *"Remember that Maria's birthday is Nov 15"*
- AI creates note automatically

**Method 4: From Tasks**
- Convert task notes to standalone note
- Link note to related tasks

#### 7.21.7 Linking & Backlinks

**Linking Notes:**
- Type `[[` to search and link to another note
- Links are clickable and navigable

**Backlinks:**
- Each note shows "Linked from" section
- See all notes that reference this note
- AI suggests relevant links

### 7.22 Technical Requirements

**Performance:**
- Note list scroll: 60fps
- Note detail load: <200ms
- Search results: <500ms
- Auto-save: Every 2 seconds while typing

**Data:**
- Notes synced in real-time
- Offline editing with sync queue
- Full-text search index

**Storage:**
- Text notes: Unlimited
- Images: 10MB per note (Free), 50MB per note (Premium)
- Voice notes: 5 min max (Free), 30 min max (Premium)

---

## SCREEN 6: You (Profile & Settings) - Accessed via Hamburger Menu

### 7.23 Overview
The You screen is the user's personal command center for purpose, goals, projects, reviews, and settings. It's accessed by tapping the user's profile picture and name at the bottom of the hamburger menu on any screen.

### 7.24 Layout
```
┌─────────────────────────────────────────┐
│ [<]       You                    [Edit]  │ ← Header
├─────────────────────────────────────────┤
│ ┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓  │
│ ┃ 🎯 YOUR NORTH STAR               ┃  │ ← Purpose Card
│ ┃ "Help others achieve their       ┃  │
│ ┃  potential through technology"   ┃  │
│ ┃                                  ┃  │
│ ┃ Core Values: Family, Growth,    ┃  │
│ ┃ Authenticity, Impact             ┃  │
│ ┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛  │
│                                         │
│ ━━━ ACTIVE GOALS (2) ━━━               │
│ ┌─────────────────────────────────┐    │
│ │ Launch Product V1               │    │
│ │ [████████░░] 80% • 12 days left │    │ ← Goal Card
│ │ 8 of 10 milestones complete     │    │
│ └─────────────────────────────────┘    │
│ ┌─────────────────────────────────┐    │
│ │ Run 3x per week                 │    │
│ │ [████░░░░░░] 40% • 5 week streak│    │
│ └─────────────────────────────────┘    │
│ [+ Add Goal]                           │
│                                         │
│ ━━━ ACTIVE PROJECTS (3) ━━━            │
│ ┌─────────────────────────────────┐    │
│ │ 📊 Work • 12 tasks               │    │ ← Project Card
│ └─────────────────────────────────┘    │
│ ┌─────────────────────────────────┐    │
│ │ 💼 Marketing Campaign • 8 tasks  │    │
│ └─────────────────────────────────┘    │
│ [+ Add Project]                        │
│                                         │
│ ━━━ INSIGHTS & REVIEWS ━━━             │
│ ┌─────────────────────────────────┐    │
│ │ 📅 This Week: 22/27 tasks done  │    │
│ │ 🔥 7-day streak                  │    │
│ │ [View Weekly Review]             │    │
│ └─────────────────────────────────┘    │
│                                         │
│ ━━━ QUICK SETTINGS ━━━                 │
│ • AI Assistants & Automations          │
│ • Preferences & Theme                  │
│ • Integrations & Calendar              │
│ • Account & Subscription               │
│ • Help & Support                       │
│                                         │
└─────────────────────────────────────────┘
```

### 7.25 Core Sections

#### 7.25.1 North Star Section (Purpose & Values)

**Display:**
- Large, prominent card at top
- Shows user's purpose statement (1-2 sentences)
- Lists 3-5 core values

**Interaction:**
- **Tap [Edit]** → Opens conversational editing modal:
  - AI: *"Let's review your North Star. Does this still feel true?"*
  - User can type changes
  - AI logs evolution history (visible in detail view)

- **Tap card** → Opens detailed view:
  - Full purpose history (dated evolution log)
  - "Purpose Alignment Score" for current week (Premium)

**Purpose Alignment Score (Premium):**
- AI analyzes tasks completed this week
- Scores 1-10: "How aligned were your actions with your purpose?"
- Shows breakdown: "You spent 60% of time on 'Work', which aligns with 'Impact' value"

#### 7.25.2 Active Goals Section

**Display:**
- Cards for each active goal
- Shows:
  - Goal title
  - Progress bar (visual % complete)
  - Time remaining (if deadline set)
  - Key milestone count

**Types of Goals:**
1. **Milestone Goals:** "Launch Product V1" (has sub-milestones)
2. **Habit Goals:** "Run 3x per week" (tracks streaks)
3. **Numeric Goals:** "Save $10,000" (tracks number)

**Interaction:**
- **Tap goal card** → Opens Goal Detail Screen:
  - Full description
  - List of milestones/sub-tasks with checkboxes
  - Completed task history
  - AI insights: *"You complete more tasks on Tuesdays. Want to schedule Goal work then?"*
  - [Complete Goal] or [Archive Goal] button

- **Tap [+ Add Goal]** → Opens conversational modal:
  - AI: *"What do you want to achieve?"*
  - User types goal
  - AI asks: *"What's the deadline? What are the first 3 steps?"*
  - Creates SMART goal structure

**Visual Celebration:**
- When goal hits 100%, confetti animation + AI message in Chat

#### 7.25.3 Active Projects Section

**Display:**
- List of user's projects (from Momentum style)
- Shows project name, icon/color, and task count

**Interaction:**
- **Tap project** → Opens Project Detail Screen:
  - Filtered list of all tasks in this project
  - Project description
  - Option to archive project

- **Tap [+ Add Project]** → Quick modal:
  - "Project Name?"
  - "Choose icon and color"
  - [Create]

**Difference from Goals:**
- **Goals:** Time-bound, purpose-aligned objectives
- **Projects:** Ongoing organizational containers (like "Work", "Home", "Side Hustle")

#### 7.25.4 Insights & Reviews Section

**This Week Card:**
- Shows:
  - Tasks completed: "22/27 (81%)"
  - Current streak: "🔥 7 days"
  - Top project: "Most focus on 'Work' (12 tasks)"
  - [View Weekly Review] button

**Weekly Review (Detail View):**
- Opens full-screen review:
  - AI-generated summary: *"You had a strong week! 81% completion rate..."*
  - Reflection prompts:
    - "What was your biggest win?"
    - "What got in your way?"
    - "What will you focus on next week?"
  - User adds text reflections
  - [Save Review] stores for history

**Monthly Review (Premium):**
- Deeper analysis, accessed from this section
- 10-15 minute guided conversation with AI

**Review History:**
- Tap "Past Reviews" to see dated archive
- Searchable by month

#### 7.25.5 Quick Settings Section

**Display:**
- List of tappable rows (iOS style)
- Each row navigates to a settings sub-screen

**Settings Pages:**

**1. AI Assistants & Automations**
- (Detailed in Section 8 below)
- Toggleable automation "recipes"
- Custom AI prompts

**2. Preferences & Theme**
- Visual Theme: [Light] [Dark] [Auto]
- Theme Unlocks: Displays earned themes (7-day, 30-day streaks)
- Calendar Density: [Minimal] [Standard] [Detailed]
- AI Personality: [Supportive] [Balanced] [Direct]
- Week Start Day: [Sunday] [Monday]
- Working Hours: Define 9am-5pm (or custom)
- Peak Energy Hours: Define personal peak times

**3. Integrations & Calendar**
- Connected Services:
  - Google Calendar [Connected ✓] [Disconnect]
  - Outlook Calendar [Connect]
  - Gmail [Connected ✓]
  - Slack [Connect]
- Two-Way Sync: Toggle on/off
- Sync Frequency: [Real-time] [Every 15 min] [Every 30 min]

**4. Notifications**
- Granular control:
  - Daily Priority Briefing: Toggle + Time picker
  - AI Suggestions: Toggle
  - Task Reminders: Toggle
  - Email/Message Alerts: Toggle
  - Weekly Review: Toggle + Day/Time picker

**5. Account & Subscription**
- Profile: Name, email, photo
- Subscription Plan:
  - Current plan: Free or Premium
  - [Upgrade to Premium] ($20/mo or $190/yr)
  - Billing history
- Data Management:
  - [Export All Data] (JSON format)
  - [Delete Account] (with confirmation)

**6. Help & Support**
- FAQs
- Contact Support
- App Version
- [Send Feedback]

### 7.26 Technical Requirements

**Performance:**
- Screen load: <1 second
- Smooth scrolling: 60fps

**Data:**
- Goals/Projects: Real-time sync
- Reviews: Stored locally + cloud backup

---

## 8. AI Assistants & Automations Feature

### 8.1 Overview
A user-facing automation page that doesn't require technical knowledge. Instead of complex if-then builders, users toggle pre-built "AI Assistant Recipes" and customize them with natural language prompts.

### 8.2 Naming & Philosophy
- **Not called "Automations"** → Too technical
- **Called "AI Assistants"** → Feels like delegating to a helper
- **Principle:** Curated library of useful workflows that "just work"

### 8.3 Location
- Accessible from: Hamburger Menu → "AI Assistants"
- Or: Long-press "+" button → "Browse AI Assistants"

### 8.4 Layout
```
┌─────────────────────────────────────────┐
│ [<] AI Assistants            [+ Custom] │
├─────────────────────────────────────────┤
│ ━━━ COMMUNICATION ━━━                   │
│                                         │
│ ┌─────────────────────────────────────┐ │
│ │ [ON] 📧 Daily Email Digest          │ │ ← Recipe Card
│ │ Every morning at 8:00 AM, your AI   │ │
│ │ reads new emails and sends a summary│ │
│ │ of the 3 most urgent ones.          │ │
│ │               [⚙️ Customize Prompt]  │ │
│ └─────────────────────────────────────┘ │
│                                         │
│ ┌─────────────────────────────────────┐ │
│ │ [OFF] 📅 Meeting Auto-Organizer     │ │
│ │ When a calendar invite arrives, AI  │ │
│ │ reads attachments and creates a     │ │
│ │ pre-meeting briefing note.          │ │
│ │               [⚙️ Customize Prompt]  │ │
│ └─────────────────────────────────────┘ │
│                                         │
│ ━━━ TASK MANAGEMENT ━━━                │
│                                         │
│ ┌─────────────────────────────────────┐ │
│ │ [ON] 🎯 Priority Suggester          │ │
│ │ Every evening at 8 PM, AI analyzes  │ │
│ │ your goals and deadlines to suggest │ │
│ │ tomorrow's top 3 priorities.        │ │
│ │               [⚙️ Customize Prompt]  │ │
│ └─────────────────────────────────────┘ │
│                                         │
│ ┌─────────────────────────────────────┐ │
│ │ [OFF] 🔄 Recurring Task Creator     │ │
│ │ Detects patterns (e.g., "Review     │ │
│ │ budget every Monday") and suggests  │ │
│ │ making them recurring tasks.        │ │
│ │               [⚙️ Customize Prompt]  │ │
│ └─────────────────────────────────────┘ │
│                                         │
│ ━━━ PRODUCTIVITY ━━━                   │
│                                         │
│ ┌─────────────────────────────────────┐ │
│ │ [OFF] 💰 Receipt Collector          │ │
│ │ When an email receipt arrives, AI   │ │
│ │ saves the PDF to your "Receipts"    │ │
│ │ folder in Google Drive.             │ │
│ │               [⚙️ Customize Prompt]  │ │
│ └─────────────────────────────────────┘ │
│                                         │
│ ┌─────────────────────────────────────┐ │
│ │ [ON] 🚫 Focus Mode Scheduler        │ │
│ │ When a priority task is due today,  │ │
│ │ AI blocks 2 hours of focus time and │ │
│ │ silences notifications.             │ │
│ │               [⚙️ Customize Prompt]  │ │
│ └─────────────────────────────────────┘ │
│                                         │
│ [+ Create Custom Assistant]            │
└─────────────────────────────────────────┘
```

### 8.5 Core Recipe Library (v1)

#### Recipe 1: Daily Email Digest
**Trigger:** Time-based (default: 8:00 AM)  
**Actions:**
1. Fetch new emails from past 24 hours
2. AI analyzes for urgency/importance
3. Creates summary of top 3 emails
4. Sends as push notification + appears in Chat

**Default Prompt:**
```
Summarize my urgent emails and send me a digest at 8:00 AM.
```

**User Customization Examples:**
- *"Check at 7:30 AM and 4:00 PM. Only emails from my boss (jane@company.com) and client (ceo@client.com). Send via Slack, not notification."*
- *"Show me all emails with deadlines mentioned. Send at 6:00 AM."*

**Behind the Scenes (Hidden from User):**
- AI interprets natural language → Updates cron trigger time, filters, destination
- No code editing required

#### Recipe 2: Meeting Auto-Organizer
**Trigger:** New calendar event with attachments  
**Actions:**
1. AI reads meeting invite
2. Downloads and analyzes attachments (PDFs, docs)
3. Generates briefing note with key points
4. Creates task: "Prep for [Meeting]" with briefing in notes

**Default Prompt:**
```
When a meeting invite arrives with attachments, create a briefing note for me.
```

**User Customization:**
- *"Only do this for meetings with 3+ attendees. Skip 1:1s."*
- *"Add briefings to my 'Meetings' project and set reminder 1 hour before."*

#### Recipe 3: Priority Suggester (Core Feature)
**Trigger:** Time-based (default: 8:00 PM daily)  
**Actions:**
1. AI analyzes goals, deadlines, task dependencies
2. Suggests 3 priority tasks for tomorrow
3. Sends notification: "Tomorrow's priorities ready to review"
4. Opens Chat with suggestions for approval

**Default Prompt:**
```
Every evening at 8 PM, analyze my goals and suggest tomorrow's top 3 priorities.
```

**User Customization:**
- *"Suggest 5 priorities instead of 3. Send at 7:00 PM."*
- *"Only suggest tasks related to my 'Launch Product' goal."*

#### Recipe 4: Recurring Task Creator
**Trigger:** Pattern detection (runs weekly)  
**Actions:**
1. AI scans completed tasks for patterns (e.g., "Review budget" every Monday for 3 weeks)
2. Suggests creating recurring task
3. User approves/declines via notification

**Default Prompt:**
```
Detect patterns in my tasks and suggest making them recurring.
```

**User Customization:**
- *"Only suggest for tasks I've done 4+ times, not 3."*
- *"Auto-create recurring tasks without asking me."*

#### Recipe 5: Receipt Collector
**Trigger:** Email with receipt/invoice detected  
**Actions:**
1. AI identifies receipt emails (keywords: "receipt", "invoice", "payment")
2. Extracts PDF attachment
3. Saves to Google Drive "Receipts" folder
4. (Optional) Creates task: "File receipt for taxes"

**Default Prompt:**
```
When a receipt email arrives, save the PDF to my Google Drive Receipts folder.
```

**User Customization:**
- *"Also save to Dropbox. Don't create a task."*
- *"Only save receipts over $100."*

#### Recipe 6: Focus Mode Scheduler
**Trigger:** Priority task due within 24 hours + no time assigned  
**Actions:**
1. AI finds 2-hour open block in calendar
2. Schedules focus time
3. Silences email/Slack notifications during block
4. Sends reminder 15 min before

**Default Prompt:**
```
When a priority task is due today, block 2 hours of focus time and silence notifications.
```

**User Customization:**
- *"Only block 1 hour, not 2. Schedule focus time in mornings only (before noon)."*
- *"Don't silence Slack, only email."*

### 8.6 Creating Custom Assistants

**Trigger:** User taps [+ Create Custom Assistant]

**Flow:**
1. AI asks: *"What do you want your assistant to do?"*
2. User types free-form description:
   - Example: *"When I complete a task tagged #client-work, send a message to my Slack #wins channel celebrating it."*
3. AI confirms: *"Got it! I'll post to Slack whenever you complete a #client-work task. Want to test it now?"*
4. User approves → Assistant is created and added to list

**Technical:**
- AI uses function-calling to generate automation logic
- Limited to supported integrations (email, calendar, Slack, Drive)
- Complex requests fallback: "I can't automate that yet, but I'll save your idea for future updates."

### 8.7 Proactive Assistant Suggestions

**Goal:** Users don't need to discover the page—AI suggests recipes contextually.

**Examples:**

**Trigger: User has 10+ newsletters per day**
- Notification: *"📬 You get a lot of newsletters. Want me to auto-move them to a 'Read Later' folder and send a Friday summary?"*
- [Activate Assistant] [No Thanks]

**Trigger: User has recurring "Team Sync" meeting with shared docs**
- In Chat: *"I noticed your Team Sync has shared docs. Want me to create briefing notes before each meeting?"*
- [Yes, Activate] [Not Now]

**Trigger: User completes 5+ tasks in "Project X"**
- Notification: *"You're crushing Project X! Want me to auto-celebrate your wins in Slack?"*
- [Set Up] [Dismiss]

### 8.8 Technical Requirements

**Performance:**
- Automations run server-side (cloud functions)
- Real-time triggers: <5 second delay
- Time-based triggers: Exact to the minute

**Security:**
- User must grant OAuth permissions for each integration
- Scopes: Read-only for emails, read/write for calendar, tasks
- User can revoke at any time

**Limitations (v1):**
- Max 10 active assistants per user (Free)
- Unlimited for Premium users
- No cross-app automations (e.g., can't connect to Zapier/IFTTT)

---

## 9. Detail & Contextual Screens

These screens are not in bottom nav but accessed by interacting with items.

### 9.1 Task Detail Screen (S6)

**Accessed by:** Tapping any task card (from Today, Calendar, Projects, or Search)

**Layout:**
```
┌─────────────────────────────────────────┐
│ [<] Task Detail              [•••] [✓]  │
├─────────────────────────────────────────┤
│ ┌─────────────────────────────────────┐ │
│ │ [☐] Finish Q3 Report                │ │ ← Task Title
│ └─────────────────────────────────────┘ │
│                                         │
│ Project      [Work ▼]                   │
│ Due Date     [Nov 5, 5:00 PM ▼]        │
│ Priority     [⭐ High]                  │
│ Tags         [#quarterly #important]    │
│ Reminders    [1 hour before]            │
│                                         │
│ ━━━ SUBTASKS (3/5) ━━━                 │
│ [✓] Gather data                         │
│ [✓] Create charts                       │
│ [✓] Write executive summary             │
│ [☐] Get CFO approval                    │
│ [☐] Finalize formatting                 │
│ [+ Add Subtask]                         │
│                                         │
│ ━━━ NOTES ━━━                          │
│ Key points to include:                  │
│ - Revenue up 15% QoQ                    │
│ - New client acquisitions...            │
│ [Edit Notes]                            │
│                                         │
│ ━━━ ACTIVITY ━━━                       │
│ • Nov 1, 9:30 AM - Rescheduled          │
│ • Oct 30 - Created from email           │
│                                         │
│ [🎯 Start Focus Session]                │
│ [🗑️ Delete Task]                        │
└─────────────────────────────────────────┘
```

**Features:**

**Basic Fields:**
- Title (editable)
- Project selector (dropdown)
- Due date/time picker
- Priority toggle (High/Normal)
- Tags (multi-select or type-to-create)
- Reminders (time-based)

**Subtasks/Checklist:**
- Create hierarchical subtasks
- Check off items
- Drag to reorder

**Notes:**
- Rich text editor (bold, italic, lists)
- Supports links
- AI can pre-populate (e.g., from Task Decomposition)

**Activity Log:**
- Auto-tracked history:
  - Created date/source
  - Rescheduled events
  - Completion toggles

**Actions:**
- **[Start Focus Session]:** Launches Focus Mode (S8) for this task
- **[Delete Task]:** Confirmation dialog → Deletes task

**Top Right:**
- **[•••] Menu:**
  - Duplicate Task
  - Convert to Recurring
  - Share Task (copy link)
- **[✓] Complete:** Marks task done, celebrates if priority

### 9.2 Event Detail Screen (S7)

**Accessed by:** Tapping any calendar event

**Layout:**
```
┌─────────────────────────────────────────┐
│ [<] Event Detail                   [✏️] │
├─────────────────────────────────────────┤
│ Team Sync                               │ ← Title
│                                         │
│ 📅 Monday, Nov 4                        │
│ ⏰ 9:00 AM - 10:00 AM (1 hour)          │
│ 📍 Conference Room B                    │
│ 🔗 https://zoom.us/j/123456             │
│                                         │
│ Attendees (5)                           │
│ • Sarah Johnson                         │
│ • Mike Chen                             │
│ • [+ 3 more]                            │
│                                         │
│ ━━━ NOTES ━━━                          │
│ Agenda:                                 │
│ - Q3 results                            │
│ - Q4 planning                           │
│                                         │
│ ━━━ AI MEETING ASSISTANT ━━━           │
│ [Not yet started]                       │
│                                         │
│ [Join Meeting]                          │
│ [Edit Event]                            │
└─────────────────────────────────────────┘
```

**Features:**

**Basic Details:**
- Title
- Date/time
- Location
- Video link (tappable → opens browser/app)
- Attendees list

**AI Meeting Assistant (Premium):**

**Pre-Meeting:**
- If event has attachments, AI briefing appears:
  - *"AI Briefing: Key points from attached docs..."*

**Post-Meeting:**
- After event ends, new sections appear:
  - **AI Summary Tab:** *"Meeting Summary: Discussed Q3 revenue (up 15%), decided to launch campaign in Q4..."*
  - **Action Items Tab:** List of detected action items with [+ Add as Task] buttons
  - **Full Transcript Tab:** (Optional, if user enabled recording)

**Technical:**
- AI processes meeting data server-side
- Transcription via external service (Otter.ai API or similar)
- Generated within 5 minutes of meeting end

### 9.3 Goal Detail Screen

**Accessed by:** Tapping goal card on You screen

**Layout:**
```
┌─────────────────────────────────────────┐
│ [<] Launch Product V1            [Edit] │
├─────────────────────────────────────────┤
│ [████████░░] 80% Complete               │
│ 🎯 Due: November 15, 2025 (12 days)     │
│                                         │
│ Description:                            │
│ Launch the first version of our new     │
│ product to beta customers.              │
│                                         │
│ ━━━ MILESTONES (8/10) ━━━              │
│ [✓] Define product requirements         │
│ [✓] Design mockups                      │
│ [✓] Build MVP features                  │
│ [✓] Internal testing                    │
│ [✓] Fix critical bugs                   │
│ [✓] Create marketing materials          │
│ [✓] Set up landing page                 │
│ [✓] Recruit beta users                  │
│ [☐] Conduct beta launch                 │
│ [☐] Collect feedback                    │
│                                         │
│ ━━━ COMPLETED TASKS (24) ━━━           │
│ • Nov 1 - Finish landing page copy      │
│ • Oct 30 - Design email campaign        │
│ • Oct 28 - Set up analytics             │
│ [View All →]                            │
│                                         │
│ ━━━ AI INSIGHTS ━━━                    │
│ 💡 You're ahead of schedule! You've     │
│ completed 80% with 12 days remaining.   │
│ Want to add stretch goals?              │
│                                         │
│ [Mark Goal Complete]                    │
│ [Archive Goal]                          │
└─────────────────────────────────────────┘
```

**Features:**

**Progress Tracking:**
- Visual progress bar
- % completion
- Time remaining

**Milestones:**
- Checkbox list of major steps
- User can add/edit/reorder

**Task History:**
- Auto-populated with all completed tasks linked to this goal
- Shows completion dates
- Tappable → Opens task detail

**AI Insights:**
- Contextual suggestions based on progress
- Examples:
  - *"You're ahead of schedule..."*
  - *"You've slowed down this week. What's blocking you?"*
  - *"Most progress happens on Mondays for you. Want to block Monday mornings for this goal?"*

**Actions:**
- **[Mark Goal Complete]:** Celebration animation, moves to Archived
- **[Archive Goal]:** For abandoned/postponed goals

### 9.4 Project Detail Screen

**Accessed by:** Tapping project card on You screen

**Layout:**
```
┌─────────────────────────────────────────┐
│ [<] 📊 Work                        [⚙️] │
├─────────────────────────────────────────┤
│ 12 Active Tasks                         │
│                                         │
│ ━━━ TO DO (8) ━━━                      │
│ ┌─────────────────────────────────────┐ │
│ │ [☐] Finish Q3 Report                │ │
│ │     Due: Nov 5, 5:00 PM             │ │
│ └─────────────────────────────────────┘ │
│ ┌─────────────────────────────────────┐ │
│ │ [☐] Review budget                   │ │
│ │     Due: Tomorrow                   │ │
│ └─────────────────────────────────────┘ │
│ [+ 6 more...]                           │
│                                         │
│ ━━━ COMPLETED THIS WEEK (4) ━━━        │
│ • Draft slides                          │
│ • Team sync prep                        │
│ • Email client                          │
│ [View All →]                            │
│                                         │
│ [+ Add Task to Work]                    │
│ [Archive Project]                       │
└─────────────────────────────────────────┘
```

**Features:**

**Task List:**
- Shows all tasks tagged with this project
- Grouped: To Do / Completed
- Same interaction as Today screen (swipe, tap, etc.)

**Quick Add:**
- [+ Add Task] button pre-fills project field

**Settings (⚙️):**
- Edit project name
- Change icon/color
- Archive project

### 9.5 Focus Mode Screen (S8)

**Accessed by:** Tapping [Start Focus Session] on Task Detail Screen

**Layout:**
```
┌─────────────────────────────────────────┐
│                                         │
│                                         │
│         Finish Q3 Report                │ ← Task Title
│                                         │
│                                         │
│            ┌─────────┐                  │
│            │  24:32  │                  │ ← Timer
│            └─────────┘                  │
│                                         │
│        [Pause] [+5 min]                 │
│                                         │
│                                         │
│    🔕 Notifications silenced            │
│                                         │
│                                         │
│                                         │
│      [Mark Complete & Exit]             │
│      [End Session]                      │
│                                         │
└─────────────────────────────────────────┘
```

**Features:**

**Minimalist UI:**
- Hides all navigation
- Full-screen focus
- Only shows task name + timer

**Integrated Timer:**
- Default: 25 minutes (Pomodoro)
- User can customize in Settings (10/25/45/60 min)
- Countdown timer
- Audio alert when time ends

**System Notification Mute:**
- Automatically enables iOS Focus Mode (or Android Do Not Disturb)
- Silences: Email, Slack, Teams notifications
- Allows: Calls from favorites (user control in Settings)

**Completion:**
- When timer ends:
  - Notification: "Focus session complete! 🎉"
  - Modal appears: [Mark Task Complete] [Add Another Session] [Exit]
- If user marks complete: Confetti animation, task checked off

**Technical:**
- Background timer continues if user minimizes app
- Local notification when session ends

---

## 10. Search & Command Bar (Integrated)

### 10.1 Overview
Instead of a dedicated 5th tab for search, we integrate a **universal search bar** accessible from any screen via:
- Pull-down gesture on any screen (reveals search bar at top)
- OR: Tap search icon in header

This approach saves a bottom nav slot while keeping search always accessible.

### 10.2 Smart Search Bar Features

**Modes:**
1. **Keyword Search:** Type "Q3 Report" → See matching tasks, events, notes, emails
2. **AI Questions:** Type "What meetings do I have with Sarah next week?" → AI answers directly
3. **Commands:** Type "Reschedule my 3 overdue tasks to tomorrow" → AI confirms action

**Results Display:**
```
┌─────────────────────────────────────────┐
│ 🔍 [Search or ask anything...]     [X]  │
├─────────────────────────────────────────┤
│                                         │
│ ━━━ AI ANSWER ━━━                      │
│ You have 2 meetings with Sarah next     │
│ week: Tuesday 2pm and Thursday 10am.    │
│                                         │
│ ━━━ TASKS (3) ━━━                      │
│ • Finish Q3 Report - Due Nov 5          │
│ • Q3 Budget Review - Due Nov 8          │
│                                         │
│ ━━━ EVENTS (1) ━━━                     │
│ • Q3 Planning Meeting - Nov 6           │
│                                         │
│ ━━━ EMAILS (2) ━━━                     │
│ • From john@: "Re: Q3 Results"          │
│                                         │
└─────────────────────────────────────────┘
```

**Technical:**
- Real-time search (200ms debounce)
- Server-side AI processing for complex queries
- Local search for keywords (instant)

---

## 11. Progress & Motivation System

### 11.1 Core Streak System

**Primary Streak: Priorities Streak**
- Counts consecutive days completing ALL designated priority tasks
- Displays on You screen: "🔥 7-day streak"
- Breaks if user misses priorities (not regular tasks)

**Visual:**
- Fire emoji (🔥) + day count
- Progress toward next milestone (e.g., "3 days to unlock new theme!")

### 11.2 Milestone Rewards

**7-Day Streak:**
- Unlocks: New visual theme (e.g., "Ocean Blue")
- Notification: "🎉 7-day streak! You've unlocked the Ocean theme."

**30-Day Streak:**
- Unlocks: Detailed AI Performance Analysis report
- Earns: 1 Streak Freeze

**90-Day Streak:**
- Unlocks: "Life Patterns" deep insight report (AI analyzes 90 days of data)
- Earns: Premium trial (7 days)

**365-Day Streak:**
- Unlocks: "Year in Review" personalized video (AI-generated highlights)
- Earns: Lifetime Premium 50% discount

### 11.3 Recovery Protocols

**Vacation Mode:**
- User activates in Settings: "I'm on vacation [start date] to [end date]"
- Streaks pause without penalty
- AI adjusts expectations (no priority suggestions)

**Streak Freeze:**
- User earns 1 freeze every 30 days
- Can "spend" freeze to skip one day without breaking streak
- UI shows: "You have 1 Streak Freeze available"

**Compassionate Comeback:**
- If user breaks streak, AI sends encouraging message:
  - *"Hey, you missed yesterday. Life happens! Your record was 15 days—let's start fresh today."*
- Offers: "Want me to help you plan tomorrow's priorities?"

---

## 12. Premium Features & Monetization

### 12.1 Free Tier (Forever Free)

**Included:**
- Unlimited goals
- Unlimited projects
- Unlimited tasks & calendar events
- Basic AI Chat: 50 messages/month (with GPT-4o)
- Basic weekly reviews (auto-generated)
- Calendar sync (one external calendar)
- 3 active AI Assistants
- Basic themes

**Limitations:**
- AI model: GPT-4o (good, not the best)
- No monthly/quarterly reviews
- No advanced insights
- No meeting transcription
- Basic email/message curation (5 per day)

### 12.2 Premium Tier ($20/month or $190/year)

**Included (Everything from Free +):**
- **Unlimited AI messages** with advanced models (GPT-4.5-Preview, Claude Opus 4.1)
- **Monthly Deep Reviews:** 15-min guided conversation with AI
- **Quarterly Purpose Check:** Revisit North Star every 3 months
- **Advanced Insights:**
  - Purpose Alignment Score
  - Life Patterns report
  - Detailed performance analytics
- **Unlimited AI Assistants** (no 3-assistant limit)
- **Meeting Transcription & AI Summaries:** Full post-meeting analysis
- **Schedule from Image:** Take photo of handwritten notes → AI creates tasks
- **Priority Support:** Email response within 24 hours
- **Early Access:** Beta features before public release
- **Unlimited email/message curation**
- **Sync multiple calendars** (not just one)
- **Premium themes & unlockables**

**Pricing:**
- Monthly: $20/month
- Annual: $190/year (2 months free)
- Student discount: 50% off with valid .edu email

### 12.3 Trial & Conversion Strategy

**Free Trial:**
- 14-day Premium trial for all new users
- Starts automatically after onboarding
- Full access to all features
- Reminder notification on Day 12: "Your trial ends in 2 days"

**Conversion Prompts (Non-Intrusive):**
- When user hits Free limit (50 AI messages): *"You've reached your monthly limit. Upgrade for unlimited AI conversations."*
- After 30-day streak: *"Congrats on 30 days! Premium users get detailed performance insights. Want to see yours?"*
- Never block core functionality (tasks/calendar)

---

## 13. Technical Architecture & Requirements

### 13.1 Platform & Tech Stack

**Primary Platform:**
- iOS (iPhone) - Native Swift/SwiftUI

**Future Roadmap:**
- iPad (Month 4-6)
- Apple Watch companion (Month 4-6)
- Android (Month 7-12)

**Tech Stack:**
- **Frontend:** SwiftUI (iOS 16+)
- **Backend:** Node.js + Express (REST API)
- **Database:** PostgreSQL (user data) + Redis (caching)
- **AI:** OpenAI API (GPT-4o, GPT-4.5) + Anthropic API (Claude)
- **Real-time:** WebSockets (Socket.io)
- **File Storage:** AWS S3
- **Auth:** Firebase Auth or Auth0

### 13.2 Core Technical Principles

**Offline-First Architecture:**
- All screens functional without internet
- Local SQLite database for tasks, goals, calendar cache
- Background sync via iOS Background App Refresh
- Conflict resolution: Last-write-wins (with user warning)

**Privacy & Security:**
- End-to-end encryption for all user data (AES-256)
- No data selling—ever (clearly stated in privacy policy)
- AI processing: Server-side, data encrypted in transit (TLS 1.3)
- User control: Can mark events/tasks as "Private" (excluded from AI context)
- Data export: Full JSON export available anytime

**Performance Targets:**
- Cold app launch: <1 second (iPhone 12+)
- Screen transitions: <200ms
- AI response time: <2 seconds (average <1.5s)
- Calendar render: <500ms (1 month of events)
- List scrolling: 60fps (even with 1000+ items)

### 13.3 Calendar Integration (Two-Way Sync)

**Supported Providers:**
- Google Calendar (CalDAV)
- Outlook Calendar (Microsoft Graph API)
- Apple Calendar (iCloud CalDAV)

**Sync Behavior:**
- **Direction:** Bi-directional (app ↔ external)
- **Frequency:**
  - From external → app: Every 15 minutes (background)
  - From app → external: Real-time push
- **Conflict Handling:**
  - If same event edited in both places, last edit wins
  - User notified: "This event was changed externally"

**Data Synced:**
- Events: Title, start/end time, location, attendees, notes
- Tasks with times: Appear as calendar events externally
  - Format: "🎯 [Task Name]" (emoji indicates app origin)

**Privacy:**
- Events marked "Private" in app do NOT sync title/details externally
- Appear as "Busy" blocks only

### 13.4 Email & Messaging Integration

**Supported Services:**
- **Email:** Gmail, Outlook 365
- **Chat:** Slack, Microsoft Teams

**Integration Level (v1):**
- **Read-only** access (no sending from app, except quick replies)
- OAuth2 authentication
- Granular scopes:
  - Gmail: `gmail.readonly` + `gmail.modify` (for archiving only)
  - Slack: `channels:read`, `im:read`, `users:read`

**Sync Behavior:**
- **Frequency:** Every 30 minutes (configurable)
- **AI Curation:** Server-side processing
  - Analyzes last 24 hours of emails/messages
  - Extracts action items
  - Surfaces in Today screen

**User Controls:**
- Whitelist/blacklist senders
- Exclude specific channels
- Pause syncing anytime

### 13.5 AI Model Selection & Costs

**Free Tier Model:**
- Primary: GPT-4o (cost: ~$0.01/message)
- Monthly cap: 50 messages = ~$0.50/user/month

**Premium Tier Model:**
- Primary: GPT-4.5-Preview or Claude Opus 4.1 (cost: ~$0.05/message)
- No cap, but average usage: 300 messages/month = ~$15/user/month
- Profitable at $20/month price point

**Context Management:**
- Max context window: 20k tokens (~15k words)
- Prioritizes most recent + most relevant data
- Older conversations archived (retrievable via search)

### 13.6 Data Storage & Backup

**User Data Structure:**
- **Users:** Profile, settings, subscription status
- **Purpose & Values:** Text fields, evolution history
- **Goals:** Title, milestones, progress, completion date
- **Projects:** Name, color, task count
- **Tasks:** Title, project, tags, due date, subtasks, notes, completion
- **Calendar Events:** Synced data + metadata
- **Conversations:** Full chat history with AI
- **Reviews:** Weekly/monthly review text + AI summaries

**Backup Strategy:**
- **Cloud:** PostgreSQL with daily backups (7-day retention)
- **Local:** SQLite on-device (encrypted)
- **Export:** User can download full data as JSON anytime

**Data Retention:**
- Active data: Indefinite (as long as account exists)
- Deleted items: 30-day soft delete (recoverable)
- Closed accounts: 90-day retention (then permanent deletion)

### 13.7 Push Notifications

**Types:**
1. **Daily Briefing:** Morning summary (time customizable)
2. **Priority Suggestions:** Evening prompt (8 PM default)
3. **Task Reminders:** Based on due dates/times
4. **AI Insights:** Occasional proactive suggestions
5. **Streak Alerts:** Near-milestone or streak-break warnings
6. **Weekly Review:** Sunday evening prompt

**User Control:**
- Granular toggles for each type
- Quiet hours (no notifications during user-defined times)
- Critical only mode (only urgent reminders)

**Technical:**
- APNs (Apple Push Notification Service)
- Server-side scheduling (Node-cron)

---

## 14. Design System & UI Specifications

### 14.1 Visual Design Philosophy

**Principles:**
- **Minimalist:** Clean, white space, no clutter
- **Focused:** Visual hierarchy emphasizes priorities
- **Consistent:** Reusable components, predictable interactions
- **Accessible:** WCAG 2.1 AA compliant

**Color Palette (Default Theme):**
- **Primary:** Blue (#007AFF) - iOS standard
- **Accent:** Green (#34C759) - Completion, success
- **Warning:** Orange (#FF9500) - Overdue, alerts
- **Error:** Red (#FF3B30) - Destructive actions
- **Neutral:** Gray scale (#000 to #FFF)

**Typography:**
- **System Font:** SF Pro (iOS default)
- **Sizes:**
  - H1 (Screen Titles): 34pt Bold
  - H2 (Section Headers): 22pt Semibold
  - Body: 17pt Regular
  - Caption: 13pt Regular
- **Line Height:** 1.4x font size

### 14.2 Component Library

**Card Component:**
- Rounded corners (12px)
- Shadow: 0 2px 8px rgba(0,0,0,0.1)
- Padding: 16px
- Used for: Tasks, emails, briefings, goals

**Button Styles:**
- **Primary:** Filled blue, white text, 48px height
- **Secondary:** Outlined blue, blue text
- **Tertiary:** Text only, no border
- **Destructive:** Red text/fill

**Input Fields:**
- Height: 44px (thumb-friendly)
- Border: 1px solid #E0E0E0
- Focus: Blue border, subtle glow

**Progress Bar:**
- Height: 8px
- Filled: Green gradient
- Background: Light gray

### 14.3 Interaction Patterns

**Standard Gestures:**
- **Tap:** Select, activate
- **Long Press:** Quick actions menu
- **Swipe Left:** Reschedule or delete (contextual)
- **Pull-to-Refresh:** Sync data
- **Pinch:** Zoom calendar view

**Animations:**
- **Screen Transitions:** Slide (200ms ease-out)
- **Modal Appearance:** Slide up from bottom (300ms)
- **Checkbox Check:** Scale + rotate (150ms)
- **Confetti:** For streak milestones, goal completions

**Haptics:**
- **Light:** Checkbox tap
- **Medium:** Button press
- **Heavy:** Completion, error

### 14.4 Dark Mode Support

**All screens** must support:
- Light mode (default)
- Dark mode (pure black #000 for OLED)
- Auto mode (follows system)

**Color Adjustments:**
- Backgrounds: #FFF → #000
- Text: #000 → #FFF
- Cards: White → Dark gray (#1C1C1E)
- Shadows: Subtle glow instead

---

## 15. Launch Strategy & Go-to-Market

### 15.1 Launch Timeline

**Phase 1: Private Beta (Month 1-2)**
- 100 hand-picked users
- Intensive feedback collection
- Daily bug fixes

**Phase 2: Public Beta (Month 3)**
- TestFlight release
- 1,000 users
- Productâ€Hunt "Coming Soon" page

**Phase 3: V1 Launch (Month 4)**
- App Store release
- Press outreach
- Paid marketing begins

### 15.2 Target Audience (Launch)

**Primary:**
- Ambitious professionals (28-45 years old)
- Entrepreneurs & freelancers
- Location: US, Canada, UK (English-speaking)

**Psychographics:**
- Productivity-obsessed
- Reads books/podcasts on personal development
- Uses 3+ productivity apps currently (frustrated with fragmentation)
- Willing to pay for tools that work

### 15.3 Positioning & Messaging

**Brand Positioning:**
"Your AI Life Architect"

**Tagline:**
"One priority. Full picture. Total clarity."

**Key Messages:**
1. "Stop context-switching. One app for everything."
2. "AI that knows your purpose and keeps you aligned."
3. "Complete what matters. Ignore what doesn't."

**Differentiation:**
- vs. Todoist/Things: "We're proactive, not just a list."
- vs. Notion: "Simpler, AI-first, mobile-optimized."
- vs. Google Calendar: "We unify tasks + purpose + communications."

### 15.4 Marketing Channels

**Pre-Launch:**
1. **Email List:** Landing page with waitlist (goal: 5,000 signups)
2. **Social Media:** Twitter/X, LinkedIn thought leadership
3. **Content:** Blog posts on productivity, AI, intentional living

**Launch Week:**
1. **Product Hunt:** Aim for #1 Product of the Day
2. **Press:** TechCrunch, The Verge, Fast Company
3. **Influencers:** Partner with 5 productivity YouTubers (Ali Abdaal, Thomas Frank types)
4. **Communities:** Post in r/productivity, r/getdisciplined, HackerNews

**Post-Launch:**
1. **Paid Ads:** Facebook/Instagram (lookalike audiences)
2. **App Store Optimization:** Keywords, screenshots, reviews
3. **Referral Program:** "Give 1 month Premium, Get 1 month free"
4. **Lifecycle Emails:** Onboarding series, re-engagement

### 15.5 Success Metrics (First 90 Days)

**Acquisition:**
- 10,000 downloads
- 1,000 weekly active users

**Engagement:**
- 40% Day 7 retention
- 25% Day 30 retention
- 70% complete "North Star" conversation

**Revenue:**
- 8% free-to-paid conversion
- $10,000 MRR by Day 90

**Product:**
- App Store rating: >4.5 stars
- <1% crash rate
- Average AI response time: <1.5s

---

## 16. Future Roadmap (Post-V1)

### 16.1 Phase 2 (Months 4-6)

**Platform Expansion:**
- **iPad App:** Optimized for larger screen (side-by-side views)
- **Apple Watch App:** Quick capture, priority glance, streak tracking

**Features:**
- **Smart Scheduling:** AI suggests optimal meeting times based on attendee availability
- **Email Composer:** Send emails directly from app (not just quick replies)
- **Advanced Filters:** Custom views (e.g., "High priority + Due this week + Project X")

### 16.2 Phase 3 (Months 7-12)

**Platform:**
- **Android Launch:** Full feature parity with iOS

**Features:**
- **Collaboration:** Share projects with 1-2 people (lite teamwork)
- **Integrations:** Asana, Jira, Trello bi-directional sync
- **Voice Mode:** Full voice-controlled interface (like Siri but smarter)
- **Life Dashboard:** Beautiful visualizations of purpose alignment over time

### 16.3 Phase 4 (Year 2+)

**B2B Product:**
- **Whex for Teams:** Shared goals, team calendar, collaborative AI
- **Pricing:** $15/user/month (5-user minimum)

**Marketplace:**
- **Coach Integration:** Connect with human life coaches for accountability
- **Template Library:** Community-shared AI Assistant recipes

**Advanced AI:**
- **Predictive Insights:** "Based on your patterns, you're likely to miss this deadline. Want to adjust?"
- **Cross-App Learning:** AI learns from external tools (Notion, Asana) to improve suggestions

---

## 17. Quality Assurance & Testing

### 17.1 Testing Requirements

**Unit Tests:**
- 80% code coverage minimum
- All core functions (task creation, calendar sync, AI parsing)

**Integration Tests:**
- Calendar sync (Google, Outlook, Apple)
- Email/Slack integration
- Payment processing (in-app purchases)

**End-to-End Tests:**
- Critical user flows:
  - Onboarding → First task → North Star
  - Create task → Reschedule → Complete
  - AI chat → Suggested priority → Accept

**Performance Tests:**
- Load testing: 1,000 concurrent users
- Stress testing: 10,000 tasks in calendar
- Battery drain testing: <5% per hour of active use

### 17.2 Beta Testing Plan

**Private Beta (100 users):**
- Recruited from waitlist
- Daily feedback via in-app survey
- Weekly video interviews with 10 users

**Public Beta (1,000 users):**
- TestFlight distribution
- In-app feedback button (every screen)
- Analytics: Mixpanel for behavior tracking

**Metrics Tracked:**
- Crash-free rate (target: >99%)
- Average session length
- Feature adoption rates
- Drop-off points in onboarding

---

## 18. Support & Documentation

### 18.1 In-App Help

**Help Button:**
- Available in Settings
- Opens: FAQs, Video tutorials, Contact support

**Onboarding Tooltips:**
- First-time user guidance
- Dismissible, never intrusive
- Reactivate via Settings → "Show Tutorial Again"

**Contextual Help:**
- "?" icons on complex screens
- Explains features without leaving screen

### 18.2 External Resources

**Website:**
- docs.appname.com
- Comprehensive guides:
  - "Getting Started"
  - "Calendar Integration Setup"
  - "AI Assistant Recipes"
  - "Premium Features Guide"

**Video Library:**
- YouTube channel with 10-15 short tutorials
- Embedded in-app where relevant

**Community:**
- Discord server for users (optional)
- Subreddit: r/AppNameUsers

### 18.3 Customer Support

**Free Users:**
- Email support: support@appname.com
- Response time: Within 72 hours
- Self-service: FAQs, videos

**Premium Users:**
- Priority email support
- Response time: Within 24 hours
- Access to "Premium Support" Discord channel

**Critical Issues:**
- 24/7 monitoring for crashes
- Push notification if widespread outage
- Status page: status.appname.com

---

## 19. Privacy, Legal & Compliance

### 19.1 Privacy Policy Highlights

**Data Collection:**
- What we collect: Tasks, calendar, emails (if integrated), conversations with AI
- Why: To provide AI-powered productivity features
- **What we DON'T collect:** Location (unless user grants), browsing history, keystroke logging

**Data Usage:**
- AI processing: Server-side, encrypted, never used to train public models
- No selling data to third parties—ever
- No ads—ever (monetization via Premium only)

**User Rights:**
- Right to export all data (JSON format)
- Right to delete account (permanent, 90-day grace period)
- Right to exclude data from AI (mark as "Private")

**Compliance:**
- GDPR compliant (EU users)
- CCPA compliant (California users)
- COPPA compliant (no users under 13)

### 19.2 Terms of Service

**Key Terms:**
- User owns all their data
- Company owns the AI technology and app code
- Prohibited uses: Spam, abuse, illegal content
- Subscription terms: Cancel anytime, prorated refunds

### 19.3 Security Measures

**Infrastructure:**
- Hosted on AWS (SOC 2 compliant)
- DDoS protection (Cloudflare)
- Regular security audits (annual)

**App Security:**
- End-to-end encryption (AES-256)
- Biometric auth (Face ID/Touch ID) for app unlock
- Automatic logout after 30 days of inactivity

---

## 20. Success Criteria & Evaluation

### 20.1 Definition of Success (6 Months Post-Launch)

**User Metrics:**
- 50,000+ downloads
- 10,000 weekly active users
- 40% Day 7 retention
- 20% Day 90 retention

**Engagement:**
- 60% of users complete "North Star" conversation
- Average 3 sessions per day
- 70% use Chat screen weekly

**Business:**
- 10% free-to-paid conversion
- $50,000 MRR
- <5% monthly churn (paid users)

**Product Health:**
- 4.5+ star App Store rating
- <0.5% crash rate
- <2s average AI response time

### 20.2 Key Risks & Mitigation

**Risk 1: Poor AI Response Quality**
- Mitigation: A/B test models, collect user ratings, iterate prompts

**Risk 2: Calendar Sync Bugs**
- Mitigation: Extensive testing, gradual rollout, clear error messages

**Risk 3: Low Free-to-Paid Conversion**
- Mitigation: Optimize trial experience, add conversion prompts, improve Premium value

**Risk 4: User Overwhelm (Too Complex)**
- Mitigation: Simplify onboarding, hide advanced features initially, gather feedback

**Risk 5: Privacy Concerns (AI Access to Data)**
- Mitigation: Transparent communication, "Private" mode, user education

---

## 21. Appendix: Detailed User Flows

### 21.1 Core User Flow 1: New User → First Task → North Star

```
1. User signs up (email + password)
   ↓
2. Land on Chat Screen
   ↓
3. AI: "Welcome! What's the first thing on your mind?"
   ↓
4. User types: "I need to finish the report by Friday"
   ↓
5. AI: "Added! 'Finish report' is due Friday. ✓"
   ↓
6. AI: "Great start! Want to spend 5 min defining your North Star?"
   ↓
7a. User taps [Start North Star]
   ↓
8. Conversational Q&A (purpose, values, first goal)
   ↓
9. AI: "Perfect! Now connect your calendar to see your full day."
   ↓
10. User connects Google Calendar
   ↓
11. Land on Today screen (shows first task + synced events)
   ↓
12. Onboarding complete

7b. User taps [Maybe Later]
   ↓
8. Land on Tasks screen
   ↓
9. (North Star prompt reappears in 24 hours)
```

### 21.2 Core User Flow 2: Morning Routine

```
1. User wakes up, opens app (lands on Tasks screen)
   ↓
2. Sees AI Briefing card: "Good morning. 3 priorities, 1 overdue..."
   ↓
3. User taps briefing card
   ↓
4. Modal opens with detailed breakdown
   ↓
5. User reviews priorities, taps [Looks Good]
   ↓
6. Returns to Tasks list
   ↓
7. Completes first priority task (tap circle)
   ↓
8. Confetti animation + "1 of 3 done!"
   ↓
9. User navigates to Calendar screen
   ↓
10. Drags unscheduled task into 10am slot
   ↓
11. AI highlights optimal times (green)
   ↓
12. Task is scheduled
   ↓
13. User starts Focus Session for 10am task
   ↓
14. Focus Mode begins (notifications silenced)
```

### 21.3 Core User Flow 3: Weekly Review

```
1. Sunday 6pm: User receives notification
   ↓
2. "Your weekly review is ready"
   ↓
3. User taps notification → Opens Chat
   ↓
4. AI shows pre-filled insights:
   - "You completed 22/27 tasks (81%)"
   - "Launch Campaign goal: 60% complete"
   - "You missed Gym twice. What got in the way?"
   ↓
5. User types reflection: "Too many meetings, didn't have energy"
   ↓
6. AI: "Want me to block gym time earlier in the day next week?"
   ↓
7. User: "Yes, schedule it at 7am Mon/Wed/Fri"
   ↓
8. AI creates recurring tasks
   ↓
9. AI: "What was your biggest win this week?"
   ↓
10. User types: "Launched the beta to 50 users!"
   ↓
11. AI: "🎉 That's huge! How did it align with your purpose?"
   ↓
12. User reflects...
   ↓
13. Review saved to history (accessible on You screen)
```

---

## 22. Final Notes for Development Team

### 22.1 Development Priorities (Sprint Order)

**Sprint 1-2 (MVP Core):**
- User auth (signup, login)
- Task creation & display (Today screen)
- Calendar view (read-only)
- Basic AI chat (text only)

**Sprint 3-4 (Critical Features):**
- Calendar integration (Google Calendar)
- Two-way sync
- Quick Add modal
- Task detail screen

**Sprint 5-6 (Intelligence Layer):**
- AI priority suggestions
- North Star conversation
- Purpose & values storage
- Goal creation

**Sprint 7-8 (Polish & Premium):**
- Email integration
- AI Assistants (3 core recipes)
- Subscription system (in-app purchases)
- Weekly reviews

**Sprint 9-10 (Launch Prep):**
- Onboarding flow
- Notifications system
- Bug fixes
- App Store materials

### 22.2 Key Dependencies

**External Services:**
- OpenAI API (GPT-4o, GPT-4.5)
- Anthropic API (Claude Opus)
- Google Calendar API
- Microsoft Graph API (Outlook)
- Apple Push Notification Service
- Stripe (payments)

**Technical Requirements:**
- iOS 16+ (SwiftUI)
- Node.js 18+ (backend)
- PostgreSQL 14+
- Redis 7+

### 22.3 Critical Success Factors

1. **AI Response Quality:** This makes or breaks the product. Invest in prompt engineering.
2. **Sync Reliability:** Calendar sync must be bulletproof. No missing events.
3. **Performance:** App must feel instant (<1s load, <200ms transitions).
4. **Onboarding:** 70% must complete North Star conversation.
5. **Simplicity:** If users feel overwhelmed, they churn. Progressive disclosure is key.

---

## END OF DOCUMENT

**Total Screens:** 5 main tabs (Chat, Tasks, +, Notes, Calendar) + 1 drawer screen (You/Profile) + 6 detail screens (Task, Event, Goal, Project, Note, Focus, Search)

**Total Features:** 50+ (including AI Assistants, integrations, reviews, streaks, sync)

**Estimated Development Time:** 6-8 months (team of 4-5 engineers)

**Next Steps:**
1. Review this PRD with stakeholders
2. Create technical architecture document
3. Design mockups for all screens
4. Break into development sprints
5. Begin Sprint 1

---

*This document is the single source of truth for building the world's most intelligent productivity app.*