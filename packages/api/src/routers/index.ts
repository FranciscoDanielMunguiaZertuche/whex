import { protectedProcedure, publicProcedure, router } from "../index";
import { eventRouter } from "./event";
import { goalRouter } from "./goal";
import { taskRouter } from "./task";

export const appRouter = router({
  healthCheck: publicProcedure.query(() => "OK"),
  privateData: protectedProcedure.query(({ ctx }) => ({
    message: "This is private",
    user: ctx.session.user,
  })),
  task: taskRouter,
  goal: goalRouter,
  event: eventRouter,
});
export type AppRouter = typeof appRouter;
