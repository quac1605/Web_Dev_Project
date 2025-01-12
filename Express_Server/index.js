import express from 'express';
const app = express();
const port = 4000;

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.get('/about', (req, res) => {
  res.send('About Us');
});

app.get('/contact', (req, res) => {
  res.send('Contact Us');
});

app.post("/register", (req, res) => {
  res.sendStatus(201);
});

app.put("/user/nnq", (req, res) => {
  res.sendStatus(200);
});

app.patch("/user/", (req, res) => {
  res.sendStatus(200);
});

app.delete("/user/nnq", (req, res) => {
  res.sendStatus(204);
}); 

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});