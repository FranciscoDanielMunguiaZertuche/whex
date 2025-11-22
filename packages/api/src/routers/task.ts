import { task } from "@whex/db/schema/app";
import { and, desc, eq, or } from "drizzle-orm";
import { z } from "zod";
import { protectedProcedure, router } from "../index";

export const taskRouter = router({
  // List tasks for the "Today" screen
  listToday: protectedProcedure.query(async ({ ctx }) => {
    const userId = ctx.session.user.id;

    // Get start and end of today (local time handling would ideally be better,
    // but for now we'll just fetch everything assigned to the user that isn't completed or was completed today)
    // In a real app, we'd pass the user's timezone or local date from the client.

    const tasks = await ctx.db.query.task.findMany({
      where: and(
        eq(task.userId, userId),
        or(
          // Show incomplete tasks
          eq(task.status, "todo"),
          eq(task.status, "in_progress")
          // OR tasks completed recently (e.g. today) - simplified for now to just show all
        )
      ),
      orderBy: [desc(task.isPriority), desc(task.createdAt)],
      with: {
        project: true,
        tags: {
          with: {
            tag: true,
          },
        },
      },
    });

    return tasks;
  }),

  create: protectedProcedure
    .input(
      z.object({
        title: z.string().min(1),
        notes: z.string().optional(),
        isPriority: z.boolean().default(false),
        dueDate: z.date().optional(),
        projectId: z.string().optional(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const [newTask] = await ctx.db
        .insert(task)
        .values({
          id: crypto.randomUUID(),
          userId: ctx.session.user.id,
          title: input.title,
          notes: input.notes,
          isPriority: input.isPriority,
          dueDate: input.dueDate,
          projectId: input.projectId,
          status: "todo",
        })
        .returning();
      return newTask;
    }),

  toggleComplete: protectedProcedure
    .input(z.object({ id: z.string(), isCompleted: z.boolean() }))
    .mutation(async ({ ctx, input }) => {
      const [updatedTask] = await ctx.db
        .update(task)
        .set({
          status: input.isCompleted ? "completed" : "todo",
          completedAt: input.isCompleted ? new Date() : null,
        })
        .where(and(eq(task.id, input.id), eq(task.userId, ctx.session.user.id)))
        .returning();
      return updatedTask;
    }),

  delete: protectedProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ ctx, input }) => {
      await ctx.db
        .delete(task)
        .where(
          and(eq(task.id, input.id), eq(task.userId, ctx.session.user.id))
        );
      return { success: true };
    }),
});
