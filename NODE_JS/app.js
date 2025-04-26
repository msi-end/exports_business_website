const express = require("express");
const compression = require("compression");
const path = require("path");
const fs = require("fs");

const app = express();
const port = 3000;

app.use(compression());

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, "public"), { maxAge: '1d' }));

app.get("/", (req, res) => {
  res.render("index");
});

app.get("/fruits", (req, res) => {
  res.render("fruits");
});

app.get("/about-us", (req, res) => {
  res.render("about-us");
});

app.get("/vegetables", (req, res) => {
  res.render("vegetables");
});

app.get("/rice-corn", (req, res) => {
  res.render("rice-corn");
});

app.get("/northeast-source", (req, res) => {
  res.render("northeast-source");
});

app.get("/social-impact", (req, res) => {
  res.render("social-impact");
});

app.get("/cultivate-northeast", (req, res) => {
  res.render("cultivate-northeast");
});

app.get("/contact", (req, res) => {
  res.render("contact");
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something went wrong!");
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
