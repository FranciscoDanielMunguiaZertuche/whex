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
- [ ] Voice Input - Mic icon exists but no functionality (use Expo Speech or react-native-voice) <!-- LOGIC -->
- [ ] Chat History Persistence - Messages reset on remount (store in local state/AsyncStorage) <!-- LOGIC -->
- [ ] Quick Action Buttons - Buttons exist but don't trigger real actions <!-- LOGIC -->
- [ ] Clear History Button - Icon is `SquarePen` (new chat), should also have clear option <!-- LOGIC -->
- [x] Typing Indicator - Show when AI is "thinking"
- [x] Message Timestamps - Display time for each message
- [ ] Copy Message - Long press to copy message text <!-- LOGIC -->
- [ ] Scroll to Bottom Button - Show when scrolled up in long conversations <!-- DESIGN -->

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
- [ ] Swipe Left to Reschedule - Add swipe gesture with reschedule options <!-- LOGIC -->
- [ ] Long Press Quick Actions - Add context menu (Edit, Reschedule, Mark Priority, Delete) <!-- LOGIC -->
- [ ] Confetti Animation - Add celebration animation on task completion <!-- DESIGN -->
- [ ] Task Due Time Display - Show actual due times from database <!-- LOGIC -->
- [ ] Overdue Task Styling - Red flag icon for overdue tasks <!-- DESIGN -->
- [ ] Collapse "Other Tasks" - If >5 tasks, show first 3 + "[+ X more]" expandable <!-- LOGIC -->

### Partially Implemented
- [x] Pull-to-Refresh - Works
- [x] Priority Tasks Section - Shows priorities but needs real data
- [x] Task Toggle Complete - Basic tap to complete works

### Mock Data to Replace
- [ ] Actionable Emails Section - Currently hardcoded, needs real integration later <!-- LOGIC -->
- [ ] AI Suggestions Section - Currently hardcoded suggestion <!-- LOGIC -->
- [ ] Daily Briefing Text - Currently static "Good morning. 3 priorities..." <!-- LOGIC -->

---

## SCREEN 3: Quick Add (+) Modal

### Missing Features
- [ ] Voice Input - Mic icon exists but no speech-to-text functionality <!-- LOGIC -->
- [ ] Note Creation Flow - Type selector shows "note" but doesn't create notes <!-- LOGIC -->
- [ ] Event Creation Flow - Type selector shows "event" but doesn't create events <!-- LOGIC -->
- [ ] Edit Details Navigation - Should navigate to Task Detail Screen with pre-filled data <!-- LOGIC -->
- [ ] AI Task Decomposition - "This looks big. Want me to break it down into steps?" <!-- LOGIC -->
- [ ] Better AI Parsing - Current parsing is basic keyword matching, needs improvement <!-- LOGIC -->

### Partially Implemented
- [x] Modal Animation - Slides up from bottom
- [x] Type Selector (Task/Note/Event) - UI works but only Task creation functional
- [x] Basic Keyword Parsing - Detects "tomorrow", "today", "urgent", etc.
- [x] AI Detected Preview - Shows parsed project/date/priority

---

## SCREEN 4: Calendar (Visual Time Management)

### Missing Features
- [ ] 3-Day View - Only Day/Week exist, add 3-Day toggle <!-- DESIGN -->
- [ ] Month View - Add month calendar view <!-- DESIGN -->
- [ ] Today Button - Quick jump to current day <!-- LOGIC -->
- [ ] Dynamic Current Time Indicator - Currently hardcoded position <!-- LOGIC -->
- [x] Tap Empty Slot - Should open Quick Add modal with time pre-filled
- [ ] Long Press + Drag to Create - Create placeholder block by dragging <!-- LOGIC -->
- [ ] Drag to Reschedule Events - Move events by dragging up/down/left/right <!-- LOGIC -->
- [ ] Drag Tasks from Unscheduled Tray - Drop onto calendar to schedule <!-- LOGIC -->
- [ ] Swipe Actions on Events - Swipe right to complete, left to delete/reschedule <!-- LOGIC -->
- [ ] Month/Year Navigation - Arrow buttons should actually navigate <!-- LOGIC -->
- [ ] Pinch to Zoom - Change view type on pinch gesture <!-- LOGIC -->

### Mock Data to Replace
- [ ] Events - Currently hardcoded (Team Sync, Budget Mtg, etc.) <!-- LOGIC -->
- [ ] AI Suggestions - Hardcoded "Focus time?" suggestion <!-- LOGIC -->
- [ ] Unscheduled Tasks Tray - Hardcoded task list <!-- LOGIC -->
- [ ] Week Strip Dates - Currently shows Mon 1, Tue 2, etc. (static) <!-- LOGIC -->

### Future (Backend-Dependent)
- [ ] Calendar Integration (Google/Outlook/Apple) <!-- LOGIC -->
- [ ] Two-Way Sync <!-- LOGIC -->
- [ ] AI Conflict Resolution <!-- LOGIC -->
- [ ] AI Smart Suggestions <!-- LOGIC -->

---

## SCREEN 5: Notes (Personal Knowledge Hub)

### Missing Features
- [ ] Note Creation Flow - Plus button exists but no creation screen <!-- LOGIC -->
- [ ] Note Detail Screen - Notes should be tappable to open detail/editor <!-- LOGIC -->
- [x] Search Functionality - Search icon exists but no search implementation
- [ ] Folders Section - PRD shows folders (Work, Personal, Ideas) - not visible <!-- DESIGN -->
- [ ] Swipe to Delete - Swipe left to delete with confirmation <!-- LOGIC -->
- [ ] Swipe to Pin/Unpin - Swipe right to toggle pin <!-- LOGIC -->
- [ ] Long Press Quick Actions - Context menu (Pin, Move, Delete) <!-- LOGIC -->
- [ ] Tags Functionality - Tags display but aren't tappable/filterable <!-- LOGIC -->
- [ ] Rich Text Editor - For note content editing <!-- LOGIC -->
- [ ] Note Linking ([[note]] syntax) - Link notes together <!-- LOGIC -->
- [ ] Backlinks Section - Show notes that reference current note <!-- LOGIC -->

### Mock Data to Replace
- [ ] Pinned Notes - Currently hardcoded (My Core Values, Project Ideas) <!-- LOGIC -->
- [ ] Recent Notes - Currently hardcoded (Meeting notes, Book insights, etc.) <!-- LOGIC -->

### Future Features
- [ ] Voice Notes - Record and transcribe <!-- LOGIC -->
- [ ] AI Auto-Summarization <!-- LOGIC -->
- [ ] AI Note Suggestions <!-- LOGIC -->

---

## SCREEN 6: You (Profile & Settings)

### Missing Features
- [ ] North Star Edit Mode - Tap to edit purpose/values (conversational modal) <!-- DESIGN -->
- [ ] Goal Detail Screen - Goals should be tappable to open detail view <!-- LOGIC -->
- [ ] + Add Goal Flow - Conversational goal creation modal <!-- DESIGN -->
- [ ] Project Detail Screen - Projects should be tappable to open detail view <!-- LOGIC -->
- [ ] + Add Project Flow - Quick project creation modal <!-- DESIGN -->
- [ ] Weekly Review Flow - "View Weekly Review" button should open review <!-- DESIGN -->
- [x] Settings Navigation - All Quick Settings items should navigate to sub-screens:
  - [ ] AI Assistants & Automations screen <!-- DESIGN -->
  - [ ] Preferences & Theme screen (with dark mode toggle!) <!-- DESIGN -->
  - [ ] Integrations & Calendar screen <!-- DESIGN -->
  - [ ] Account & Subscription screen <!-- DESIGN -->
  - [ ] Help & Support screen <!-- DESIGN -->

### Mock Data to Replace
- [ ] North Star Content - Currently hardcoded purpose/values <!-- LOGIC -->
- [ ] Active Goals - Currently hardcoded (Launch Product V1, Run 3x per week) <!-- LOGIC -->
- [ ] Active Projects - Currently hardcoded (Work, Marketing Campaign) <!-- LOGIC -->
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
  - [ ] Apple Sign In button <!-- LOGIC -->
  - [ ] Google Sign In button <!-- LOGIC -->
- [x] Welcome Chat Message - AI greets new user
- [ ] First Task Capture - Guide user to add first task in <60 seconds <!-- DESIGN -->
- [ ] North Star Conversation - Optional purpose/values setup <!-- DESIGN -->
- [ ] Calendar Integration Prompt - Connect calendar modal <!-- DESIGN -->
- [ ] Guided Tour Tooltips - Explain each screen on first use <!-- DESIGN -->

---

## Detail & Contextual Screens

### All Missing - Need to Create:

#### Task Detail Screen (`/task/[id].tsx`)
- [x] Title (editable)
- [x] Project selector (dropdown) - Mocked
- [x] Due date/time picker - Mocked
- [x] Priority toggle (High/Normal) - Mocked
- [x] Tags (multi-select or type-to-create) - Mocked
- [ ] Reminders (time-based) <!-- LOGIC -->
- [x] Subtasks/Checklist - Mocked
- [x] Notes (rich text) - Mocked
- [ ] Activity Log <!-- DESIGN -->
- [x] [Start Focus Session] button
- [x] [Delete Task] button
- [x] ••• Menu (Duplicate, Convert to Recurring, Share) - Header icon exists

#### Note Detail Screen (`/note/[id].tsx`)
- [ ] Title field <!-- DESIGN -->
- [ ] Tags display/edit <!-- DESIGN -->
- [ ] Folder indicator <!-- DESIGN -->
- [ ] Modified date <!-- DESIGN -->
- [ ] Rich text editor with formatting toolbar <!-- LOGIC -->
- [ ] ••• Menu (Pin, Move, Add Tags, Share, Mark Private, Delete) <!-- LOGIC -->

#### Goal Detail Screen (`/goal/[id].tsx`)
- [ ] Progress bar with % <!-- DESIGN -->
- [ ] Due date countdown <!-- DESIGN -->
- [ ] Description <!-- DESIGN -->
- [ ] Milestones list with checkboxes <!-- LOGIC -->
- [ ] Completed tasks history <!-- LOGIC -->
- [ ] AI Insights section <!-- DESIGN -->
- [ ] [Mark Goal Complete] button <!-- LOGIC -->
- [ ] [Archive Goal] button <!-- LOGIC -->

#### Project Detail Screen (`/project/[id].tsx`)
- [ ] Project name + icon/color <!-- DESIGN -->
- [ ] Task count <!-- DESIGN -->
- [ ] Filtered task list (To Do / Completed) <!-- LOGIC -->
- [ ] [+ Add Task] button (pre-fills project) <!-- LOGIC -->
- [ ] ⚙️ Settings (Edit name, Change icon/color, Archive) <!-- LOGIC -->

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
- [ ] Pull-Down Search - Reveal search bar by pulling down on any screen <!-- LOGIC -->
- [x] OR Header Search Icon - Alternative access method
- [x] Search Input - With keyboard auto-focus
- [x] Search Results Display:
  - [x] Tasks section
  - [x] Events section
  - [x] Notes section
  - [x] AI Answer section (for questions)
- [ ] Recent Searches - Show previous search terms <!-- LOGIC -->
- [ ] Command Mode - "Reschedule my overdue tasks to tomorrow" <!-- LOGIC -->

---

## Progress & Motivation System

### Missing Features
- [ ] Real Streak Tracking - Currently shows mock "7 day streak" <!-- LOGIC -->
- [ ] Streak Break Detection - Reset when priorities missed <!-- LOGIC -->
- [ ] Confetti Animation - On task/goal completion <!-- DESIGN -->
- [ ] Milestone Notifications - At 7/30/90/365 days <!-- LOGIC -->
- [ ] Theme Unlocks - New themes as rewards <!-- LOGIC -->
- [ ] Vacation Mode Toggle - In settings, pause streaks <!-- LOGIC -->
- [ ] Streak Freeze - Earn/spend freezes to skip days <!-- LOGIC -->

---

## UI/UX Polish

### Missing Interactions
- [ ] Haptic Feedback - Light/Medium/Heavy on taps <!-- LOGIC -->
- [ ] Skeleton Loading States - While data loads <!-- DESIGN -->
- [ ] Empty States - When no tasks/notes/goals exist <!-- DESIGN -->
- [ ] Error States - When network fails <!-- DESIGN -->
- [ ] Pull-to-Refresh - On all list screens (some have it) <!-- LOGIC -->
- [ ] Scroll to Top - Tap active tab to scroll up <!-- LOGIC -->

### Missing Settings
- [ ] Dark Mode Toggle - Theme context exists but no UI toggle <!-- LOGIC -->
- [ ] Notification Preferences - Granular controls <!-- DESIGN -->
- [ ] AI Personality Setting - Supportive/Balanced/Direct <!-- DESIGN -->
- [ ] Calendar Density - Minimal/Standard/Detailed <!-- DESIGN -->
- [ ] Week Start Day - Sunday/Monday <!-- LOGIC -->
- [ ] Working Hours - Define 9am-5pm or custom <!-- DESIGN -->

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
