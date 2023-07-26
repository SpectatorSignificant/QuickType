const wordsBox = document.querySelector(".words");
const timerBox = document.querySelector(".time");
const restartButton = document.querySelector("a.restart-button");
const scoreBox = document.querySelector(".score");

let spanObject, currentTime, elapsedTimeSeconds, lastCorrectUserIndex, buffer;
let userString = "";
let charArray = [];
let originalIndex = 0;
let index = 0;
let userIndex = 0;
let wrongChars = 0;
let currentWord = 0;
let badEntry = false;
let spaceWasPressed = false;
let startTime = Date.now();

originalString = randomWords.replace(/,/g, " ");
console.log('length of original string:', originalString.length);

function indexBuffer(index){
    for (var i = index; i < originalString.length; i++){
        if (originalString[i] == " ") return i - index + 1;
    }
}

function updateWordClass(index){
    for (var i = 0; i < charArray.length; i++){
        charArray[i].classList.remove("current-word");
    }

    for (var j = index - 1; j >= 0 && charArray[j].textContent != " "; j--) console.log(j);
    console.log(j);

    for (var k = j + 1; k < charArray.length && charArray[k].textContent != " "; k++){
        charArray[k].classList.add("current-word");
        console.log(k);
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

document.addEventListener("keydown", (e) => {
    console.log((currentTime - startTime)/1000);
    if (e.key.length == 1 || e.key == "Backspace"){
        if (userIndex == 1){
            startTime = Date.now();
        } 
        // if (userIndex > 1) console.log(charArray[userIndex - 1].matches(".correct"));
        if (e.key == originalString[originalIndex].toLocaleLowerCase() && wrongChars == 0){
            if (e.key == " " && spaceWasPressed == false){
                spaceWasPressed = true;
                e.key = "_";
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
            buffer = indexBuffer(originalIndex);
            originalIndex += buffer;
            userIndex += buffer //+ wrongChars;
            // userIndex += wrongChars;
            wrongChars = 0;
            userString += e.key;
            spaceWasPressed = true;
            // console.log(buffer, originalIndex, userIndex, wrongChars);
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

const interval = setInterval(() => {
    currentTime = Date.now();
    elapsedTimeSeconds = (currentTime - startTime)/1000
    timerBox.innerText = (elapsedTimeSeconds);
    // if (userIndex >= charArray.length - 1){
        scoreBox.innerText = (60*(originalString.length/5)/elapsedTimeSeconds);
    // }
}, 50);

