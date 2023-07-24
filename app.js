import express from "express";
const app = express()
import dotenv from "dotenv";
import ejs from "ejs";
import {generate} from "random-words";

app.use(express.static("public"));
app.set('view engine', 'ejs');
app.use(express.json());

let randomWords;

app.get("/", (req, res) => {
    res.redirect("/test");
})

app.get("/test", (req, res) => {
    randomWords = generate({exactly: 3, minLength: 6, maxLength: 6}).concat(generate({exactly: 16, minLength: 2, maxLength: 5}));
    randomWords = randomWords.concat(generate({exactly: 1, minLength: 7, maxLength: 8}));
    console.log(randomWords);
    function randomizeArray(array) {
        var swapIndex;
        for (var i = 0; i < array.length; i++){
            swapIndex = Math.floor(Math.random()*array.length);
            [array[swapIndex], array[i]] = [array[i], array[swapIndex]];
        }
      
        return array;
    }
    randomizeArray(randomWords);
    console.log(randomWords);
    res.render("index.ejs", {randomWords})
})

app.listen(process.env.PORT || 3000, () => {
    console.log("Server started on PORT 3000");
})