const authenticate = require("./auth/auth-middleware");

const homeRoutes = (app, fs) => {

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

  
  const dataPath = "./data/homes.json";

  // READ
  app.get("/homes", authenticate, (req, res) => {
    fs.readFile(dataPath, "utf8", (err, data) => {
      if (err) {
        throw err;
      }

      res.send(JSON.parse(data));
    });
  });

  app.get("/homes/:id", authenticate, (req, res) => {
    fs.readFile(dataPath, "utf8", (err, data) => {
      const homeId = req.params["id"];
      const homeObj = JSON.parse(data);

      if (err) {
        throw err;
      }

      res.send(homeObj[homeId]);
    });
  });

  app.get("/homes/:id/images", authenticate, (req, res) => {
    fs.readFile(dataPath, "utf8", (err, data) => {
      const homeId = req.params["id"];
      const homeObj = JSON.parse(data);

      if (err) {
        throw err;
      }

      res.send(homeObj[homeId].images);
    });
  });

  // CREATE
  app.post("/homes", authenticate, (req, res) => {
    readFile((data) => {
      const newHomeId = Object.keys(data).length + 1;

      data[newHomeId.toString()] = req.body;
      data[newHomeId].id = newHomeId;

      writeFile(JSON.stringify(data, null, 2), () => {
        res.status(200).send("new home listing added");
      });
    }, true);
  });

  // UPDATE
  app.put("/homes/:id", authenticate, (req, res) => {
    readFile((data) => {
      const homeId = req.params["id"];

      if (homeId in data) {
        data[homeId] = req.body;

        writeFile(JSON.stringify(data, null, 2), () => {
          res
            .status(200)
            .send(`home listing with id:${homeId} has been updated`);
        });
      } else {
        writeFile(JSON.stringify(data, null, 2), () => {
          res.status(404).send(`No home listing with id: ${homeId} found`);
        });
      }
    }, true);
  });

  // DELETE
  app.delete("/homes/:id", authenticate, (req, res) => {
    readFile((data) => {
      const homeId = req.params["id"];

      if (homeId in data) {
        delete data[homeId];

        writeFile(JSON.stringify(data, null, 2), () => {
          res
            .status(200)
            .send(`home listing with id:${homeId} has been deleted`);
        });
      } else {
        writeFile(JSON.stringify(data, null, 2), () => {
          res.status(404).send(`No home listing with id: ${homeId} found`);
        });
      }
    }, true);
  });
};

module.exports = homeRoutes;
