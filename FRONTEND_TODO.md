# Frontend Implementation TODO

This document tracks the frontend features that need to be implemented based on the PRD (Product Requirements Document).

---

## Implementation Status Overview

| Screen | Status | Completeness |
|--------|--------|--------------|
| Chat | ⚠️ Basic Shell | ~60% |
| Tasks | ⚠️ Partial | ~70% |
| Quick Add Modal | ⚠️ Partial | ~60% |
| Calendar | ⚠️ Basic Shell | ~40% |
| Notes | ⚠️ Basic Shell | ~25% |
| Profile/You | ⚠️ Display Only | ~50% |
| Drawer Menu | ✅ Fixed | 100% |
| Onboarding | ⚠️ Partial | 80% |
| Detail Screens | ⚠️ Partial | 40% |
| Search/Commands | ⚠️ Partial | 40% |

---

## SCREEN 1: Chat (AI Mentor)

### Missing Features
- [ ] Voice Input - Mic icon exists but no functionality (use Expo Speech or react-native-voice)
- [ ] Chat History Persistence - Messages reset on remount (store in local state/AsyncStorage)
- [ ] Quick Action Buttons - Buttons exist but don't trigger real actions
- [ ] Clear History Button - Icon is `SquarePen` (new chat), should also have clear option
- [x] Typing Indicator - Show when AI is "thinking"
- [x] Message Timestamps - Display time for each message
- [ ] Copy Message - Long press to copy message text
- [ ] Scroll to Bottom Button - Show when scrolled up in long conversations

### Future (Backend-Dependent)
- [ ] Full Context AI Integration
- [ ] Proactive Intelligence (daily priorities, schedule optimization)
- [ ] Conversation Modes (Coach/Assistant/Reflective)
- [ ] Weekly/Monthly/Quarterly Reviews

---

## SCREEN 2: Tasks (Unified Inbox + Dashboard)

### Missing Features
- [x] AI Focus Briefing - Currently hardcoded, should be dynamic based on actual tasks
- [x] Briefing Card Tap Expand - Button says "Tap to expand ↗" but no modal opens
- [x] Filter Button Functionality - Add filter modal (All/Priorities/By Project/By Tag, date range)
- [x] ••• Menu Functionality - Add dropdown menu (Refresh All, Mark All Complete, Settings)
- [ ] Swipe Left to Reschedule - Add swipe gesture with reschedule options
- [ ] Long Press Quick Actions - Add context menu (Edit, Reschedule, Mark Priority, Delete)
- [ ] Confetti Animation - Add celebration animation on task completion
- [ ] Task Due Time Display - Show actual due times from database
- [ ] Overdue Task Styling - Red flag icon for overdue tasks
- [ ] Collapse "Other Tasks" - If >5 tasks, show first 3 + "[+ X more]" expandable

### Partially Implemented
- [x] Pull-to-Refresh - Works
- [x] Priority Tasks Section - Shows priorities but needs real data
- [x] Task Toggle Complete - Basic tap to complete works

### Mock Data to Replace
- [ ] Actionable Emails Section - Currently hardcoded, needs real integration later
- [ ] AI Suggestions Section - Currently hardcoded suggestion
- [ ] Daily Briefing Text - Currently static "Good morning. 3 priorities..."

---

## SCREEN 3: Quick Add (+) Modal

### Missing Features
- [ ] Voice Input - Mic icon exists but no speech-to-text functionality
- [ ] Note Creation Flow - Type selector shows "note" but doesn't create notes
- [ ] Event Creation Flow - Type selector shows "event" but doesn't create events
- [ ] Edit Details Navigation - Should navigate to Task Detail Screen with pre-filled data
- [ ] AI Task Decomposition - "This looks big. Want me to break it down into steps?"
- [ ] Better AI Parsing - Current parsing is basic keyword matching, needs improvement

### Partially Implemented
- [x] Modal Animation - Slides up from bottom
- [x] Type Selector (Task/Note/Event) - UI works but only Task creation functional
- [x] Basic Keyword Parsing - Detects "tomorrow", "today", "urgent", etc.
- [x] AI Detected Preview - Shows parsed project/date/priority

---

## SCREEN 4: Calendar (Visual Time Management)

### Missing Features
- [ ] 3-Day View - Only Day/Week exist, add 3-Day toggle
- [ ] Month View - Add month calendar view
- [ ] Today Button - Quick jump to current day
- [ ] Dynamic Current Time Indicator - Currently hardcoded position
- [x] Tap Empty Slot - Should open Quick Add modal with time pre-filled
- [ ] Long Press + Drag to Create - Create placeholder block by dragging
- [ ] Drag to Reschedule Events - Move events by dragging up/down/left/right
- [ ] Drag Tasks from Unscheduled Tray - Drop onto calendar to schedule
- [ ] Swipe Actions on Events - Swipe right to complete, left to delete/reschedule
- [ ] Month/Year Navigation - Arrow buttons should actually navigate
- [ ] Pinch to Zoom - Change view type on pinch gesture

### Mock Data to Replace
- [ ] Events - Currently hardcoded (Team Sync, Budget Mtg, etc.)
- [ ] AI Suggestions - Hardcoded "Focus time?" suggestion
- [ ] Unscheduled Tasks Tray - Hardcoded task list
- [ ] Week Strip Dates - Currently shows Mon 1, Tue 2, etc. (static)

### Future (Backend-Dependent)
- [ ] Calendar Integration (Google/Outlook/Apple)
- [ ] Two-Way Sync
- [ ] AI Conflict Resolution
- [ ] AI Smart Suggestions

---

## SCREEN 5: Notes (Personal Knowledge Hub)

### Missing Features
- [ ] Note Creation Flow - Plus button exists but no creation screen
- [ ] Note Detail Screen - Notes should be tappable to open detail/editor
- [x] Search Functionality - Search icon exists but no search implementation
- [ ] Folders Section - PRD shows folders (Work, Personal, Ideas) - not visible
- [ ] Swipe to Delete - Swipe left to delete with confirmation
- [ ] Swipe to Pin/Unpin - Swipe right to toggle pin
- [ ] Long Press Quick Actions - Context menu (Pin, Move, Delete)
- [ ] Tags Functionality - Tags display but aren't tappable/filterable
- [ ] Rich Text Editor - For note content editing
- [ ] Note Linking ([[note]] syntax) - Link notes together
- [ ] Backlinks Section - Show notes that reference current note

### Mock Data to Replace
- [ ] Pinned Notes - Currently hardcoded (My Core Values, Project Ideas)
- [ ] Recent Notes - Currently hardcoded (Meeting notes, Book insights, etc.)

### Future Features
- [ ] Voice Notes - Record and transcribe
- [ ] AI Auto-Summarization
- [ ] AI Note Suggestions

---

## SCREEN 6: You (Profile & Settings)

### Missing Features
- [ ] North Star Edit Mode - Tap to edit purpose/values (conversational modal)
- [ ] Goal Detail Screen - Goals should be tappable to open detail view
- [ ] + Add Goal Flow - Conversational goal creation modal
- [ ] Project Detail Screen - Projects should be tappable to open detail view
- [ ] + Add Project Flow - Quick project creation modal
- [ ] Weekly Review Flow - "View Weekly Review" button should open review
- [x] Settings Navigation - All Quick Settings items should navigate to sub-screens:
  - [ ] AI Assistants & Automations screen
  - [ ] Preferences & Theme screen (with dark mode toggle!)
  - [ ] Integrations & Calendar screen
  - [ ] Account & Subscription screen
  - [ ] Help & Support screen

### Mock Data to Replace
- [ ] North Star Content - Currently hardcoded purpose/values
- [ ] Active Goals - Currently hardcoded (Launch Product V1, Run 3x per week)
- [ ] Active Projects - Currently hardcoded (Work, Marketing Campaign)
- [x] Insights Stats - Currently hardcoded "22/27 tasks", "7 day streak"

---

## Hamburger Menu (Drawer Navigation)

### Critical Issue: Wrong Content!
The drawer currently shows ChatGPT-style menu items instead of PRD requirements.

### Current (Fixed):
- [x] 🔍 Search - Universal search across tasks, notes, events, chat
- [x] 📊 Goals & Projects - Quick access to goal/project management
- [x] 🤖 AI Assistants - Manage automation recipes
- [x] ⚙️ Settings - Preferences, integrations, notifications
- [x] ❓ Help & Support - FAQs, contact, tutorials
- [x] Profile Section (Bottom) ✅ - Already implemented, navigates to /profile

---

## Onboarding Flow

### All Missing
- [x] Signup Screen - Current sign-in.tsx is placeholder text only
  - [x] Email + password form
  - [ ] Apple Sign In button
  - [ ] Google Sign In button
- [x] Welcome Chat Message - AI greets new user
- [ ] First Task Capture - Guide user to add first task in <60 seconds
- [ ] North Star Conversation - Optional purpose/values setup
- [ ] Calendar Integration Prompt - Connect calendar modal
- [ ] Guided Tour Tooltips - Explain each screen on first use

---

## Detail & Contextual Screens

### All Missing - Need to Create:

#### Task Detail Screen (`/task/[id].tsx`)
- [x] Title (editable)
- [x] Project selector (dropdown) - Mocked
- [x] Due date/time picker - Mocked
- [x] Priority toggle (High/Normal) - Mocked
- [x] Tags (multi-select or type-to-create) - Mocked
- [ ] Reminders (time-based)
- [x] Subtasks/Checklist - Mocked
- [x] Notes (rich text) - Mocked
- [ ] Activity Log
- [x] [Start Focus Session] button
- [x] [Delete Task] button
- [x] ••• Menu (Duplicate, Convert to Recurring, Share) - Header icon exists

#### Note Detail Screen (`/note/[id].tsx`)
- [ ] Title field
- [ ] Tags display/edit
- [ ] Folder indicator
- [ ] Modified date
- [ ] Rich text editor with formatting toolbar
- [ ] ••• Menu (Pin, Move, Add Tags, Share, Mark Private, Delete)

#### Goal Detail Screen (`/goal/[id].tsx`)
- [ ] Progress bar with %
- [ ] Due date countdown
- [ ] Description
- [ ] Milestones list with checkboxes
- [ ] Completed tasks history
- [ ] AI Insights section
- [ ] [Mark Goal Complete] button
- [ ] [Archive Goal] button

#### Project Detail Screen (`/project/[id].tsx`)
- [ ] Project name + icon/color
- [ ] Task count
- [ ] Filtered task list (To Do / Completed)
- [ ] [+ Add Task] button (pre-fills project)
- [ ] ⚙️ Settings (Edit name, Change icon/color, Archive)

#### Focus Mode Screen (`/focus/[taskId].tsx`)
- [x] Minimalist full-screen UI
- [x] Task title display
- [x] Countdown timer (default 25 min Pomodoro)
- [x] [Pause] and [+5 min] buttons
- [x] Notification silencing indicator
- [x] [Mark Complete & Exit] button
- [x] [End Session] button
- [x] Timer completion alert

---

## Search & Command Bar

### All Missing
- [ ] Pull-Down Search - Reveal search bar by pulling down on any screen
- [x] OR Header Search Icon - Alternative access method
- [x] Search Input - With keyboard auto-focus
- [x] Search Results Display:
  - [x] Tasks section
  - [x] Events section
  - [x] Notes section
  - [x] AI Answer section (for questions)
- [ ] Recent Searches - Show previous search terms
- [ ] Command Mode - "Reschedule my overdue tasks to tomorrow"

---

## Progress & Motivation System

### Missing Features
- [ ] Real Streak Tracking - Currently shows mock "7 day streak"
- [ ] Streak Break Detection - Reset when priorities missed
- [ ] Confetti Animation - On task/goal completion
- [ ] Milestone Notifications - At 7/30/90/365 days
- [ ] Theme Unlocks - New themes as rewards
- [ ] Vacation Mode Toggle - In settings, pause streaks
- [ ] Streak Freeze - Earn/spend freezes to skip days

---

## UI/UX Polish

### Missing Interactions
- [ ] Haptic Feedback - Light/Medium/Heavy on taps
- [ ] Skeleton Loading States - While data loads
- [ ] Empty States - When no tasks/notes/goals exist
- [ ] Error States - When network fails
- [ ] Pull-to-Refresh - On all list screens (some have it)
- [ ] Scroll to Top - Tap active tab to scroll up

### Missing Settings
- [ ] Dark Mode Toggle - Theme context exists but no UI toggle
- [ ] Notification Preferences - Granular controls
- [ ] AI Personality Setting - Supportive/Balanced/Direct
- [ ] Calendar Density - Minimal/Standard/Detailed
- [ ] Week Start Day - Sunday/Monday
- [ ] Working Hours - Define 9am-5pm or custom

---

## Priority Order for Implementation

### Phase 1: Core Functionality
- [x] Fix Drawer Menu Content (critical - wrong content)
- [x] Create Task Detail Screen
- [x] Add Note Detail Screen & Note Creation
- [x] Implement Task Swipe Gestures
- [x] Add Filter/Sort to Tasks Screen
- [x] Make Calendar Interactive (tap to create, navigate dates)

### Phase 2: Enhanced Experience
- [x] Create Goal Detail Screen
- [x] Create Project Detail Screen
- [x] Add Settings Screens (Theme toggle, etc.)
- [x] Implement Search Functionality
- [x] Add Onboarding Flow
- [x] Create Focus Mode Screen

### Phase 3: Polish
13. Add Haptic Feedback
14. Add Confetti/Celebration Animations
15. Implement Streak System UI
16. Add Empty/Loading/Error States
17. Voice Input (if feasible without backend)

---

## Notes

- Items marked "Future (Backend-Dependent)" require API integration
- Mock data sections should eventually pull from real database
- AI features require backend AI service integration
- Calendar/Email integrations require OAuth setup
