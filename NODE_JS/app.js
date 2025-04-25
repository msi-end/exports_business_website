const express = require("express");
const compression = require("compression");
const path = require("path");
const htmlMinifier = require("html-minifier-terser");
const fs = require("fs");

const app = express();
const port = 3000;

app.use(compression());

const minifyHTML = (filePath, outputPath) => {
  fs.readFile(filePath, "utf8", (err, html) => {
    if (err) {
      console.error(`Error reading HTML file: ${err}`);
      return;
    }
    try {
      const minifiedHTML = htmlMinifier.minify(html, {
        collapseWhitespace: true,
        removeComments: true,
        minifyCSS: true,
        minifyJS: true,
      });
      fs.writeFile(outputPath, minifiedHTML, "utf8", (err) => {
        if (err) {
          console.error(`Error writing minified HTML: ${err}`);
        } else {
          console.log(`Minified HTML saved to ${outputPath}`);
        }
      });
    } catch (error) {
      console.error(`Error minifying HTML: ${error}`);
    }
  });
};

const htmlFilePath = path.join(__dirname, "views", "index.html");
const minifiedHtmlFilePath = path.join(__dirname, "views/minified", "index.min.html");
minifyHTML(htmlFilePath, minifiedHtmlFilePath);

app.use(
  express.static(path.join(__dirname, "views"), {
    maxAge: "1d",
  })
);

app.get("/", (req, res) => {
  res.send(minifiedHtmlFilePath);
});
app.use(express.static(path.join(__dirname, "public")));

app.get("/fruits", (req, res) => {
  res.sendFile(path.join(__dirname, "views/fruits.html"));
});

app.get("/about-us", (req, res) => {
  res.sendFile(path.join(__dirname, "views/about-us.html"));
});

app.get("/vegetables", (req, res) => {
  res.sendFile(path.join(__dirname, "views/vegetables.html"));
});

app.get("/rice-corn", (req, res) => {
  res.sendFile(path.join(__dirname, "views/rice-corn.html"));
});

app.get("/northeast-source", (req, res) => {
  res.sendFile(path.join(__dirname, "views/northeast-source.html"));
});

app.get("/social-impact", (req, res) => {
  res.sendFile(path.join(__dirname, "views/social-impact.html"));
});

app.get("/cultivate-northeast", (req, res) => {
  res.sendFile(path.join(__dirname, "views/cultivate-northeast.html"));
});

app.get("/contact", (req, res) => {
  res.sendFile(path.join(__dirname, "views/contact.html"));
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something went wrong!");
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
