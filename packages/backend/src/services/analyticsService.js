const { Analytic } = require("../models");
const { Op, Sequelize } = require("sequelize");
const db = require("../models");
const Link = db.Link;

// ✅ Fetch clicks per link with link title (Fixed Ambiguity)
const getTopLinks = async (userId) => {
  try {
    const clicksPerLink = await Analytic.findAll({
      attributes: [
        "link_id",
        [Sequelize.fn("COUNT", Sequelize.col("Analytic.id")), "clickCount"], // ✅ Ensure table prefix
        [Sequelize.col("Link.title"), "title"], // ✅ Correct aliasing
      ],
      where: { event_type: "click", user_id: userId },
      group: ["Analytic.link_id", "Link.id", "Link.title"], // ✅ Ensure grouping on all selected fields
      order: [[Sequelize.col("clickCount"), "DESC"]],
      include: [
        {
          model: Link,
          attributes: ["title"], // ✅ Ensure title is selected
          required: false, // ✅ Allows NULL if link_id doesn't exist in Links table
        },
      ],
      raw: true,
    });
    return clicksPerLink.length > 0
      ? clicksPerLink.map((c) => ({
          linkId: c.link_id || 0,
          title: c.title || "Unknown", // ✅ Correctly referencing alias
          clickCount: parseInt(c.clickCount, 10) || 0,
        }))
      : [{ linkId: 0, title: "No Data", clickCount: 0 }];
  } catch (error) {
    console.error("❌ Error fetching top links:", error);
    return [{ linkId: 0, title: "Error", clickCount: 0 }];
  }
};


// ✅ Fetch total views and views over time
const getProfileViews = async (userId) => {
  try {
    const totalViews = await Analytic.count({
      where: { event_type: "view", user_id: userId },
    });

    const viewsOverTime = await Analytic.findAll({
      attributes: [
        [Sequelize.fn("DATE", Sequelize.col("timestamp")), "date"],
        [Sequelize.fn("COUNT", Sequelize.col("Analytic.id")), "count"], // ✅ Fixed ambiguous column
      ],
      where: { event_type: "view", user_id: userId },
      group: [Sequelize.fn("DATE", Sequelize.col("timestamp"))],
      order: [[Sequelize.fn("DATE", Sequelize.col("timestamp")), "ASC"]],
      raw: true,
    });
     // ✅ Get this week's clicks (last 7 days)
    const thisWeekViews = await Analytic.count({
      where: {
        event_type: "view",
        user_id: userId,
        timestamp: {
          [Op.gte]: Sequelize.literal("CURRENT_DATE - INTERVAL '7 days'"),
        },
      },
    });

    // ✅ Get last week's clicks (from 14 days ago to 7 days ago)
    const lastWeekViews = await Analytic.count({
      where: {
        event_type: "view",
        user_id: userId,
        timestamp: {
          [Op.between]: [
            Sequelize.literal("CURRENT_DATE - INTERVAL '14 days'"),
            Sequelize.literal("CURRENT_DATE - INTERVAL '7 days'"),
          ],
        },
      },
    });

    // ✅ Get this month's clicks (last 30 days)
    const thisMonthViews = await Analytic.count({
      where: {
        event_type: "view",
        user_id: userId,
        timestamp: {
          [Op.gte]: Sequelize.literal("CURRENT_DATE - INTERVAL '1 month'"),
        },
      },
    });
    // ✅ Get today's clicks
    const todayViews = await Analytic.count({
      where: {
        event_type: "view",
        user_id: userId,
        timestamp: {
          [Op.gte]: Sequelize.literal("CURRENT_DATE"),
        },
      },
    });
    return {
      totalViews: totalViews || 0,
      viewsOverTime: viewsOverTime.length > 0 ? viewsOverTime : [{ date: new Date().toISOString().split("T")[0], count: 0 }],
      thisWeekViews: thisWeekViews || 0,
      lastWeekViews: lastWeekViews || 0,
      thisMonthViews: thisMonthViews || 0,
      todayViews: todayViews || 0,
    };
   
  } catch (error) {
    console.error("❌ Error fetching profile views:", error);
    return { totalViews: 0, viewsOverTime: [] };
  }
};

// ✅ Fetch total clicks & clicks per link
const getLinkClicks = async (userId) => {
  try {
    const totalClicks = await Analytic.count({
      where: { event_type: "click", user_id: userId },
    });

    const clicksPerLink = await Analytic.findAll({
      attributes: [
        "link_id",
        [Sequelize.fn("COUNT", Sequelize.col("Analytic.id")), "clickCount"], // ✅ Fixed column reference
        [Sequelize.col("Link.title"), "title"], // ✅ Correctly selecting Link.title
      ],
      where: { event_type: "click", user_id: userId },
      group: ["Analytic.link_id", "Link.id", "Link.title"], // ✅ Ensured title is included in GROUP BY
      order: [[Sequelize.col("clickCount"), "DESC"]],
      include: [
        {
          model: Link,
          attributes: [], // ✅ Avoid duplicate column issues
          required: false, // ✅ Allow unmatched links
        },
      ],
      raw: true,
    });

     // ✅ Get this week's clicks (last 7 days)
    const thisWeekClicks = await Analytic.count({
      where: {
        event_type: "click",
        user_id: userId,
        timestamp: {
          [Op.gte]: Sequelize.literal("CURRENT_DATE - INTERVAL '7 days'"),
        },
      },
    });

    // ✅ Get last week's clicks (from 14 days ago to 7 days ago)
    const lastWeekClicks = await Analytic.count({
      where: {
        event_type: "click",
        user_id: userId,
        timestamp: {
          [Op.between]: [
            Sequelize.literal("CURRENT_DATE - INTERVAL '14 days'"),
            Sequelize.literal("CURRENT_DATE - INTERVAL '7 days'"),
          ],
        },
      },
    });

    // ✅ Get this month's clicks (last 30 days)
    const thisMonthClicks = await Analytic.count({
      where: {
        event_type: "click",
        user_id: userId,
        timestamp: {
          [Op.gte]: Sequelize.literal("CURRENT_DATE - INTERVAL '1 month'"),
        },
      },
    });
    // ✅ Get today's clicks
    const todayClicks = await Analytic.count({
      where: {
        event_type: "click",
        user_id: userId,
        timestamp: {
          [Op.gte]: Sequelize.literal("CURRENT_DATE"),
        },
      },
    });
    return {
      totalClicks: totalClicks || 0,
      clicksPerLink:
        clicksPerLink.length > 0
          ? clicksPerLink.map((c) => ({
              linkId: c.link_id || 0,
              title: c.title || "Unknown", // ✅ Use correct alias
              clickCount: parseInt(c.clickCount, 10) || 0,
            }))
          : [{ linkId: 0, title: "No Data", clickCount: 0 }],
      thisWeekClicks: thisWeekClicks || 0,
      lastWeekClicks: lastWeekClicks || 0,
      thisMonthClicks: thisMonthClicks || 0,
      todayClicks: todayClicks || 0,
    };
  } catch (error) {
    console.error("❌ Error fetching link clicks:", error);
    return { totalClicks: 0, clicksPerLink: [] };
  }
};

const countClicksAndViews = async (linkId, userId, eventType) => {
  const analytics = new Analytic(
    {
      user_id: userId,
      event_type: eventType,
      link_id: linkId,
      timestamp: new Date(),
      created_at: new Date,
      created_at: new Date()
    });
  await analytics.save();
  return analytics;
}
module.exports = {
  getProfileViews,
  getLinkClicks,
  getTopLinks,
  countClicksAndViews,
};
