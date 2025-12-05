const express = require("express");
const compression = require("compression");
const path = require("path");
const fs = require("fs");
const { minify } = require("terser");
const CleanCSS = require("clean-css");

const app = express();
const port = 3019;

app.use(
  compression({
    level: 6,
    threshold: 0,
    filter: (req, res) => {
      if (req.headers["x-no-compression"]) {
        return false;
      }
      return compression.filter(req, res);
    },
  })
);

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(async (req, res, next) => {
  if (req.url.endsWith(".js")) {
    const filePath = path.join(__dirname, "public", req.url);
    try {
      const jsContent = fs.readFileSync(filePath, "utf8");
      const minified = await minify(jsContent);
      // res.setHeader("Content-Type", "application/javascript");
      // res.setHeader("Cache-Control", "public, max-age=86400");
      res.send(minified.code);
    } catch (err) {
      next();
    }
  } else if (req.url.endsWith(".css")) {
    const filePath = path.join(__dirname, "public", req.url);
    try {
      const cssContent = fs.readFileSync(filePath, "utf8");
      const minified = new CleanCSS().minify(cssContent);
      res.setHeader("Content-Type", "text/css");
      res.setHeader("Cache-Control", "public, max-age=86400");
      res.send(minified.styles);
    } catch (err) {
      next();
    }
  } else {
    next();
  }
});

app.use(
  express.static(path.join(__dirname, "public"), {
    // maxAge: "15d",
    // immutable: true,
    // etag: false,
  })
);



// Routes
app.get("/", (req, res) => res.render("index"));
app.get("/fruits", (req, res) => res.render("fruits"));
app.get("/about-us", (req, res) => res.render("about-us"));
app.get("/vegetables", (req, res) => res.render("vegetables"));
app.get("/rice-corn", (req, res) => res.render("rice-corn"));
app.get("/spices", (req, res) => res.render("spices"));
app.get("/northeast-source", (req, res) => res.render("northeast-source"));
app.get("/social-impact", (req, res) => res.render("social-impact"));
app.get("/cultivate-northeast", (req, res) =>
  res.render("cultivate-northeast")
);
app.get("/contact", (req, res) => res.render("contact"));

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something went wrong!");
});

app.listen(port, () => {
  console.log(`Server is running on port http://localhost:${port}`);
});
