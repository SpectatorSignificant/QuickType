import express from "express";
const app = express()
import dotenv from "dotenv";
import ejs from "ejs";
import {generate} from "random-words";
import { createUser, updateUser, findUser, searchUsers } from "./mongoose.js"

app.use(express.static("public"));
app.set('view engine', 'ejs');
app.use(express.json());

let randomWords, score, rawScore;
let username = "user1";

function randomizeArray(array) {
    var swapIndex;
    for (var i = 0; i < array.length; i++){
        swapIndex = Math.floor(Math.random()*array.length);
        [array[swapIndex], array[i]] = [array[i], array[swapIndex]];
    }
  
    return array;
}

app.get("/", (req, res) => {
    res.redirect("/test");
})

app.get("/test", (req, res) => {
    randomWords = generate({exactly: 4, minLength: 6, maxLength: 6}).concat(generate({exactly: 16, minLength: 2, maxLength: 5}));
    randomWords = randomWords.concat(generate({exactly: 1, minLength: 7, maxLength: 8}));
    randomizeArray(randomWords);
    res.render("test.ejs", {randomWords})
})

app.get("/score", async (req, res) => {
    const userScores = (await findUser(username)).score
    const userTimes = (await findUser(username)).time
    res.render("score.ejs", { userScores, userTimes, rawScore, score})
})

app.post("/test", (req, res) => {
    console.log(req.body);
    rawScore = req.body.rawScore;
    score = req.body.score;
    updateUser(username, { $push: { score: req.body.score } })
    updateUser(username, { $push: { time: req.body.time } })
    res.json({ url: "/score"})
})

app.listen(process.env.PORT || 3001, () => {
    console.log("Server started on PORT 3001");
})