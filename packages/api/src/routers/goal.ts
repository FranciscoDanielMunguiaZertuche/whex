import { db, goal } from "@whex/db";
import { and, desc, eq } from "drizzle-orm";
import { z } from "zod";
import { protectedProcedure, router } from "../index";

const MAX_PROGRESS = 100;

export const goalRouter = router({
  // Get all goals for the authenticated user
  list: protectedProcedure
    .input(
      z
        .object({
          type: z
            .enum(["purpose", "annual", "quarterly", "monthly", "weekly"])
            .optional(),
          status: z.enum(["active", "completed", "archived"]).optional(),
        })
        .optional()
    )
    .query(async ({ ctx, input }) => {
      const userId = ctx.session.user.id;
      const conditions = [eq(goal.userId, userId)];

      if (input?.type) {
        conditions.push(eq(goal.type, input.type));
      }
      if (input?.status) {
        conditions.push(eq(goal.status, input.status));
      }

      const goals = await db
        .select()
        .from(goal)
        .where(and(...conditions))
        .orderBy(desc(goal.createdAt));

      return goals;
    }),

  // Get goal hierarchy (purpose → annual → quarterly → monthly → weekly)
  hierarchy: protectedProcedure.query(async ({ ctx }) => {
    const userId = ctx.session.user.id;

    const allGoals = await db
      .select()
      .from(goal)
      .where(and(eq(goal.userId, userId), eq(goal.status, "active")))
      .orderBy(desc(goal.createdAt));

    // Build hierarchy structure
    const goalMap = new Map(
      allGoals.map((g) => [g.id, { ...g, children: [] as typeof allGoals }])
    );
    const rootGoals: Array<
      (typeof allGoals)[number] & { children: typeof allGoals }
    > = [];

    for (const g of goalMap.values()) {
      if (g.parentGoalId && goalMap.has(g.parentGoalId)) {
        goalMap.get(g.parentGoalId)?.children.push(g);
      } else {
        rootGoals.push(g);
      }
    }

    return rootGoals;
  }),

  // Get a single goal by ID
  getById: protectedProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ ctx, input }) => {
      const userId = ctx.session.user.id;
      const [goalRecord] = await db
        .select()
        .from(goal)
        .where(and(eq(goal.id, input.id), eq(goal.userId, userId)));

      if (!goalRecord) {
        throw new Error("Goal not found");
      }

      return goalRecord;
    }),

  // Create a new goal
  create: protectedProcedure
    .input(
      z.object({
        title: z.string().min(1),
        description: z.string().optional(),
        type: z.enum(["purpose", "annual", "quarterly", "monthly", "weekly"]),
        parentGoalId: z.string().optional(),
        targetDate: z.date().optional(),
        isPrivate: z.boolean().default(false),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const userId = ctx.session.user.id;

      const [newGoal] = await db
        .insert(goal)
        .values({
          id: `goal-${Date.now()}`,
          userId,
          title: input.title,
          description: input.description,
          type: input.type,
          parentGoalId: input.parentGoalId,
          targetDate: input.targetDate,
          isPrivate: input.isPrivate,
          status: "active",
          progress: 0,
          createdAt: new Date(),
          updatedAt: new Date(),
        })
        .returning();

      return newGoal;
    }),

  // Update a goal
  update: protectedProcedure
    .input(
      z.object({
        id: z.string(),
        title: z.string().min(1).optional(),
        description: z.string().optional(),
        status: z.enum(["active", "completed", "archived"]).optional(),
        progress: z.number().min(0).max(MAX_PROGRESS).optional(),
        targetDate: z.date().optional(),
        completedAt: z.date().optional(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const userId = ctx.session.user.id;
      const { id, ...updates } = input;

      const [updatedGoal] = await db
        .update(goal)
        .set({
          ...updates,
          updatedAt: new Date(),
        })
        .where(and(eq(goal.id, id), eq(goal.userId, userId)))
        .returning();

      if (!updatedGoal) {
        throw new Error("Goal not found");
      }

      return updatedGoal;
    }),

  // Delete a goal
  delete: protectedProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const userId = ctx.session.user.id;

      const [deletedGoal] = await db
        .delete(goal)
        .where(and(eq(goal.id, input.id), eq(goal.userId, userId)))
        .returning();

      if (!deletedGoal) {
        throw new Error("Goal not found");
      }

      return { success: true };
    }),
});
