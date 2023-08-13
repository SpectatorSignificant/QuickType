const wordsBox = document.querySelector(".words");
const timerBox = document.querySelector(".time");
const restartButton = document.querySelector("a.restart-button");
const scoreBox = document.querySelector(".score");
const settingsButton = document.querySelector("#btn-settings");
const settingsCloseButton = document.querySelector("#btn-settings-close");
const settingsOverlay = document.querySelector(".overlay")

let spanObject, currentTime, elapsedTimeSeconds, lastCorrectUserIndex, buffer;
let userString = "";
let charArray = [];
let originalIndex = 0;
let index = 0;
let rawScore = 0
let score;
let gameOver = false;
let userIndex = 0;
let wrongChars = 0;
let totalWrongChars = 0;
let currentWord = 0;
let badEntry = false;
let spaceWasPressed = false;
let startTime;
let gameMode = "normal";

originalString = randomWords.replace(/,/g, " ");
originalString = originalString + " "
console.log('length of original string:', originalString.length);

async function postData(url = "", data = {}) {
    const response = await fetch(url, {
      method: "POST", 
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data)
    })
    return response.json(); 
  }

function indexBuffer(index){
    for (var i = index; i < originalString.length; i++){
        if (originalString[i] == " ") return i - index + 1;
    }
}

function updateWordClass(index){
    for (var i = 0; i < charArray.length; i++){
        charArray[i].classList.remove("current-word");
    }

    for (var j = index - 1; j >= 0 && charArray[j].textContent != " "; j--) continue;

    for (var k = j + 1; k < charArray.length && charArray[k].textContent != " "; k++){
        charArray[k].classList.add("current-word");
    }
}

function displayChars(){
    wordsBox.innerHTML = "";
    for (var i = 0; i < charArray.length; i++){
        wordsBox.appendChild(charArray[i]);
    }
}

function countWrongChars(index){
    var count = 0;
    for (var i = index; i > lastCorrectUserIndex; i--){
        if (charArray[i].matches(".wrong")) count++
    }
    return count;
}

for (var j = 0; j < originalString.length; j++){
    spanObject = document.createElement("span");
    spanObject.textContent = originalString[j];
    charArray.push(spanObject);
}

displayChars();
updateWordClass(userIndex);

settingsButton.onclick = (e) => {
    settingsOverlay.hidden = false;
}

settingsCloseButton.onclick = (e) => {
    settingsOverlay.hidden = true;
    wordsBox.style["text-shadow"] = "none";
    wordsBox.style.color = "black";
    console.log(wordsBox.style)
}

document.addEventListener("keydown", async (e) => {
    if (gameOver == false && (e.key.length == 1 || e.key == "Backspace")){
        if (userIndex == 1){
            startTime = Date.now();
        } 
        // if (userIndex > 1) console.log(charArray[userIndex - 1].matches(".correct"));
        if (originalIndex < originalString.length && e.key == originalString[originalIndex].toLocaleLowerCase() && wrongChars == 0){
            if (e.key == " " && spaceWasPressed == false){
                spaceWasPressed = true;
                // if (gameMode)
            }
            else if (e.key != " ") spaceWasPressed = false; 
            userString += e.key;
            charArray[userIndex].classList.add("correct");
            lastCorrectUserIndex = userIndex;
            lastCorrectOriginalIndex = originalIndex;
            userIndex += 1;
            originalIndex += 1;

        } else if (e.key != "Backspace" && e.key != " "){
            spanObject = document.createElement("span");
            spanObject.textContent = e.key;
            spanObject.classList.add("wrong");
            charArray.splice(userIndex, 0, spanObject);
            userString += e.key;
            userIndex += 1;
            wrongChars += 1;

        } else if (e.key == "Backspace" && wrongChars > 0){
            // console.log(charArray[userIndex - 1].classList, charArray[userIndex - 1].classList.length);
            // if (charArray[userIndex - 1].classList.includes("wrong")){
            charArray.splice(userIndex - 1, 1);
            userString = userString.slice(0, userString.length - 1);
            userIndex -= 1;
            wrongChars -= 1;
            // }

        } else if (e.key == "Backspace" && spaceWasPressed){
            spaceWasPressed = false;
            userString = userString.slice(0, userString.length - 1);
            userIndex -= 1;
            originalIndex -= 1;
            wrongChars = countWrongChars(userIndex);
            userIndex = lastCorrectUserIndex + wrongChars + 1;
            originalIndex = lastCorrectOriginalIndex + 1;
            // console.log(wrongChars, originalIndex, userIndex);
            
        } else if (e.key == " " && spaceWasPressed == false){
            if (gameMode == "expert"){
                gameOver = true;
            }
            buffer = indexBuffer(originalIndex);
            originalIndex += buffer;
            userIndex += buffer //+ wrongChars;
            // userIndex += wrongChars;
            totalWrongChars += wrongChars + buffer;
            wrongChars = 0;
            userString += e.key;
            spaceWasPressed = true;
            console.log(originalIndex)
            // console.log(buffer, originalIndex, userIndex, wrongChars);
        }
        
        if (originalIndex >= originalString.length || gameOver) {
            gameOver = true;
            location.href = ((await postData("/test", { score , time: Date.now(), rawScore })).url)
            console.log(gameOver)
            console.log("Over", { score })
            calculateScore()
            scoreBox.innerText = score;
            clearInterval(interval)
        
        }
    }
    
    // console.log(e.key, originalIndex, userIndex, originalString[originalIndex]);

    // console.log("userString =", userString);
    displayChars();
    updateWordClass(userIndex);
})

// restartButton.addEventListener("click", (e) => {
//     scoreBox.innerText = Math.round(elapsedTimeSeconds);
// })

// let count = 0
// const inter = setInterval(() => {
//     console.log(count)
//     count++
//     if (count == 5) clearInterval(inter)
// }, 500)

const interval = setInterval(() => {
    currentTime = Date.now();
    elapsedTimeSeconds = (currentTime - startTime)/1000
    if (!isNaN(elapsedTimeSeconds)){
        timerBox.innerText = (elapsedTimeSeconds)
    }
    console.log(calculateScore())
    
}, 50);

function calculateScore(){
    console.log({totalWrongChars})
    console.log({wrongChars})
    rawScore = 60*(userString.length/5)/elapsedTimeSeconds
    score = rawScore - 60*(totalWrongChars/5)/elapsedTimeSeconds
    console.log(score, rawScore)
    return score
}

