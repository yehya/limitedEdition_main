// CONTEXT: Creates scheduled (cron) functions. These run on a schedule
// (e.g., daily, hourly) for background tasks like cleanup, aggregation,
// sending notifications. Uses standard cron syntax.

import { onSchedule } from "firebase-functions/v2/scheduler";
import type { ScheduleOptions } from "firebase-functions/v2/scheduler";
import { logger } from "../logger.util";

/**
 * Create a scheduled function that runs on a cron schedule.
 * 
 * @param schedule - Cron expression (e.g., "0 1 * * *" = daily at 1 AM)
 * @param handler - Function to execute on schedule
 * @param options - Optional config (timeZone, region, etc.)
 * 
 * Examples:
 * - "0 * * * *" - Every hour
 * - "0 0 * * *" - Daily at midnight
 * - "0 1 * * *" - Daily at 1 AM
 * - "0 0 * * 0" - Weekly on Sunday at midnight
 */
export const createScheduledFunction = (
  schedule: string,
  handler: () => Promise<void>,
  options?: Partial<ScheduleOptions>
) => {
  return onSchedule(
    {
      schedule,
      timeZone: options?.timeZone ?? "UTC",
      region: options?.region ?? "us-central1",
      ...options,
    },
    async (event) => {
      try {
        await handler();
      } catch (error) {
        logger.error("Scheduled function error", { error });
        throw error;
      }
    }
  );
};
