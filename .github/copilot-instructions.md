---
applyTo: "**/*.{ts,tsx,js,jsx}"
---

# Whex - GitHub Copilot Instructions

## Project Overview

This is a **mobile-first iOS productivity application** (React Native/Expo) with a backend API server for **AI-powered life orchestration and daily task execution**.

**Target Users:** Ambitious professionals (28-45), freelancers, and entrepreneurs ("The Overwhelmed Achiever") who need to unify their purpose, goals, and daily execution in one intelligent app.

**Core Functionality:**
- AI Mentor chat interface for strategic guidance and task management
- Unified daily inbox combining tasks, calendar events, and AI-curated emails/messages
- Intelligent calendar with time-blocking and schedule optimization
- Purpose-driven goal tracking with weekly/monthly reviews
- Natural language task capture with AI parsing
- Full-context AI that understands user's purpose, values, goals, schedule, and communications

**Key Business Rules:**
- Mobile-first design with thumb-friendly bottom navigation (5 tabs: Chat, Today, +, Calendar, You)
- All AI responses must be <2 seconds (target <1.5s)
- Privacy-first: Users can mark events/tasks as "Private" (excluded from AI context)
- Free tier with GPT-4o, Premium tier with GPT-4.5-Preview/Claude Opus 4.1
- Maximum 3 priority tasks per day (AI-enforced focus)
- All user data encrypted at rest
- Onboarding must achieve first win (add task) in <60 seconds

---

## Tech Stack

### Backend
- **Framework:** Hono (lightweight web framework)
- **Language:** TypeScript 5.8 (strict mode enabled)
- **Runtime:** Bun 1.3.1 (JavaScript runtime)
- **Database:** 
  - Primary: PostgreSQL with Drizzle ORM
  - Managed via Docker Compose for local development
- **Authentication:** Better Auth (with @better-auth/expo for mobile)
- **API Style:** tRPC 11.5 (type-safe RPC) + REST endpoints for auth
- **AI Integration:** OpenAI GPT-4o / GPT-4.5-Preview, Anthropic Claude (planned)

### Mobile (Native)
- **Framework:** Expo 54 with Expo Router 6 (file-based routing)
- **Language:** TypeScript 5.3+ (strict mode enabled)
- **UI Framework:** React Native 0.81.4 with React 19.1
- **Navigation:** Expo Router with bottom tabs
- **Styling:** NativeWind 4.2 (Tailwind CSS for React Native) with CSS variables for theming
- **UI Components:** React Native Reusables (shadcn/ui port for React Native)
- **Icons:** lucide-react-native
- **State Management:** 
  - TanStack Query 5.85 for server state
  - tRPC React Query integration
  - TanStack Form 1.0 for form state
- **Animations:** React Native Reanimated 4.1 + React Native Worklets
- **Gestures:** React Native Gesture Handler 2.28
- **Storage:** Expo Secure Store for sensitive data (tokens, sessions)

### Infrastructure
- **Hosting:** TBD (likely Vercel for API + Expo EAS for mobile builds)
- **CI/CD:** GitHub Actions (`.github/workflows/ios-build.yml` for iOS builds)
- **Monitoring:** TBD (likely Sentry for errors)
- **Database Hosting:** TBD (likely Supabase or Railway for PostgreSQL)
- **Testing:**
  - Unit: Not yet configured (Vitest recommended)
  - Integration: Not yet configured
  - E2E: Not yet configured (Maestro recommended for React Native)

### Development Tools
- **Package Manager:** Bun 1.3.1 (workspaces-enabled)
- **Monorepo Tool:** Turborepo 2.5.4
- **Code Quality:** Biome 2.3.2 (linter + formatter), Ultracite presets, TypeScript strict mode
- **Database Migrations:** Drizzle Kit 0.31.2
- **Build Tool:** tsdown 0.15.5 (TypeScript bundler for packages)

---

## Project Structure

```
/
├── apps/                           # Applications (monorepo)
│   ├── native/                     # Expo React Native mobile app (primary)
│   │   ├── app/                    # Expo Router file-based routing
│   │   │   ├── _layout.tsx         # Root layout with providers
│   │   │   ├── index.tsx           # App entry/redirect screen
│   │   │   ├── modal.tsx           # Quick Add (+) modal
│   │   │   ├── profile.tsx         # Profile/"You" screen
│   │   │   ├── +not-found.tsx      # 404 screen
│   │   │   ├── (auth)/             # Auth route group
│   │   │   │   ├── _layout.tsx     # Auth layout
│   │   │   │   ├── sign-in.tsx     # Sign in screen
│   │   │   │   └── sign-up.tsx     # Sign up screen
│   │   │   └── (tabs)/             # Bottom tab navigator
│   │   │       ├── _layout.tsx     # Tab bar layout
│   │   │       ├── calendar.tsx    # Calendar screen
│   │   │       ├── chat.tsx        # AI Chat screen
│   │   │       ├── create.tsx      # Create tab (redirects to modal)
│   │   │       ├── notes.tsx       # Notes screen
│   │   │       └── tasks.tsx       # Tasks screen
│   │   ├── components/             # Shared React Native components
│   │   │   ├── ui/                 # React Native Reusables (shadcn/ui port)
│   │   │   │   ├── button.tsx      # Button with variants
│   │   │   │   ├── card.tsx        # Card container
│   │   │   │   ├── dialog.tsx      # Modal dialogs
│   │   │   │   ├── input.tsx       # Text input
│   │   │   │   ├── text.tsx        # Typography
│   │   │   │   └── ...             # 33 total components
│   │   │   ├── chat-drawer.tsx     # Chat history drawer
│   │   │   ├── container.tsx
│   │   │   ├── header-button.tsx
│   │   │   ├── sign-in.tsx
│   │   │   ├── sign-up.tsx
│   │   │   ├── swipeable-task-card.tsx  # Swipeable task component
│   │   │   ├── tabbar-icon.tsx
│   │   │   └── task-card.tsx       # Task card component
│   │   ├── lib/                    # Client libraries
│   │   │   ├── auth-client.ts      # Better Auth client config
│   │   │   ├── drawer-context.tsx  # Drawer state context
│   │   │   ├── theme-context.tsx   # Theme context for dark mode toggle
│   │   │   └── utils.ts            # cn() helper for className merging
│   │   ├── utils/                  # Utilities
│   │   │   └── trpc.ts             # tRPC React Query client setup
│   │   ├── assets/images/          # Static assets
│   │   ├── global.css              # Tailwind CSS with HSL theme variables
│   │   ├── tailwind.config.js      # NativeWind/Tailwind configuration
│   │   ├── nativewind-env.d.ts     # NativeWind TypeScript types
│   │   ├── theme.ts                # Theme tokens (legacy, for non-NativeWind usage)
│   │   ├── index.js                # Expo entry point
│   │   └── package.json
│   │
│   └── server/                     # Hono API server
│       ├── src/
│       │   └── index.ts            # Main server file (Hono + tRPC + Better Auth)
│       ├── tsdown.config.ts        # Build configuration
│       └── package.json
│
├── packages/                       # Shared libraries (monorepo packages)
│   ├── api/                        # tRPC API router definitions
│   │   ├── src/
│   │   │   ├── index.ts            # tRPC setup (routers, procedures)
│   │   │   ├── context.ts          # Request context (session, headers)
│   │   │   └── routers/
│   │   │       ├── index.ts        # App router (combines all routers)
│   │   │       └── task.ts         # Task-related procedures
│   │   ├── tsdown.config.ts
│   │   └── package.json
│   │
│   ├── auth/                       # Better Auth configuration
│   │   ├── src/
│   │   │   └── index.ts            # Auth setup (providers, plugins)
│   │   ├── tsdown.config.ts
│   │   └── package.json
│   │
│   └── db/                         # Database layer (Drizzle ORM)
│       ├── src/
│       │   ├── index.ts            # Database client export
│       │   └── schema/             # Drizzle schema definitions
│       │       ├── auth.ts         # Auth tables (user, session, account, verification)
│       │       └── app.ts          # App tables (tasks, goals, etc.)
│       ├── docker-compose.yml      # Local PostgreSQL container
│       ├── drizzle.config.ts       # Drizzle Kit configuration
│       └── package.json
│
├── .github/                        # GitHub configuration
│   ├── copilot-instructions.md     # This file
│   └── workflows/
│       └── ios-build.yml           # iOS build workflow (unsigned)
│
├── .vscode/
│   └── settings.json               # VS Code workspace settings
│
├── android/                        # Android native project
├── scripts/                        # Build/utility scripts
├── biome.json                      # Biome linter/formatter config
├── prd.md                          # Product Requirements Document (2.0)
├── prd.md                          # Product Requirements Document (2.0)
├── turbo.json                      # Turborepo task pipeline config
├── tsconfig.json                   # Root TypeScript config
├── tsconfig.base.json              # Shared TypeScript config
├── bunfig.toml                     # Bun runtime configuration
├── server-config.json              # Server configuration
└── package.json                    # Root workspace package.json
```

---

## Architecture Notes

### Authentication Flow
- Better Auth handles all auth logic (email/password, OAuth providers)
- Expo client uses `@better-auth/expo` for mobile-specific token storage (Expo Secure Store)
- Sessions managed via JWT tokens with refresh token rotation
- Auth endpoints exposed at `/api/auth/*` on the server
- tRPC procedures use `protectedProcedure` for authenticated routes

### Data Flow
1. **Mobile App** (Expo) → tRPC Client → HTTP/WebSocket
2. **API Server** (Hono) → tRPC Router → Context (session validation)
3. **Database** (PostgreSQL) ← Drizzle ORM ← API Layer
4. **AI Integration** (planned): Server-side OpenAI/Anthropic API calls with context assembly

### Key Design Patterns
- **Monorepo with Workspaces**: Bun workspaces + Turborepo for task orchestration
- **Type-safe API**: tRPC ensures end-to-end type safety (mobile ↔ server)
- **Schema-first Database**: Drizzle schema definitions generate TypeScript types
- **File-based Routing**: Expo Router uses filesystem for navigation structure
- **Shared Packages**: `@whex/api`, `@whex/auth`, `@whex/db` are workspace dependencies

### Performance Targets (from PRD)
- AI response time: <2 seconds (target <1.5s)
- Message send acknowledgment: <100ms
- List scroll: 60fps with 100+ items
- Calendar render: <500ms (1 month of events)
- Modal open animation: <300ms

---

## Development Commands

### Global Commands (from root)
- `bun check` - Run Biome linter/formatter (with auto-fix)
- `bun dev` - Start all apps in dev mode (Turborepo)
- `bun build` - Build all packages
- `bun check-types` - Run TypeScript type checking

### Mobile App (Native)
- `bun dev:native` - Start Expo dev server
- `cd apps/native && bun android` - Run on Android emulator
- `cd apps/native && bun ios` - Run on iOS simulator

### API Server
- `bun dev:server` - Start Hono server with hot reload

### Database (PostgreSQL + Drizzle)
- `bun db:start` - Start PostgreSQL container (detached)
- `bun db:watch` - Start PostgreSQL container (logs visible)
- `bun db:stop` - Stop PostgreSQL container
- `bun db:down` - Stop and remove PostgreSQL container
- `bun db:push` - Push schema changes to database
- `bun db:generate` - Generate SQL migrations from schema
- `bun db:migrate` - Run migrations
- `bun db:studio` - Open Drizzle Studio (database GUI)

---

## Coding Conventions

### General TypeScript
- Use **arrow functions** for all function expressions
- Use **const** for all variables that aren't reassigned
- Prefer **`T[]`** over **`Array<T>`** for array types
- Use **template literals** over string concatenation
- Use **object spread** (`{ ...obj }`) over `Object.assign()`
- Use **optional chaining** (`?.`) and **nullish coalescing** (`??`)
- No `any` types - use `unknown` or proper type definitions
- No `var` - use `const` or `let`
- No `console.*` in production code (use proper logging)

### React/React Native
- Use **function components** only (no class components)
- Call React hooks from **top level** of component functions only
- Specify **all dependencies** correctly in `useEffect`, `useMemo`, `useCallback`
- Use **arrow function bodies** consistently
- No passing children as props - nest between opening/closing tags
- Add **`key` prop** to elements in iterables (no array indices as keys)
- No array indices as keys (use stable IDs)

### File Organization
- Use **kebab-case** for all filenames (e.g., `sign-in.tsx`, not `SignIn.tsx`)
- Export types with **`export type`**, not **`export`**
- Import types with **`import type`**, not **`import`**
- Group imports: external packages → workspace packages → relative imports

### tRPC Procedures
- Use `publicProcedure` for unauthenticated endpoints
- Use `protectedProcedure` for authenticated endpoints (auto-checks session)
- Always validate inputs with **Zod schemas**
- Return consistent error shapes (tRPC `TRPCError`)

### Database (Drizzle)
- Define all schemas in `packages/db/src/schema/`
- Use **snake_case** for column names (e.g., `created_at`)
- Use **camelCase** for TypeScript field names (Drizzle auto-converts)
- Always add `.notNull()` or default values to columns
- Use `timestamp()` for dates, not `date()`

### Styling (NativeWind / Tailwind CSS)
- Use **NativeWind** with `className` prop for all styling
- Define theme colors as CSS variables in `apps/native/global.css`
- Configure Tailwind theme extensions in `apps/native/tailwind.config.js`
- Use semantic color classes: `bg-background`, `text-foreground`, `bg-card`, `border-border`, etc.
- Toggle dark mode by adding/removing `dark` class on root `GestureHandlerRootView`
- Use `useTheme()` hook only for React Navigation components that don't support `className`
- Biome auto-sorts Tailwind classes - run `bun check` to fix ordering
- Avoid nested ternaries in className - extract to helper functions if needed

#### React Native Reusables (UI Components)
- Use components from `@/components/ui/*` for consistent UI (shadcn/ui port)
- Import with: `import { Button } from '@/components/ui/button'`
- Components use `class-variance-authority` for variants
- Use `cn()` from `@/lib/utils` to merge className values
- All components support NativeWind className prop
- 32 components available: accordion, alert, alert-dialog, aspect-ratio, avatar, badge, button, card, checkbox, collapsible, context-menu, dialog, dropdown-menu, hover-card, icon, input, label, menubar, popover, progress, radio-group, select, separator, skeleton, switch, tabs, text, textarea, toggle, toggle-group, tooltip
- Components folder (`apps/native/components/ui`) is excluded from Biome linting

#### Theme Color Classes Available:
- **Backgrounds:** `bg-background`, `bg-card`, `bg-primary`, `bg-secondary`, `bg-destructive`, `bg-success`, `bg-warning`, `bg-info`, `bg-popover`, `bg-accent`, `bg-muted`
- **Text:** `text-foreground`, `text-muted-foreground`, `text-primary-foreground`, `text-card-foreground`, `text-popover-foreground`, `text-accent-foreground`, `text-destructive-foreground`
- **Borders:** `border-border`, `border-input`
- **States:** `bg-success`, `bg-warning`, `bg-destructive` (with matching foreground colors)

---

No event handlers on non-interactive els
Include generic font family in font families
No consecutive spaces in regex literals
Avoid `arguments`, comma op, and primitive type aliases
No empty type params in type aliases and interfaces
Keep fns under Cognitive Complexity limit
Limit nesting depth of `describe()` in tests
No unnecessary boolean casts or callbacks on `flatMap`
Use `for...of` vs `Array.forEach`
No classes w/ only static members
No `this` and `super` in static contexts
No unnecessary catch clauses, ctors, `continue`, escape sequences in regex literals, fragments, labels, or nested blocks
No empty exports
No renaming imports, exports, or destructured assignments to same name
No unnecessary string/template literal concatenation or useless cases in switch stmts, `this` aliasing, or `String.raw` without escape sequences
Use simpler alternatives to ternary ops if possible
No `any` or `unknown` as type constraints or initializing vars to `undefined`
Avoid `void` op
Use arrow fns vs function exprs
Use `Date.now()` for milliseconds since Unix Epoch
Use `.flatMap()` vs `map().flat()`
Use `indexOf`/`lastIndexOf` vs `findIndex`/`findLastIndex` for simple lookups
Use literal property access vs computed property access
Use binary, octal, or hex literals vs `parseInt()`
Use concise optional chains vs chained logical exprs
Use regex literals vs `RegExp` ctor
Use base 10 or underscore separators for number literal object member names
Remove redundant terms from logical exprs
Use `while` loops vs `for` loops if initializer and update aren't needed
No reassigning `const` vars or constant exprs in conditions
No `Math.min`/`Math.max` to clamp values where result is constant
No return values from ctors or setters
No empty character classes in regex literals or destructuring patterns
No `__dirname` and `__filename` in global scope
No calling global object props as fns or declaring fns and `var` accessible outside their block
Instantiate builtins correctly
Use `super()` correctly in classes
No vars and params before their decl
No `\8` and `\9` escape sequences in strings
No literal numbers that lose precision, configured els, or assigning where both sides are same
Compare string case modifications w/ compliant values
No lexical decls in switch clauses or undeclared vars
No unreachable code
Call `super()` exactly once before accessing `this` in ctors
No control flow stmts in `finally` blocks
No optional chaining where `undefined` is not allowed
No unused fn params, imports, labels, private class members, or vars
No return values from fns w/ return type `void`
Specify all dependencies correctly in React hooks
Call React hooks from top level of component fns
Use `isNaN()` when checking for NaN
Use `{ type: "json" }` for JSON module imports
Use radix arg w/ `parseInt()`
Start JSDoc comment lines w/ single asterisk
Move `for` loop counters in right direction
Compare `typeof` exprs to valid values
Include `yield` in generator fns
No importing deprecated exports, duplicate dependencies, or Promises where they're likely a mistake
No non-null assertions after optional chaining or shadowing vars from outer scope
No expr stmts that aren't fn calls or assignments or useless `undefined`
Use consistent arrow fn bodies and either `interface` or `type` consistently
Specify deletion date w/ `@deprecated` directive
Make switch-case stmts exhaustive and limit number of fn params
No spread syntax on accumulators, barrel files, `delete` op, dynamic namespace import access, or namespace imports
Declare regex literals at top level
No global `eval()`
No callbacks in async tests and hooks, TS enums, exporting imported vars, type annotations for vars initialized w/ literals, magic numbers without named constants, or TS namespaces
No negating `if` conditions when there's an `else` clause, nested ternary exprs, non-null assertions (`!`), reassigning fn params, parameter props in class ctors, specified global var names, importing specified modules, or specified user-defined types
No constants where value is upper-case version of name, template literals without interpolation or special chars, `else` blocks when `if` block breaks early, yoda exprs, or `Array` ctors
Use `String.slice()` vs `String.substr()` and `String.substring()`
Use `as const` vs literal type annotations and `at()` vs integer index access
Follow curly brace conventions
Use `else if` vs nested `if` in `else` clauses and single `if` vs nested `if` clauses
Use `T[]` vs `Array<T>`
Use `new` for all builtins except `String`, `Number`, and `Boolean`
Use consistent accessibility modifiers on class props and methods
Declare object literals consistently
Use `const` for vars only assigned once
Put default and optional fn params last
Include `default` clause in switch stmts
Specify reason arg w/ `@deprecated` directive
Explicitly initialize each enum member value
Use `**` op vs `Math.pow`
Use `export type` and `import type` for types
Use kebab-case, ASCII filenames
Use `for...of` vs `for` loops w/ array index access
Use `<>...</>` vs `<Fragment>...</Fragment>`
Capitalize all enum values
Place getters and setters for same prop adjacent
Use literal values for all enum members
Use `Number` props vs global ones
Use numeric separators in numeric literals
Use object spread vs `Object.assign()` for new objects
Mark members `readonly` if never modified outside ctor
No extra closing tags for comps without children
Use assignment op shorthand
Use fn types vs object types w/ call signatures
Add description param to `Symbol()`
Use template literals vs string concatenation
Use `new` when throwing an error
No throwing non-`Error` values
Use `String.trimStart()`/`String.trimEnd()` vs `String.trimLeft()`/`String.trimRight()`
No overload signatures that can be unified
Use standard constants vs approximated literals
No assigning in exprs
No async fns as Promise executors
No `!` pattern in first position of `files.includes`
No bitwise ops
No reassigning exceptions in catch clauses
No reassigning class members
No inserting comments as text nodes
No comparing against `-0`
No labeled stmts that aren't loops
No `void` type outside generic or return types
No `console`
No TS const enums
No exprs where op doesn't affect value
No control chars in regex literals
No `debugger`
Use `===` and `!==`
No duplicate case labels, class members, conditions in if-else-if chains, font family names, object keys, fn param names, or describe hooks
No empty block stmts, static blocks, or interfaces
No letting vars evolve into `any` type through reassignments
No `any` type
No `export` or `module.exports` in test files
No misusing non-null assertion op (`!`)
No fallthrough in switch clauses
No focused or disabled tests
No reassigning fn decls
No assigning to native objects and read-only global vars
Use `Number.isFinite` and `Number.isNaN` vs global `isFinite` and `isNaN`
No implicit `any` type on var decls
No assigning to imported bindings
No irregular whitespace chars
No labels that share name w/ var
No chars made w/ multiple code points in char classes
Use `new` and `constructor` properly
Place assertion fns inside `it()` fn calls
No shorthand assign when var appears on both sides
No octal escape sequences in strings
No `Object.prototype` builtins directly
No `quickfix.biome` in editor settings
No redeclaring vars, fns, classes, and types in same scope
No redundant `use strict`
No comparing where both sides are same
No shadowing restricted names
No shorthand props that override related longhand props
No sparse arrays
No template literal placeholder syntax in regular strings
No `then` prop
No `@ts-ignore` directive
No `let` or `var` vars that are read but never assigned
No merging interface and class decls unsafely
No unsafe negation (`!`)
No unnecessary escapes in strings or useless backreferences in regex literals
No `var`
No `with` stmts
No separating overload signatures
Use `await` in async fns
Use correct syntax for ignoring folders in config
Put default clauses in switch stmts last
Pass message value when creating built-in errors
Return value from get methods
Include `if` stmt in for-in loops
Use `Array.isArray()` vs `instanceof Array`
Return consistent values in iterable callbacks
Use `namespace` keyword vs `module` keyword
Use digits arg w/ `Number.prototype.toFixed()`
Use static `Response` methods vs `new Response()`
Use `use strict` directive in script files
No passing children as props. Nest children between opening and closing tags
No defining comps inside other comps
No reassigning props in React comps
Specify all dependencies correctly in React hooks
Call React hooks from top level of comp fns only
Add `key` prop to els in iterables
No legacy `React.forwardRef`. Use ref as prop instead (React 19+)
Use fn comps vs class comps
No array indices as keys
No duplicate props in JSX
No semicolons that change JSX el semantics