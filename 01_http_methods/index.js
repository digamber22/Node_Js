const express = require("express");
const fs = require("fs");
const users = require("./MOCK_DATA.json");

const app = express();
const port = 8000;

// middlewares
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

/* -------------------- GET ALL USERS (JSON) -------------------- */
app.get("/api/users", (req, res) => {
  res.json(users);
});

/* -------------------- SSR : USER NAMES LIST -------------------- */
app.get("/users", (req, res) => {
  const html = `
    <ul>
      ${users.map(u => `<li>${u.first_name}</li>`).join("")}
    </ul>
  `;
  res.send(html);
});

/* -------------------- GET | PATCH | DELETE USER -------------------- */
app.route("/api/users/:id")

  // GET single user
  .get((req, res) => {
    const id = Number(req.params.id);
    const user = users.find(u => u.id === id);

    if (!user) {
      return res.status(404).json({ status: "User not found" });
    }
    res.json(user);
  })

  // UPDATE user (PATCH)
  .patch((req, res) => {
    const id = Number(req.params.id);
    const index = users.findIndex(u => u.id === id);

    if (index === -1) {
      return res.status(404).json({ status: "User not found" });
    }

    users[index] = { ...users[index], ...req.body };

    fs.writeFile("./MOCK_DATA.json", JSON.stringify(users), () => {
      res.json({ status: "success", user: users[index] });
    });
  })

  // DELETE user
  .delete((req, res) => {
    const id = Number(req.params.id);
    const index = users.findIndex(u => u.id === id);

    if (index === -1) {
      return res.status(404).json({ status: "User not found" });
    }

    users.splice(index, 1);

    fs.writeFile("./MOCK_DATA.json", JSON.stringify(users), () => {
      res.json({ status: "success" });
    });
  });

/* -------------------- CREATE USER -------------------- */
app.post("/api/users", (req, res) => {
  const newUser = { ...req.body, id: users.length + 1 };
  users.push(newUser);

  fs.writeFile("./MOCK_DATA.json", JSON.stringify(users), () => {
    res.json({ status: "success", id: newUser.id });
  });
});

/* -------------------- SERVER -------------------- */
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
