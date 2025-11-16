import { db, task } from "@whex/db";
import { and, desc, eq } from "drizzle-orm";
import { z } from "zod";
import { protectedProcedure, router } from "../index";

export const taskRouter = router({
  // Get all tasks for the authenticated user
  list: protectedProcedure
    .input(
      z
        .object({
          status: z
            .enum(["todo", "in_progress", "completed", "cancelled"])
            .optional(),
          dueDate: z.date().optional(),
          isPriorityTask: z.boolean().optional(),
        })
        .optional()
    )
    .query(async ({ ctx, input }) => {
      const userId = ctx.session.user.id;
      const conditions = [eq(task.userId, userId)];

      if (input?.status) {
        conditions.push(eq(task.status, input.status));
      }
      if (input?.isPriorityTask !== undefined) {
        conditions.push(eq(task.isPriorityTask, input.isPriorityTask));
      }

      const tasks = await db
        .select()
        .from(task)
        .where(and(...conditions))
        .orderBy(desc(task.createdAt));

      return tasks;
    }),

  // Get today's tasks
  today: protectedProcedure.query(async ({ ctx }) => {
    const userId = ctx.session.user.id;
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    const tasks = await db
      .select()
      .from(task)
      .where(and(eq(task.userId, userId), eq(task.status, "todo")))
      .orderBy(desc(task.isPriorityTask), desc(task.createdAt));

    return tasks;
  }),

  // Get a single task by ID
  getById: protectedProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ ctx, input }) => {
      const userId = ctx.session.user.id;
      const [taskRecord] = await db
        .select()
        .from(task)
        .where(and(eq(task.id, input.id), eq(task.userId, userId)));

      if (!taskRecord) {
        throw new Error("Task not found");
      }

      return taskRecord;
    }),

  // Create a new task
  create: protectedProcedure
    .input(
      z.object({
        title: z.string().min(1),
        description: z.string().optional(),
        goalId: z.string().optional(),
        priority: z.enum(["low", "medium", "high"]).default("medium"),
        isPriorityTask: z.boolean().default(false),
        dueDate: z.date().optional(),
        scheduledFor: z.date().optional(),
        estimatedMinutes: z.number().optional(),
        isPrivate: z.boolean().default(false),
        aiParsedFrom: z.string().optional(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const userId = ctx.session.user.id;

      const [newTask] = await db
        .insert(task)
        .values({
          id: `task-${Date.now()}`,
          userId,
          goalId: input.goalId,
          title: input.title,
          description: input.description,
          priority: input.priority,
          isPriorityTask: input.isPriorityTask,
          dueDate: input.dueDate,
          scheduledFor: input.scheduledFor,
          estimatedMinutes: input.estimatedMinutes,
          isPrivate: input.isPrivate,
          aiParsedFrom: input.aiParsedFrom,
          source: input.aiParsedFrom ? "ai_chat" : "manual",
          status: "todo",
          createdAt: new Date(),
          updatedAt: new Date(),
        })
        .returning();

      return newTask;
    }),

  // Update a task
  update: protectedProcedure
    .input(
      z.object({
        id: z.string(),
        title: z.string().min(1).optional(),
        description: z.string().optional(),
        status: z
          .enum(["todo", "in_progress", "completed", "cancelled"])
          .optional(),
        priority: z.enum(["low", "medium", "high"]).optional(),
        isPriorityTask: z.boolean().optional(),
        dueDate: z.date().optional(),
        scheduledFor: z.date().optional(),
        estimatedMinutes: z.number().optional(),
        actualMinutes: z.number().optional(),
        completedAt: z.date().optional(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const userId = ctx.session.user.id;
      const { id, ...updates } = input;

      const [updatedTask] = await db
        .update(task)
        .set({
          ...updates,
          updatedAt: new Date(),
        })
        .where(and(eq(task.id, id), eq(task.userId, userId)))
        .returning();

      if (!updatedTask) {
        throw new Error("Task not found");
      }

      return updatedTask;
    }),

  // Delete a task
  delete: protectedProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const userId = ctx.session.user.id;

      const [deletedTask] = await db
        .delete(task)
        .where(and(eq(task.id, input.id), eq(task.userId, userId)))
        .returning();

      if (!deletedTask) {
        throw new Error("Task not found");
      }

      return { success: true };
    }),

  // Toggle task completion
  toggleComplete: protectedProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const userId = ctx.session.user.id;

      const [currentTask] = await db
        .select()
        .from(task)
        .where(and(eq(task.id, input.id), eq(task.userId, userId)));

      if (!currentTask) {
        throw new Error("Task not found");
      }

      const isCompleting = currentTask.status !== "completed";

      const [updatedTask] = await db
        .update(task)
        .set({
          status: isCompleting ? "completed" : "todo",
          completedAt: isCompleting ? new Date() : null,
          updatedAt: new Date(),
        })
        .where(and(eq(task.id, input.id), eq(task.userId, userId)))
        .returning();

      return updatedTask;
    }),
});
