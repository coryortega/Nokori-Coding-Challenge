// import other routes
const userRoutes = require("./users");
const homeRoutes = require("./homes");
const authRoutes = require("./auth/auth-log-reg.js");

const appRouter = (app, fs) => {
  // default route
  app.get("/", (req, res) => {
    res.send("welcome to the development api-server");
  });

  // // other routes
  authRoutes(app, fs);
  userRoutes(app, fs);
  homeRoutes(app, fs);
};

module.exports = appRouter;
