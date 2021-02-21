const express = require('express');
const recipes = require('./recipes.json').recipes;
const cors = require('cors');
const app = express();

app.use(cors());

app.use(express.static('public'));

app.get('/', (req,res) => {
    res.send('Hello World!');
});

app.get('/recipes', function(req,res) {
    overview = recipes.map((recipe) => ({
        name: recipe.name,
        imgmain: recipe.imgmain,
        hometag: recipe.hometag
    }));
    res.send(overview);
})

app.get('/recipes/:name', function (req,res) {
    detail = recipes.find((item) => 
        item.name === req.params.name
    );
    console.log(detail);
    res.send(detail);
})

app.listen(3001);