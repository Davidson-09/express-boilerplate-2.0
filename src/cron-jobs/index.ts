import sendReminder from "./send-remainder";

export const cronJobs = {
  sendReminder
};

// export it this way will make it easier for you to shut them down during a graceful shutdown