const { Analytic } = require('../models');
const { Op, Sequelize } = require("sequelize");

// Retrieve total views and views over time for a user's profile
const getTopLinks = async (userId) => {
    try {
    // Fetch clicks per link with link title
    const clicksPerLink = await Analytic.findAll({
      attributes: [
        "link_id",
        [Sequelize.fn("COUNT", Sequelize.col("id")), "clickCount"],
      ],
      where: { event_type: "click", user_id: userId },
      group: ["link_id"],
      order: [[Sequelize.col("clickCount"), "DESC"]],
      include: [
        {
          model: Links,
          attributes: ["title"],
          required: false, // Allow null links if link_id doesn't match any record
        },
      ],
      raw: true,
    });

    // Format output
    return clicksPerLink.length > 0
      ? clicksPerLink.map((c) => ({
          linkId: c.link_id || 0,
          title: c["Link.title"] || "Unknown",
          clickCount: parseInt(c.clickCount, 10) || 0,
        }))
      : [{ linkId: 0, title: "No Data", clickCount: 0 }];
  } catch (error) {
    console.error("Error fetching click analytics:", error);
    return [{ linkId: 0, title: "Error", clickCount: 0 }];
  }
};

// Retrieve total clicks and clicks per link for a user's profile
const getProfileViews = async (userId) => {
     try {
    // Get total views count for the given event type
    const totalViews = await Analytic.count({
      where: { event_type: "view", user_id: userId },
    });

    // Get views grouped by date for the given event type
    const viewsOverTime = await Analytic.findAll({
      attributes: [
        [Sequelize.fn("DATE", Sequelize.col("timestamp")), "date"],
        [Sequelize.fn("COUNT", Sequelize.col("id")), "count"],
      ],
      where: { event_type: "view", user_id: userId },
      group: [Sequelize.fn("DATE", Sequelize.col("timestamp"))],
      order: [[Sequelize.fn("DATE", Sequelize.col("timestamp")), "ASC"]],
      raw: true,
    });

    // Format output
    return {
      totalViews: totalViews || 0,
      viewsOverTime: viewsOverTime.length > 0 ? viewsOverTime : [{ date: new Date().toISOString().split("T")[0], count: 0 }],
    };
  } catch (error) {
    console.error("Error fetching analytics:", error);
    return { totalViews: 0, viewsOverTime: [] };
  }
};

// Retrieve top-performing links based on click counts
const getLinkClicks= async (userId) => {
    try {
    // Get total clicks count
    const totalClicks = await Analytic.count({
      where: { event_type: "click", user_id: userId },
    });

    // Get click count per link with link title
    const clicksPerLink = await Analytic.findAll({
      attributes: [
        "link_id",
        [Sequelize.fn("COUNT", Sequelize.col("id")), "clickCount"],
      ],
      where: { event_type: "click", user_id: userId },
      group: ["link_id"],
      order: [[Sequelize.col("clickCount"), "DESC"]],
      include: [
        {
          model: Links,
          attributes: ["title"],
          required: false, // Allow null links if link_id doesn't match any record
        },
      ],
      raw: true,
    });

    // Format output
    return {
      totalClicks: totalClicks || 0,
      clicksPerLink:
        clicksPerLink.length > 0
          ? clicksPerLink.map((c) => ({
              linkId: c.link_id || 0,
              title: c["Link.title"] || "Unknown",
              clickCount: c.clickCount || 0,
            }))
          : [{ linkId: 0, title: "No Data", clickCount: 0 }],
    };
  } catch (error) {
    console.error("Error fetching click analytics:", error);
    return { totalClicks: 0, clicksPerLink: [] };
  }
};

module.exports = {
    getProfileViews,
    getLinkClicks,
    getTopLinks
};
