import express from "express";
import bodyParser from "body-parser";
import pg from "pg";

const app = express();
const port = 3000;

const db = new pg.Client({
  user: "postgres",
  host: "localhost",
  database: "secrets",
  password: "123456",
  port: 5432,
});
db.connect();


app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.get("/", (req, res) => {
  res.render("home.ejs");
});

app.get("/login", (req, res) => {
  res.render("login.ejs");
});

app.get("/register", (req, res) => {
  res.render("register.ejs");
});

app.post("/register", async (req, res) => {
  const email = req.body.username;
  const password = req.body.password;

  
  try {
    const checkedResult = await db.query("SELECT * FROM users WHERE email = $1", [email]);
    if (checkedResult.rows.length > 0) {
      console.log("User already exists:", checkedResult.rows[0]);
      res.render("register.ejs", { error: "User already exists" });
    } else {
      const result = await db.query("INSERT INTO users (email, password) VALUES ($1, $2)", [email, password]);
      console.log("User registered:", result);
      res.render("secrets.ejs");
    }
  } catch (err) {
    console.error(err);
    res.status(500).send("Database error");
  }
});

app.post("/login", async (req, res) => {
  const email = req.body.username;
  const password = req.body.password;

  try {
    const result = await db.query("SELECT * FROM users WHERE email = $1", [email]);
    if (result.rows.length > 0) {
      console.log("User found:", result.rows[0]);
      const user = result.rows[0];
      const stordedPassword = user.password;
      if (stordedPassword) {
        if (stordedPassword === password) {
          console.log("User logged in:", user);
          res.render("secrets.ejs");
        } else {
          res.send("Incorrect password");
        }
      }
    } else {
      res.send("No user found with this email");
    }
  } catch (err) {
    console.error(err);
    res.status(500).send("Database error");
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
