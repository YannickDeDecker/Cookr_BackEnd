const express = require("express");
const recipes = require("./recipes.json").recipes; //JSON FILE IMPORT
const cors = require("cors"); //CROSS ORIGIN RESOURCE SHARING
const app = express();

app.use(cors());

app.use(express.static("public")); //SERVE STATIC FILES FROM PUBLIC FOLDER

//ENDPOINT FOR LOADING SCREEN
app.get("/", (req, res) => {
  res.send("Hello World!");
});

//HOMEPAGE
app.get("/recipes", function (req, res) {
  overview = recipes.map((recipe) => ({
    name: recipe.name,
    imgmain: recipe.imgmain,
    hometag: recipe.hometag,
  }));
  res.send(overview);
});

//GIVES ONE RECIPE PAGE
app.get("/recipes/:name", function (req, res) {
  detail = recipes.find((item) => item.name === req.params.name);
  console.log(detail);
  res.send(detail);
});

//SEARCH FUNCTION
app.get("/search", function (req, res) {
  let query = req.query.q?.toLowerCase();
  if (query) {
    let results = recipes.filter(
      (recipe) =>
        recipe.name.toLowerCase().includes(query) ||
        recipe.tags.find((tag) => tag.toLowerCase().includes(query)) ||
        recipe.ingredients.find((ingredient) =>
          ingredient.toLowerCase().includes(query)
        )
    );
    res.send(
      results.map((result) => ({
        name: result.name,
        imgmain: result.imgmain,
        hometag: result.hometag,
      }))
    );
  } else {
    res.status(400).send("Empty Query");
  }
});

app.listen(process.env.PORT || 3001);
