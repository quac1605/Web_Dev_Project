import express from "express";

const app = express();
const port = 3000;

app.get("/", (req, res) => {
  const today = new Date();
  //Test code
  // weekend:
  // new Date("June 24, 2023 11:13:00");
  // weekday:
  // new Date("June 20, 2023 11:13:00");
  const day = today.getDay();

  // console.log(day);
  let dayType = "a weekday";
  let advice = "it's time to work hard";

  if (day === 0 || day === 6) {
    type = "the weekend";
    adv = "it's time to have some fun";
  }

  res.render("index.ejs", {
    dayType: dayType,
    advice: advice,
  });
});

app.listen(port, () => {
  console.log(`Server running on port ${port}.`);
});
