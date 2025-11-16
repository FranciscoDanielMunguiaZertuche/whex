import { db, event } from "@whex/db";
import { and, eq, gte, lte } from "drizzle-orm";
import { z } from "zod";
import { protectedProcedure, router } from "../index";

export const eventRouter = router({
  // Get all events for the authenticated user
  list: protectedProcedure
    .input(
      z
        .object({
          startDate: z.date().optional(),
          endDate: z.date().optional(),
          eventType: z
            .enum(["event", "meeting", "focus_time", "break"])
            .optional(),
        })
        .optional()
    )
    .query(async ({ ctx, input }) => {
      const userId = ctx.session.user.id;
      const conditions = [eq(event.userId, userId)];

      if (input?.startDate) {
        conditions.push(gte(event.startTime, input.startDate));
      }
      if (input?.endDate) {
        conditions.push(lte(event.startTime, input.endDate));
      }
      if (input?.eventType) {
        conditions.push(eq(event.eventType, input.eventType));
      }

      const events = await db
        .select()
        .from(event)
        .where(and(...conditions))
        .orderBy(event.startTime);

      return events;
    }),

  // Get today's events
  today: protectedProcedure.query(async ({ ctx }) => {
    const userId = ctx.session.user.id;
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    const events = await db
      .select()
      .from(event)
      .where(
        and(
          eq(event.userId, userId),
          gte(event.startTime, today),
          lte(event.startTime, tomorrow)
        )
      )
      .orderBy(event.startTime);

    return events;
  }),

  // Get a single event by ID
  getById: protectedProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ ctx, input }) => {
      const userId = ctx.session.user.id;
      const [eventRecord] = await db
        .select()
        .from(event)
        .where(and(eq(event.id, input.id), eq(event.userId, userId)));

      if (!eventRecord) {
        throw new Error("Event not found");
      }

      return eventRecord;
    }),

  // Create a new event
  create: protectedProcedure
    .input(
      z.object({
        title: z.string().min(1),
        description: z.string().optional(),
        taskId: z.string().optional(),
        location: z.string().optional(),
        startTime: z.date(),
        endTime: z.date(),
        allDay: z.boolean().default(false),
        isPrivate: z.boolean().default(false),
        isTimeBlocked: z.boolean().default(false),
        eventType: z
          .enum(["event", "meeting", "focus_time", "break"])
          .default("event"),
        meetingLink: z.string().optional(),
        reminderMinutes: z.number().optional(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const userId = ctx.session.user.id;

      const [newEvent] = await db
        .insert(event)
        .values({
          id: `event-${Date.now()}`,
          userId,
          taskId: input.taskId,
          title: input.title,
          description: input.description,
          location: input.location,
          startTime: input.startTime,
          endTime: input.endTime,
          allDay: input.allDay,
          isPrivate: input.isPrivate,
          isTimeBlocked: input.isTimeBlocked,
          eventType: input.eventType,
          meetingLink: input.meetingLink,
          reminderMinutes: input.reminderMinutes,
          calendarSource: "manual",
          status: "confirmed",
          createdAt: new Date(),
          updatedAt: new Date(),
        })
        .returning();

      return newEvent;
    }),

  // Update an event
  update: protectedProcedure
    .input(
      z.object({
        id: z.string(),
        title: z.string().min(1).optional(),
        description: z.string().optional(),
        location: z.string().optional(),
        startTime: z.date().optional(),
        endTime: z.date().optional(),
        status: z.enum(["tentative", "confirmed", "cancelled"]).optional(),
        reminderMinutes: z.number().optional(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const userId = ctx.session.user.id;
      const { id, ...updates } = input;

      const [updatedEvent] = await db
        .update(event)
        .set({
          ...updates,
          updatedAt: new Date(),
        })
        .where(and(eq(event.id, id), eq(event.userId, userId)))
        .returning();

      if (!updatedEvent) {
        throw new Error("Event not found");
      }

      return updatedEvent;
    }),

  // Delete an event
  delete: protectedProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const userId = ctx.session.user.id;

      const [deletedEvent] = await db
        .delete(event)
        .where(and(eq(event.id, input.id), eq(event.userId, userId)))
        .returning();

      if (!deletedEvent) {
        throw new Error("Event not found");
      }

      return { success: true };
    }),
});
