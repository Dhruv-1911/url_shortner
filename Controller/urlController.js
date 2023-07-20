const shortid = require("shortid");
const URL = require("../model/url");

module.exports = {
  //here we render main home page
  geturl: async (req, res) => {
    const data = await URL.find({});

    return res.render("home", {
      datas: data,
    });
  },

  /* The `generateShortId` function is responsible for generating a short ID for a given URL and creating
a new entry in the database. */
  generateShortId: async (req, res) => {
    try {
      const url = req.body.url.trim();
      const data = await URL.find({});
      if (url.length < 1) {
        return res.render("home", {
          datas: data,
          Message: "You Have to add Original Url must require",
        });
      }

      const urls = await URL.find({ redirectURL: url });
      if (urls.length > 0) {
        return res.render("home", {
          datas: data,
          Message: "You have already create a short URL for this",
        });
      }

      const result = await URL.create({
        shortId: shortid.generate(),
        redirectURL: url,
        visitHistory: [],
      });

      return res.render("home", {
        id: result.shortId,
        datas: data,
      });
      // res.status(200).json({
      //   id: result.shortId,
      // });
    } catch (error) {
      return res.status(500).json({
        message: "Sommthing Went Wrong",
      });
    }
  },

  /* The `redirectOrVisiturl` function is responsible for redirecting the user to the original URL
associated with a given short ID. */
  redirectOrVisiturl: async (req, res) => {
    try {
      const shortId = req.params.shortid;

      const result = await URL.findOneAndUpdate(
        {
          shortId,
        },
        {
          $push: {
            visitHistory: {
              timestamp: Date.now(),
            },
          },
        }
      );

      return res.redirect(result.redirectURL);
    } catch (error) {
      return res.status(500).json({
        message: "Sommthing Went Wrong",
      });
    }
  },

  /* The `countVisit` function is responsible for counting the number of visits to a specific URL. */
  countVisit: async (req, res) => {
    try {
      const shortId = req.params.shortid;

      const result = await URL.findOne({ shortId });
      return res.status(200).json({
        "visit Count": result.visitHistory.length,
        data: result.visitHistory,
      });
    } catch (error) {
      return res.status(500).json({
        message: "Sommthing Went Wrong",
      });
    }
  },
};
