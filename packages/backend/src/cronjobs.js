const cron = require("node-cron"); // 
const { pullSocialAccountsData } = require("./services/socialService");

// // Example 1: Run a task every minute
cron.schedule("* * * * *", () => {
    // pullSocialAccountsData()
});