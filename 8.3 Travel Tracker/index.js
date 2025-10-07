import express from "express";
import bodyParser from "body-parser";
import pg from "pg";

const app = express();
const port = 3000;

const db = new pg.Client({
  user: "postgres",
  host: "localhost",
  database: "world",
  password: "123456",
  port: 5432,
});

db.connect();



app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

async function checkVisited() {
  const result = await db.query("SELECT country_code FROM visited_countries");

  let countries = [];
  result.rows.forEach((country) => {
    countries.push(country.country_code);
  });
  return countries;
}

app.get("/", async (req, res) => {
  //Write your code here.
  const countries = await checkVisited();
  console.log(countries);
  res.render("index.ejs", { countries: countries, total: countries.length });
});

app.post("/add", async (req, res) => {
  
  const country_name  = req.body["country"];

  try {
    const result = await db.query("SELECT country_code FROM countries WHERE LOWER(country_name) LIKE '%' || LOWER($1) || '%'", [country_name.toLowerCase()]);
    if (result.rows.length !== 0) {
      const data = result.rows[0];
      const country_code = data.country_code;
    try {
        await db.query("INSERT INTO visited_countries (country_code) VALUES ($1)", [country_code]);
        res.redirect("/");
      } catch (error) {
          console.error(error);
          const countries = await checkVisited();
          res.render("index.ejs", {
            countries: countries,
            total: countries.length,
            error: "Country is already there, try again.",
          });
        }
      }
    } catch (error) {
    console.error(error);
    const countries = await checkVisited();
    res.render("index.ejs", {
      countries: countries,
      total: countries.length,
      error: "Country not found, try again.",
    });
  }
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});


