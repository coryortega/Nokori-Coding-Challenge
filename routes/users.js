const authenticate = require("./auth/auth-middleware");

const userRoutes = (app, fs) => {

// Helper functions for readind/writing JSON
  const readFile = (
    callback,
    returnJson = false,
    filePath = dataPath,
    encoding = "utf8"
  ) => {
    fs.readFile(filePath, encoding, (err, data) => {
      if (err) {
        throw err;
      }

      callback(returnJson ? JSON.parse(data) : data);
    });
  };

  const writeFile = (
    fileData,
    callback,
    filePath = dataPath,
    encoding = "utf8"
  ) => {
    fs.writeFile(filePath, fileData, encoding, (err) => {
      if (err) {
        throw err;
      }

      callback();
    });
  };


  const dataPath = "./data/users.json";

  // READ
  app.get("/users", authenticate, (req, res) => {
    fs.readFile(dataPath, "utf8", (err, data) => {
      if (err) {
        throw err;
      }

      res.send(JSON.parse(data));
    });
  });

  // DELETE
  app.delete("/users/:id", authenticate, (req, res) => {
    readFile((data) => {
      const userId = req.params["id"];

      if (userId in data) {
        delete data[userId];
        writeFile(JSON.stringify(data, null, 2), () => {
          res.status(200).send(`user with id:${userId} removed`);
        });
      } else {
        writeFile(JSON.stringify(data, null, 2), () => {
          res.status(201).send(`No user with id: ${userId} found`);
        });
      }
    }, true);
  });
};

module.exports = userRoutes;
