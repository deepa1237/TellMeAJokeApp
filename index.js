const express = require("express");
const app = new express();
const axios = require("axios");
const port = 3000;

app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

let joke;
app.get("/", async (req, res) => {
   return res.render("index.ejs", { content: 'API response'});
})
app.post("/", async (req, res) => {
    const category = req.body.category;
    const response = await axios.get(`https://v2.jokeapi.dev/joke/${category}`)
    .then((response) => {
        res.render("index.ejs", { content :  response.data});
    })
    .catch((error) => {
        res.send({'Error': error.message})
    })
})

app.listen(port);
