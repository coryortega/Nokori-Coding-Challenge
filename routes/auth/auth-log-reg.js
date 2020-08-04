const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const authRoutes = (app, fs) => {
  

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

  app.post("/register", (req, res) => {
    readFile((data) => {
      const newUserId = Object.keys(data).length + 1;

      let user = req.body;
      const hash = bcrypt.hashSync(user.password, 12);
      user.password = hash;

      // check if user already exists
      if (user.username in data) {
        res
          .status(409)
          .json({
            message: `The username '${user.username}' already exists. Pick another.`,
          });
      } else {
        // add the user if not
        data[user.username] = user;
        data[user.username].userId = newUserId;

        writeFile(JSON.stringify(data, null, 2), () => {
          res.status(201).send("new user added");
        });
      }
    }, true);
  });

  app.post("/login", (req, res) => {
    readFile((data) => {
      let { username, password } = req.body;

      if (
        data[username] &&
        bcrypt.compareSync(password, data[username].password)
      ) {
        const token = getJwtToken(username);
        res
          .status(200)
          .json({
            message: `Welcome back ${username}!`,
            token,
            id: `${data[username].userId}`,
          });
      } else {
        res
          .status(401)
          .json({ message: "Invalid user credentials, unauthorized." });
      }
    }, true);
  });

  // jwtToken Request
  function getJwtToken(username) {
    const payload = {
      username,
    };

    const secret = process.env.JWT_SECRET || "token safe, token secret";

    const options = {
      expiresIn: "8h",
    };

    return jwt.sign(payload, secret, options);
  }
};

module.exports = authRoutes;
