const cron = require("node-cron"); // 
const { pullSocialAccountsData } = require("./services/socialService");

// // Example 1: Run a task every minute
// cron.schedule("* * * * *", () => {
//     pullSocialAccountsData()
//   console.log(`⏰ Running cron job every minute: ${new Date().toISOString()}`);
//   // Place any task here (e.g., clearing cache, checking database health, etc.)
// });